// ==============================================
// KetoCore Storage Manager
// Maneja sincronización offline/online
// ==============================================

class KetoStorageManager {
    constructor() {
        this.isOnline = navigator.onLine;
        this.isSyncing = false;
        this.syncInterval = 60000; // 1 minuto
        this.userId = null;
        this.syncTimer = null;
        
        // Escuchar cambios de conexión
        window.addEventListener('online', () => this.onOnline());
        window.addEventListener('offline', () => this.onOffline());
    }

    // ==============================================
    // INICIALIZACIÓN
    // ==============================================
    async init() {
        // Verificar si hay usuario logueado
        const { data } = await supabase.auth.getSession();
        this.userId = data.session?.user?.id || null;
        
        // Escuchar cambios de autenticación
        supabase.auth.onAuthStateChange((event, session) => {
            this.userId = session?.user?.id || null;
            
            if (this.userId) {
                this.startSync();
                this.syncPending(); // Sincronizar cambios pendientes
            } else {
                this.stopSync();
            }
        });
        
        // Iniciar sync si hay usuario
        if (this.userId) {
            this.startSync();
            this.syncPending();
        }
        
        // Inicializar IndexedDB
        await this.initIndexedDB();
        
        console.log('📦 KetoStorageManager inicializado', { online: this.isOnline, userId: this.userId });
    }

    async initIndexedDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('KetoCore_cache', 1);
            
            request.onerror = () => {
                console.error('Error abriendo IndexedDB');
                reject(request.error);
            };
            
            request.onsuccess = () => {
                this.idb = request.result;
                resolve(this.idb);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Alimentos
                if (!db.objectStoreNames.contains('alimentos')) {
                    const store = db.createObjectStore('alimentos', { keyPath: 'id' });
                    store.createIndex('categoria', 'categoria');
                    store.createIndex('nombre', 'nombre');
                }
                
                // Recetas
                if (!db.objectStoreNames.contains('recetas')) {
                    const store = db.createObjectStore('recetas', { keyPath: 'id' });
                    store.createIndex('tags', 'tags', { multiEntry: true });
                }
                
                // Ejercicios
                if (!db.objectStoreNames.contains('ejercicios')) {
                    db.createObjectStore('ejercicios', { keyPath: 'id' });
                }
                
                // Datos de usuario
                if (!db.objectStoreNames.contains('datos_usuario')) {
                    const store = db.createObjectStore('datos_usuario', { keyPath: 'id' });
                    store.createIndex('fecha', 'fecha');
                    store.createIndex('usuario_fecha', ['usuario_id', 'fecha']);
                }
                
                // Cola de sincronización
                if (!db.objectStoreNames.contains('sync_queue')) {
                    const store = db.createObjectStore('sync_queue', { keyPath: 'id', autoIncrement: true });
                    store.createIndex('status', 'status');
                    store.createIndex('created_at', 'created_at');
                }
            };
        });
    }

    // ==============================================
    // CONEXIÓN
    // ==============================================
    onOnline() {
        this.isOnline = true;
        console.log('🌐 Online - Sincronizando...');
        this.showToast('Conexión restaurada');
        this.syncPending();
    }

    onOffline() {
        this.isOnline = false;
        console.log('📴 Offline');
        this.showToast('Sin conexión - guardando localmente');
    }

    startSync() {
        if (this.syncTimer) return;
        this.syncTimer = setInterval(() => this.syncPending(), this.syncInterval);
    }

    stopSync() {
        if (this.syncTimer) {
            clearInterval(this.syncTimer);
            this.syncTimer = null;
        }
    }

    // ==============================================
    // OPERACIONES CON CACHÉ
    // ==============================================
    
    // Guardar en caché IndexedDB
    async cachePut(storeName, data) {
        if (!this.idb) await this.initIndexedDB();
        
        return new Promise((resolve, reject) => {
            const tx = this.idb.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            
            if (Array.isArray(data)) {
                data.forEach(item => store.put(item));
            } else {
                store.put(data);
            }
            
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }

    // Obtener de caché IndexedDB
    async cacheGet(storeName, key) {
        if (!this.idb) await this.initIndexedDB();
        
        return new Promise((resolve, reject) => {
            const tx = this.idb.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const request = key ? store.get(key) : store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // ==============================================
    // OPERACIONES DE DATOS (CRUD)
    // ==============================================
    
    // Guardar - Intenta Supabase, guarda en cola si falla
    async save(table, data) {
        // 1. Guardar en localStorage también (backup legacy)
        this.saveLocal(table, data);
        
        // 2. Si hay usuario y estamos online, guardar en Supabase
        if (this.userId && this.isOnline) {
            const result = await this.saveRemote(table, data);
            if (result.success) return result;
        }
        
        // 3. Si no se pudo guardar en Supabase, agregar a cola
        if (this.userId) {
            await this.addToSyncQueue(table, 'save', data);
        }
        
        return { success: true, offline: true };
    }

    saveLocal(table, data) {
        const key = `KetoCore_${table}`;
        let existing = [];
        
        try {
            existing = JSON.parse(localStorage.getItem(key) || '[]');
        } catch (e) {}
        
        if (!Array.isArray(data)) {
            data = [data];
        }
        
        data.forEach(item => {
            const index = existing.findIndex(i => i.id === item.id);
            if (index >= 0) {
                existing[index] = { ...existing[index], ...item };
            } else {
                existing.push(item);
            }
        });
        
        try {
            localStorage.setItem(key, JSON.stringify(existing));
        } catch (e) {
            console.warn('localStorage lleno, limpiando...');
            this.cleanLocalStorage();
            localStorage.setItem(key, JSON.stringify(existing));
        }
    }

    async saveRemote(table, data) {
        try {
            const payload = {
                ...data,
                usuario_id: this.userId
            };
            
            // Eliminar campos undefined
            Object.keys(payload).forEach(key => {
                if (payload[key] === undefined) delete payload[key];
            });
            
            const { data: result, error } = await supabase
                .from(table)
                .upsert(payload)
                .select()
                .single();
            
            if (error) throw error;
            
            return { success: true, data: result };
        } catch (error) {
            console.error(`Error guardando en ${table}:`, error);
            return { success: false, error };
        }
    }

    // Cargar datos
    async load(table, options = {}) {
        const { forceRemote = false } = options;
        
        // 1. Si estamos online y hay usuario, intentar Supabase
        if (this.isOnline && this.userId) {
            const remoteData = await this.loadRemote(table);
            
            if (remoteData !== null) {
                // Guardar en caché
                await this.cachePut(table, remoteData);
                this.saveLocal(table, remoteData);
                return remoteData;
            }
        }
        
        // 2. Fallback a localStorage
        const localData = this.loadLocal(table);
        if (localData && localData.length > 0) {
            return localData;
        }
        
        // 3. Fallback a IndexedDB
        const cachedData = await this.cacheGet(table);
        if (cachedData) {
            return Array.isArray(cachedData) ? cachedData : [cachedData];
        }
        
        return [];
    }

    loadLocal(table) {
        const key = `KetoCore_${table}`;
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }

    async loadRemote(table) {
        try {
            const { data, error } = await supabase
                .from(table)
                .select('*')
                .eq('usuario_id', this.userId);
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error(`Error cargando ${table}:`, error);
            return null;
        }
    }

    // ==============================================
    // COLA DE SINCRONIZACIÓN
    // ==============================================
    
    async addToSyncQueue(table, action, data) {
        if (!this.idb) await this.initIndexedDB();
        
        const item = {
            table,
            action,
            data: { ...data, usuario_id: this.userId },
            status: 'pending',
            created_at: Date.now(),
            retry_count: 0
        };
        
        return new Promise((resolve, reject) => {
            const tx = this.idb.transaction('sync_queue', 'readwrite');
            const store = tx.objectStore('sync_queue');
            const request = store.add(item);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getSyncQueue() {
        if (!this.idb) await this.initIndexedDB();
        
        return new Promise((resolve, reject) => {
            const tx = this.idb.transaction('sync_queue', 'readonly');
            const store = tx.objectStore('sync_queue');
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    }

    async clearSyncQueue() {
        if (!this.idb) await this.initIndexedDB();
        
        return new Promise((resolve, reject) => {
            const tx = this.idb.transaction('sync_queue', 'readwrite');
            const store = tx.objectStore('sync_queue');
            const request = store.clear();
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    // Sincronizar cola pendiente
    async syncPending() {
        if (this.isSyncing || !this.isOnline || !this.userId) return;
        
        this.isSyncing = true;
        
        try {
            const queue = await this.getSyncQueue();
            const pending = queue.filter(item => item.status === 'pending');
            
            if (pending.length === 0) return;
            
            console.log(`📤 Sincronizando ${pending.length} cambios pendientes...`);
            
            for (const item of pending) {
                try {
                    const result = await this.saveRemote(item.table, item.data);
                    
                    if (result.success) {
                        // Marcar como completado
                        item.status = 'synced';
                        item.synced_at = Date.now();
                        
                        // Eliminar de la cola
                        const tx = this.idb.transaction('sync_queue', 'readwrite');
                        tx.objectStore('sync_queue').delete(item.id);
                    } else {
                        item.retry_count++;
                        item.last_error = result.error?.message;
                    }
                } catch (error) {
                    console.error('Error sincronizando item:', error);
                    item.retry_count++;
                    item.last_error = error.message;
                }
            }
            
            console.log('✅ Sincronización completada');
        } finally {
            this.isSyncing = false;
        }
    }

    // ==============================================
    // HELPERS
    // ==============================================
    
    cleanLocalStorage() {
        // Limpiar datos antiguos (más de 30 días)
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        
        ['datos_usuario', 'weight_history'].forEach(key => {
            try {
                const data = JSON.parse(localStorage.getItem(`KetoCore_${key}`) || '[]');
                const filtered = data.filter(item => {
                    const date = new Date(item.fecha || item.date).getTime();
                    return date > thirtyDaysAgo;
                });
                localStorage.setItem(`KetoCore_${key}`, JSON.stringify(filtered));
            } catch (e) {}
        });
    }

    getStorageStats() {
        let total = 0;
        const breakdown = {};
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('KetoCore_')) {
                const value = localStorage.getItem(key);
                const size = value.length * 2;
                breakdown[key.replace('KetoCore_', '')] = {
                    bytes: size,
                    kb: (size / 1024).toFixed(2)
                };
                total += size;
            }
        }
        
        return {
            totalBytes: total,
            totalKB: (total / 1024).toFixed(2),
            totalMB: (total / (1024 * 1024)).toFixed(3),
            breakdown
        };
    }

    showToast(message) {
        // Emitir evento para que la UI lo capture
        window.dispatchEvent(new CustomEvent('KetoCore:toast', { detail: { message } }));
    }
}

// Instancia global
window.storageManager = new KetoStorageManager();

// Auto-inicializar (deshabilitado por ahora)
// storageManager.init();
