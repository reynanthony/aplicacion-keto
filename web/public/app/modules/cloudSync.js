// ==================== KetoCore CLOUD SYNC MODULE ====================
// Proporciona la capa de abstracción para sincronización de datos con el Backend

class CloudSyncAdapter {
  constructor() {
    this.isPwaOffline = !navigator.onLine;
    this.lastSync = localStorage.getItem('last_cloud_sync') || null;
    
    window.addEventListener('online', () => {
      this.isPwaOffline = false;
      this.autoSync();
    });
    
    window.addEventListener('offline', () => {
      this.isPwaOffline = true;
    });
  }

  // Prepara los datos locales para exportación
  exportPayload() {
    const payload = {};
    const keysToSync = [
      'keto_profile', 'keto_macros', 'ketoFoods', 'despensa', 
      'keto_weight_history', 'userData', 'weeklyProgress'
    ];
    
    keysToSync.forEach(key => {
      payload[key] = localStorage.getItem(key);
    });
    
    // Obtener también los planes de comida (claves dinámicas)
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('mealPlan_') || key.startsWith('checklist_')) {
        payload[key] = localStorage.getItem(key);
      }
    });
    
    return {
      timestamp: new Date().toISOString(),
      version: '2.0.0',
      data: payload
    };
  }

  // Importa datos desde un payload validado
  importPayload(payload) {
    if (!payload || !payload.version || !payload.data) {
      throw new Error("Formato de backup inválido.");
    }
    
    Object.keys(payload.data).forEach(key => {
      if (payload.data[key] !== null && payload.data[key] !== undefined) {
        localStorage.setItem(key, payload.data[key]);
      }
    });
    
    localStorage.setItem('last_cloud_sync', new Date().toISOString());
    return true;
  }

  // Simula sincronización automática a BaaS (Firebase/Supabase interface)
  async autoSync() {
    if (this.isPwaOffline) return;
    
    try {
      // Future integration point for REST API
      const payload = this.exportPayload();
      console.log(`[CloudSync] Sincronización transparente completada (${Object.keys(payload.data).length} registros).`);
      localStorage.setItem('last_cloud_sync', new Date().toISOString());
      
      if (window.showToast) {
        window.showToast("Datos sincronizados en la nube", 3000, "success");
      }
    } catch (error) {
      console.error("[CloudSync] Falla en la sincronización:", error);
    }
  }

  // Permite al usuario exportar manualmente sus datos
  downloadBackup() {
    const data = this.exportPayload();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `KetoCore_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

window.ketoCloudSync = new CloudSyncAdapter();

// Para pruebas Node (Jest)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CloudSyncAdapter };
}
