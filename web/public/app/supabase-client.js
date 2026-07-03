// ==============================================
// KetoCore Supabase Client (sin módulos)
// ==============================================

const SUPABASE_URL = 'https://lmbqzsonujwvqmfhjjgf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtYnF6c29udWp3dnFtZmhqamdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNTQzMDAsImV4cCI6MjA4ODgzMDMwMH0.SBsTQCh844rtGx0wLNZaEGO8NDmAVZjUj1YiDkRSm1k';

// Crear cliente Supabase
window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});

// ==============================================
// AUTH HELPERS
// ==============================================
window.auth = {
    async signUp(email, password, metadata = {}) {
        const { data, error } = await window.supabase.auth.signUp({
            email,
            password,
            options: { data: metadata }
        });
        return { data, error };
    },

    async signIn(email, password) {
        const { data, error } = await window.supabase.auth.signInWithPassword({
            email,
            password
        });
        return { data, error };
    },

    async signOut() {
        const { error } = await window.supabase.auth.signOut();
        return { error };
    },

    async getUser() {
        const { data, error } = await window.supabase.auth.getUser();
        return { data, error };
    },

    async getSession() {
        const { data, error } = await window.supabase.auth.getSession();
        return { data, error };
    },

    onAuthStateChange(callback) {
        return window.supabase.auth.onAuthStateChange(callback);
    }
};

// ==============================================
// API: ALIMENTOS
// ==============================================
window.alimentosAPI = {
    async getAll() {
        const { data, error } = await window.supabase
            .from('alimentos')
            .select('*')
            .eq('activo', true)
            .order('nombre');
        return { data: data || [], error };
    },

    async getByCategoria(categoria) {
        const { data, error } = await window.supabase
            .from('alimentos')
            .select('*')
            .eq('categoria', categoria)
            .eq('activo', true)
            .order('nombre');
        return { data: data || [], error };
    },

    async search(query) {
        const { data, error } = await window.supabase
            .from('alimentos')
            .select('*')
            .ilike('nombre', `%${query}%`)
            .eq('activo', true)
            .limit(30);
        return { data: data || [], error };
    },

    async create(alimento) {
        const { data, error } = await window.supabase
            .from('alimentos')
            .insert(alimento)
            .select()
            .single();
        return { data, error };
    }
};

// ==============================================
// API: RECETAS
// ==============================================
window.recetasAPI = {
    async getAll(limit = 100) {
        const { data, error } = await window.supabase
            .from('recetas')
            .select('*')
            .eq('activo', true)
            .order('fecha_creacion', { ascending: false })
            .limit(limit);
        return { data: data || [], error };
    },

    async getById(id) {
        const { data, error } = await window.supabase
            .from('recetas')
            .select('*')
            .eq('id', id)
            .single();
        return { data, error };
    },

    async getByTag(tag) {
        const { data, error } = await window.supabase
            .from('recetas')
            .select('*')
            .contains('tags', [tag])
            .eq('activo', true);
        return { data: data || [], error };
    },

    async search(query) {
        const { data, error } = await window.supabase
            .from('recetas')
            .select('*')
            .or(`titulo.ilike.%${query}%,descripcion.ilike.%${query}%`)
            .eq('activo', true)
            .limit(20);
        return { data: data || [], error };
    }
};

// ==============================================
// API: USUARIOS
// ==============================================
window.usuarioAPI = {
    async getProfile(userId) {
        const { data, error } = await window.supabase
            .from('usuarios')
            .select('*')
            .eq('id', userId)
            .single();
        return { data, error };
    },

    async updateProfile(userId, updates) {
        const { data, error } = await window.supabase
            .from('usuarios')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();
        return { data, error };
    }
};

// ==============================================
// API: DATOS DIARIOS
// ==============================================
window.datosAPI = {
    async getHistorial(userId, dias = 30) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - dias);
        
        const { data, error } = await window.supabase
            .from('datos_usuario')
            .select('*')
            .eq('usuario_id', userId)
            .gte('fecha', startDate.toISOString().split('T')[0])
            .order('fecha', { ascending: false });
        return { data: data || [], error };
    },

    async save(registro) {
        const { data, error } = await window.supabase
            .from('datos_usuario')
            .upsert(registro, { onConflict: 'usuario_id,fecha' })
            .select()
            .single();
        return { data, error };
    }
};

console.log('✅ Supabase Client cargado');
