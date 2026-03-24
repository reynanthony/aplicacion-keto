// ==================== BACKUP Y RESTORE - KetoLab ====================

// Claves de localStorage a incluir en el backup
const BACKUP_KEYS = [
  'userData',
  'keto_profile',
  'keto_macros',
  'ketoFoods',
  'despensa',
  'ketoExercises',
  'ketoWorkouts',
  'customChecklist',
  'theme',
  'sidebarCollapsed'
];

// Obtener todos los datos para backup
function getAllBackupData() {
  var backup = {
    version: '1.0',
    timestamp: new Date().toISOString(),
    app: 'KetoLab',
    data: {}
  };
  
  BACKUP_KEYS.forEach(function(key) {
    var value = localStorage.getItem(key);
    if (value) {
      backup.data[key] = value;
    }
  });
  
  // Agregar todos los mealPlans y checklists
  var mealPlans = {};
  var checklists = {};
  
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key && key.startsWith('mealPlan_')) {
      mealPlans[key] = localStorage.getItem(key);
    }
    if (key && key.startsWith('checklist_')) {
      checklists[key] = localStorage.getItem(key);
    }
  }
  
  backup.data.mealPlans = mealPlans;
  backup.data.checklists = checklists;
  
  return backup;
}

// Descargar backup como archivo JSON
function downloadBackup() {
  try {
    var backup = getAllBackupData();
    var jsonStr = JSON.stringify(backup, null, 2);
    var blob = new Blob([jsonStr], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    
    var a = document.createElement('a');
    a.href = url;
    a.download = 'ketolab-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Backup descargado correctamente');
    return true;
  } catch (e) {
    console.error('Error creating backup:', e);
    showToast('Error al crear backup');
    return false;
  }
}

// Restaurar datos desde archivo
function restoreBackup(file, callback) {
  var reader = new FileReader();
  
  reader.onload = function(e) {
    try {
      var backup = JSON.parse(e.target.result);
      
      // Validar estructura del backup
      if (!backup.data || !backup.version) {
        showToast('Archivo de backup inválido');
        if (callback) callback(false);
        return;
      }
      
      // Confirmar antes de restaurar
      if (!confirm('¿Restaurar backup? Esto sobrescribirá tus datos actuales.')) {
        if (callback) callback(false);
        return;
      }
      
      // Restaurar datos principales
      Object.keys(backup.data).forEach(function(key) {
        if (key === 'mealPlans' || key === 'checklists') {
          return; // Manejados aparte
        }
        if (backup.data[key]) {
          localStorage.setItem(key, backup.data[key]);
        }
      });
      
      // Restaurar mealPlans
      if (backup.data.mealPlans) {
        Object.keys(backup.data.mealPlans).forEach(function(key) {
          localStorage.setItem(key, backup.data.mealPlans[key]);
        });
      }
      
      // Restaurar checklists
      if (backup.data.checklists) {
        Object.keys(backup.data.checklists).forEach(function(key) {
          localStorage.setItem(key, backup.data.checklists[key]);
        });
      }
      
      showToast('Backup restaurado correctamente. Recargando...');
      
      if (callback) callback(true);
      
      setTimeout(function() {
        window.location.reload();
      }, 1500);
      
    } catch (err) {
      console.error('Error restoring backup:', err);
      showToast('Error al restaurar backup: ' + err.message);
      if (callback) callback(false);
    }
  };
  
  reader.onerror = function() {
    showToast('Error al leer archivo');
    if (callback) callback(false);
  };
  
  reader.readAsText(file);
}

// Trigger file input para seleccionar backup
function triggerRestore() {
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = function(e) {
    var file = e.target.files[0];
    if (file) {
      restoreBackup(file);
    }
  };
  input.click();
}

// Mostrar modal de backup/restore
function showBackupModal() {
  var modal = document.getElementById('backupModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

// Cerrar modal de backup
function closeBackupModal() {
  var modal = document.getElementById('backupModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}
