// ==================== UTILIDADES COMPARTIDAS - KetoLab ====================
// Este archivo contiene funciones comunes usadas por todos los módulos

// ==================== SEGURIDAD (XSS LOCALSTORAGE MIDDLEWARE) ====================

(function() {
  var originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key, value) {
    var vulnerableKeys = ['ketoFoods', 'customChecklist', 'mealPlan_', 'userData', 'keto_profile', 'keto_weight_history', 'despensa'];
    var shouldSanitize = vulnerableKeys.some(function(k) { return key.startsWith(k); });
    
    if (shouldSanitize && typeof value === 'string') {
      // Remover scripts en crudo
      value = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      // Remover handlers de eventos maliciosos
      value = value.replace(/on\w+\s*=\s*"[^"]*"/gi, '');
      value = value.replace(/on\w+\s*=\s*'[^']*'/gi, '');
      // Remover href con javascript:
      value = value.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, '');
    }
    return originalSetItem.call(localStorage, key, value);
  };
})();

// Sanitizar texto para prevenir XSS en tiempo de ejecución
function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  const div = document.createElement('div');
  div.textContent = String(text);
  return div.innerHTML;
}

// ==================== LOCALSTORAGE ====================

// Parse seguro de JSON desde localStorage
function safeParseJSON(value, defaultValue) {
  if (!value || value === 'null' || value === 'undefined') {
    return defaultValue;
  }
  try {
    const parsed = JSON.parse(value);
    return parsed !== null ? parsed : defaultValue;
  } catch (e) {
    console.warn('[Utils] JSON parse error, using default:', e.message);
    return defaultValue;
  }
}

// Obtener dato de localStorage con validación de esquema
function getLocalData(key, schema, defaultValue) {
  const raw = localStorage.getItem(key);
  const data = safeParseJSON(raw, null);
  
  if (data === null) {
    return defaultValue;
  }
  
  // Validar contra esquema si se proporciona
  if (schema && typeof schema.validate === 'function') {
    const validation = schema.validate(data);
    if (!validation.valid) {
      console.warn('[Utils] Schema validation failed for', key, validation.errors);
      return defaultValue;
    }
  }
  
  return data;
}

// Guardar en localStorage con manejo de errores
function setLocalData(key, data) {
  try {
    const MAX_STORAGE_MB = 4.5;
    const serialized = JSON.stringify(data);
    const currentSize = new Blob(Object.values(localStorage)).size;
    const newSize = new Blob([serialized]).size;
    if ((currentSize + newSize) > MAX_STORAGE_MB * 1024 * 1024) {
      console.warn('[Utils] localStorage quota exceeded, cleaning old data');
      cleanOldData();
    }
    localStorage.setItem(key, serialized);
    return true;
  } catch (e) {
    console.error('[Utils] Error saving to localStorage:', e.message);
    return false;
  }
}

function cleanOldData() {
  const keysToClean = ['keto_weight_history', 'mealPlan_', 'checklist_'];
  keysToClean.forEach(pattern => {
    if (pattern.endsWith('_')) {
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith(pattern)) {
          const data = safeParseJSON(localStorage.getItem(k), []);
          if (Array.isArray(data) && data.length > 90) {
            localStorage.setItem(k, JSON.stringify(data.slice(-90)));
          }
        }
      });
    } else {
      const data = safeParseJSON(localStorage.getItem(pattern), null);
      if (data && Array.isArray(data) && data.length > 365) {
        localStorage.setItem(pattern, JSON.stringify(data.slice(-365)));
      }
    }
  });
}

function getStorageUsage() {
  let total = 0;
  Object.keys(localStorage).forEach(k => {
    total += localStorage.getItem(k).length * 2;
  });
  return (total / (1024 * 1024)).toFixed(2) + ' MB';
}

// ==================== ESQUEMAS DE VALIDACIÓN ====================

const schemas = {
  userData: {
    validate: function(data) {
      const errors = [];
      if (typeof data !== 'object' || data === null) {
        errors.push('Debe ser un objeto');
        return { valid: false, errors };
      }
      if (data.currentWeight !== undefined && (typeof data.currentWeight !== 'number' || data.currentWeight <= 0 || data.currentWeight > 500)) {
        errors.push('currentWeight debe ser un número positivo');
      }
      if (data.goalWeight !== undefined && (typeof data.goalWeight !== 'number' || data.goalWeight <= 0 || data.goalWeight > 500)) {
        errors.push('goalWeight debe ser un número positivo');
      }
      return { valid: errors.length === 0, errors };
    }
  },
  ketoMacros: {
    validate: function(data) {
      const errors = [];
      if (typeof data !== 'object' || data === null) {
        errors.push('Debe ser un objeto');
        return { valid: false, errors };
      }
      const validKeys = ['calories', 'protein', 'fat', 'carbs'];
      validKeys.forEach(key => {
        if (data[key] !== undefined && (typeof data[key] !== 'number' || data[key] < 0)) {
          errors.push(`${key} debe ser un número no negativo`);
        }
      });
      return { valid: errors.length === 0, errors };
    }
  },
  food: {
    validate: function(data) {
      const errors = [];
      if (typeof data !== 'object' || data === null) {
        errors.push('Debe ser un objeto');
        return { valid: false, errors };
      }
      if (!data.id || typeof data.id !== 'string') {
        errors.push('id es requerido y debe ser string');
      }
      if (!data.name || typeof data.name !== 'string') {
        errors.push('name es requerido y debe ser string');
      }
      return { valid: errors.length === 0, errors };
    }
  },
  mealPlan: {
    validate: function(data) {
      const errors = [];
      if (typeof data !== 'object' || data === null) {
        errors.push('Debe ser un objeto');
        return { valid: false, errors };
      }
      const validMeals = ['desayuno', 'almuerzo', 'cena', 'snacks'];
      validMeals.forEach(meal => {
        if (data[meal] !== undefined && !Array.isArray(data[meal])) {
          errors.push(`${meal} debe ser un array`);
        }
      });
      return { valid: errors.length === 0, errors };
    }
  },
  despensa: {
    validate: function(data) {
      if (typeof data !== 'object' || data === null) {
        return { valid: false, errors: ['Debe ser un objeto'] };
      }
      // Validar cada entrada
      for (const [key, value] of Object.entries(data)) {
        if (typeof value !== 'object' || value === null) {
          return { valid: false, errors: [`${key} debe ser un objeto`] };
        }
        if (typeof value.stock !== 'number' || value.stock < 0) {
          return { valid: false, errors: [`${key}.stock debe ser número no negativo`] };
        }
      }
      return { valid: true, errors: [] };
    }
  }
};

// ==================== HELPERS DE DATOS ====================

// Valores por defecto para userData
function getDefaultUserData() {
  return {
    currentWeight: 80,
    goalWeight: 70,
    startWeight: 80,
    waterIntake: 0,
    proteinConsumed: 0,
    proteinGoal: 150,
    workoutMinutes: 0,
    walkMinutes: 0,
    sleepHours: 0,
    sodium: 0,
    potassium: 0,
    magnesium: 0
  };
}

// Valores por defecto para macros
function getDefaultMacros() {
  return {
    calories: 1800,
    protein: 160,
    fat: 150,
    carbs: 25
  };
}

// Valores por defecto para mealPlan
function getDefaultMealPlan() {
  return {
    desayuno: [],
    almuerzo: [],
    cena: [],
    snacks: []
  };
}

// ==================== FORMATEO ====================

// Formatear número con separadores de miles
function fmt(n) {
  if (typeof n !== 'number' || isNaN(n)) return '0';
  return n.toLocaleString('en-US');
}

// Formatear fecha
function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Obtener clave del día actual
function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

// Obtener clave de la semana actual (año-semana)
function getWeekKey() {
  const now = new Date();
  const yearStart = new Date(now.getFullYear(), 0, 1);
  const weekNum = Math.ceil(((now - yearStart) / 86400000 + yearStart.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${weekNum}`;
}

// ==================== UI HELPERS ====================

// Obtener color según porcentaje de stock
function getStockColor(percent) {
  if (percent <= 10) return '#ff7351';    // rojo - crítico
  if (percent <= 25) return '#ffb300';     // amarillo - bajo
  if (percent <= 50) return '#ffc107';     // amarillo claro - medio
  return '#4caf50';                         // verde -OK
}

// Alias para compatibilidad global
if (typeof window !== 'undefined') {
  window.showToast = function(message, duration, type) {
  if (!message) return;
  
  createModernToast();
  
  let existingToast = document.getElementById('modern-toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.id = 'modern-toast';
  
  const toastType = type || 'info';
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };
  
  toast.className = `modern-toast ${toastType}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[toastType]}</span>
    <span class="toast-message">${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  const timeout = duration || 3500;
  
  setTimeout(function() {
    toast.classList.add('hiding');
    setTimeout(function() {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 300);
  }, timeout);
  };
}

// ==================== SISTEMA DE TOASTS MODERNO ====================
function createModernToast() {
  const style = document.createElement('style');
  style.id = 'modern-toast-styles';
  style.textContent = `
    @keyframes toastSlideIn {
      from { transform: translateX(-50%) translateY(100px); opacity: 0; }
      to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    @keyframes toastSlideOut {
      from { transform: translateX(-50%) translateY(0); opacity: 1; }
      to { transform: translateX(-50%) translateY(100px); opacity: 0; }
    }
    @keyframes toastPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(255, 77, 0, 0.4); }
      50% { box-shadow: 0 0 20px 5px rgba(255, 77, 0, 0.2); }
    }
    .modern-toast {
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99999;
      padding: 16px 24px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      gap: 14px;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 15px;
      font-weight: 600;
      max-width: 90vw;
      animation: toastSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), toastPulse 2s infinite;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      cursor: default;
      user-select: none;
    }
    .modern-toast.success {
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.25), rgba(20, 83, 45, 0.9));
      border: 1px solid rgba(34, 197, 94, 0.5);
      color: #4ade80;
      box-shadow: 0 8px 32px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255,255,255,0.1);
    }
    .modern-toast.error {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(153, 27, 27, 0.9));
      border: 1px solid rgba(239, 68, 68, 0.5);
      color: #f87171;
      box-shadow: 0 8px 32px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(255,255,255,0.1);
    }
    .modern-toast.warning {
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(146, 64, 14, 0.9));
      border: 1px solid rgba(245, 158, 11, 0.5);
      color: #fbbf24;
      box-shadow: 0 8px 32px rgba(245, 158, 11, 0.3), inset 0 1px 0 rgba(255,255,255,0.1);
    }
    .modern-toast.info {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(29, 78, 216, 0.9));
      border: 1px solid rgba(59, 130, 246, 0.5);
      color: #60a5fa;
      box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.1);
    }
    .modern-toast .toast-icon {
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modern-toast .toast-message {
      flex: 1;
      line-height: 1.4;
    }
    .modern-toast.hiding {
      animation: toastSlideOut 0.3s ease forwards !important;
    }
  `;
  document.head.appendChild(style);
}

// ==================== SISTEMA DE MODALES MODERNO ====================
function createModernModalStyles() {
  if (document.getElementById('modern-modal-styles')) return;
  const style = document.createElement('style');
  style.id = 'modern-modal-styles';
  style.textContent = `
    @keyframes modalFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes modalSlideIn {
      from { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
      to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    @keyframes modalBackdrop {
      from { backdrop-filter: blur(0px); }
      to { backdrop-filter: blur(8px); }
    }
    .modern-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      z-index: 99998;
      animation: modalFadeIn 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .modern-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 99999;
      width: 100%;
      max-width: 420px;
      max-height: 90vh;
      overflow-y: auto;
      border-radius: 24px;
      animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background: linear-gradient(145deg, rgba(40, 38, 38, 0.98), rgba(28, 26, 26, 0.98));
      border: 1px solid rgba(255, 77, 0, 0.3);
      box-shadow: 
        0 25px 50px -12px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(255, 255, 255, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.1),
        0 0 60px rgba(255, 77, 0, 0.15);
    }
    .modern-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px 24px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .modern-modal-title {
      font-size: 20px;
      font-weight: 700;
      color: #fff;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .modern-modal-title .icon {
      width: 36px;
      height: 36px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
    .modern-modal-close {
      width: 36px;
      height: 36px;
      border: none;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      color: rgba(255, 255, 255, 0.6);
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    .modern-modal-close:hover {
      background: rgba(255, 77, 0, 0.2);
      color: #ff4d00;
    }
    .modern-modal-body {
      padding: 24px;
    }
    .modern-modal-footer {
      display: flex;
      gap: 12px;
      padding: 16px 24px 24px;
      flex-wrap: wrap;
    }
    .modern-modal-btn {
      flex: 1;
      min-width: 140px;
      padding: 14px 24px;
      border: none;
      border-radius: 14px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: inherit;
    }
    .modern-modal-btn.primary {
      background: linear-gradient(135deg, #ff4d00, #ff6b00);
      color: #fff;
      box-shadow: 0 4px 15px rgba(255, 77, 0, 0.4);
    }
    .modern-modal-btn.primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 77, 0, 0.5);
    }
    .modern-modal-btn.secondary {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .modern-modal-btn.secondary:hover {
      background: rgba(255, 255, 255, 0.15);
    }
    .modern-modal-btn.danger {
      background: linear-gradient(135deg, #dc2626, #b91c1c);
      color: #fff;
    }
    .modern-modal-btn.danger:hover {
      background: linear-gradient(135deg, #ef4444, #dc2626);
    }
    .modern-option-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .modern-option-btn {
      width: 100%;
      padding: 16px 20px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 14px;
      font-family: inherit;
    }
    .modern-option-btn:hover {
      background: linear-gradient(135deg, rgba(255, 77, 0, 0.2), rgba(255, 107, 0, 0.1));
      border-color: rgba(255, 77, 0, 0.5);
      transform: translateX(4px);
    }
    .modern-option-btn .icon {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: rgba(255, 77, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
  `;
  document.head.appendChild(style);
}

// Función para mostrar modal moderno
function showModernModal(options) {
  createModernModalStyles();
  
  const {
    title = 'Confirmar',
    message = '',
    icon = '?',
    iconBg = 'rgba(255, 77, 0, 0.2)',
    buttons = [],
    onClose = null
  } = options;
  
  const existingModal = document.getElementById('modern-modal-container');
  if (existingModal) {
    existingModal.remove();
  }
  
  const backdrop = document.createElement('div');
  backdrop.className = 'modern-modal-backdrop';
  backdrop.id = 'modern-modal-container';
  backdrop.onclick = function(e) {
    if (e.target === backdrop) {
      closeModernModal(onClose);
    }
  };
  
  const modal = document.createElement('div');
  modal.className = 'modern-modal';
  
  let buttonsHtml = '';
  if (buttons.length > 0) {
    buttonsHtml = '<div class="modern-modal-footer">';
    buttons.forEach(btn => {
      const btnClass = btn.primary ? 'primary' : btn.danger ? 'danger' : 'secondary';
      buttonsHtml += `<button class="modern-modal-btn ${btnClass}" data-action="${btn.action}">${btn.text}</button>`;
    });
    buttonsHtml += '</div>';
  }
  
  modal.innerHTML = `
    <div class="modern-modal-header">
      <h3 class="modern-modal-title">
        <span class="icon" style="background: ${iconBg}">${icon}</span>
        ${title}
      </h3>
      <button class="modern-modal-close" onclick="closeModernModal()">×</button>
    </div>
    ${message ? `<div class="modern-modal-body">${message}</div>` : ''}
    ${buttonsHtml}
  `;
  
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);
  
  // Event listeners para botones
  buttons.forEach(btn => {
    const btnEl = modal.querySelector(`[data-action="${btn.action}"]`);
    if (btnEl && btn.onClick) {
      btnEl.onclick = function() {
        btn.onClick();
        if (btn.closeOnClick !== false) {
          closeModernModal();
        }
      };
    }
  });
  
  return backdrop;
}

function closeModernModal(onClose) {
  const modal = document.getElementById('modern-modal-container');
  if (modal) {
    modal.style.opacity = '0';
    modal.style.transform = 'translate(-50%, -50%) scale(0.9)';
    setTimeout(function() {
      modal.remove();
      if (onClose && typeof onClose === 'function') {
        onClose();
      }
    }, 200);
  }
}

// Versión legacy para compatibilidad
function showToastOld(message, duration) {
  showToast(message, duration, 'info');
}

// ==================== EXPORTAR PARA USO GLOBAL ====================

if (typeof window !== 'undefined') {
  window.customConfirm = function(message) {
  return new Promise(function(resolve) {
    showModernModal({
      title: 'Confirmar',
      message: message,
      icon: '?',
      iconBg: 'rgba(59, 130, 246, 0.2)',
      buttons: [
        { text: 'Cancelar', action: 'cancel', onClick: function() { resolve(false); } },
        { text: 'Confirmar', primary: true, action: 'confirm', onClick: function() { resolve(true); } }
      ],
      onClose: function() { resolve(false); }
    });
  });
  };
}

// Funciones adicionales para compatibilidad hacia atrás

// Versión segura de parseFloat
function safeParseFloat(value, defaultValue) {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? (defaultValue || 0) : parsed;
}

// Versión segura de parseInt
function safeParseInt(value, defaultValue) {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? (defaultValue || 0) : parsed;
}

// Clamp de valor entre min y max
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// ==================== VALIDACIONES ====================

// Validar datos de localStorage con esquema
function validateLocalStorageData(key, defaultValue, validator, showMessage = true) {
  const stored = safeParseJSON(localStorage.getItem(key), null);
  
  if (stored !== null && validator(stored)) {
    return stored;
  }
  
  if (stored !== null && showMessage) {
    console.warn('[Validation] Datos inválidos para', key, '- usando valores por defecto');
    showToast('Datos de ' + key + ' dañados, reiniciando...');
  }
  
  localStorage.setItem(key, JSON.stringify(defaultValue));
  return defaultValue;
}

// Validar estructura de alimentos
function validateFoodsData() {
  const stored = safeParseJSON(localStorage.getItem('ketoFoods'), null);
  
  const isValid = stored && 
    Array.isArray(stored) && 
    stored.length > 0 && 
    typeof stored[0].calories === 'number';
  
  if (!isValid && stored !== null) {
    showToast('Base de alimentos dañada, restaurando defaults...');
  }
  
  return isValid ? stored : null;
}

// Validar plan de comidas
function validateMealPlan(plan) {
  return plan && 
    typeof plan === 'object' && 
    (plan.desayuno || plan.almuerzo || plan.cena || plan.snacks);
}

// ==================== MIGRACIÓN DE DATOS ====================

// Migrar datos antiguos de userData a keto_profile
function migrateUserData() {
  if (localStorage.getItem('userData_migrated') === 'true') {
    return;
  }
  
  const ketoProfile = safeParseJSON(localStorage.getItem('keto_profile'), {});
  const oldUserData = safeParseJSON(localStorage.getItem('userData'), {});
  
  if (Object.keys(ketoProfile).length > 0) {
    localStorage.setItem('userData_migrated', 'true');
    return;
  }
  
  if (Object.keys(oldUserData).length > 0) {
    const newProfile = {
      age: oldUserData.age || 30,
      height: oldUserData.height || 170,
      weight: oldUserData.currentWeight || oldUserData.weight || 80,
      goalWeight: oldUserData.goalWeight || 75,
      sex: oldUserData.sex || 'male',
      activityLevel: oldUserData.activityLevel || 1.55,
      goal: oldUserData.goal || 0
    };
    localStorage.setItem('keto_profile', JSON.stringify(newProfile));
  }
  
  localStorage.setItem('userData_migrated', 'true');
}

// Ejecutar migración al cargar
migrateUserData();

// ==================== PESO Y PROGRESO ====================

// Guardar peso actual en historial
function saveWeightToHistory(weight) {
  if (!weight || weight <= 0) return;
  
  const today = new Date().toISOString().slice(0, 10);
  let weightHistory = safeParseJSON(localStorage.getItem('keto_weight_history'), []);
  
  if (!Array.isArray(weightHistory)) {
    weightHistory = [];
  }
  
  const existingIndex = weightHistory.findIndex(entry => entry.date === today);
  if (existingIndex >= 0) {
    weightHistory[existingIndex].weight = weight;
  } else {
    weightHistory.push({ date: today, weight: weight });
  }
  
  const oneYearAgo = new Date();
  oneYearAgo.setDate(oneYearAgo.getDate() - 365);
  const filtered = weightHistory.filter(entry => new Date(entry.date) > oneYearAgo);
  
  localStorage.setItem('keto_weight_history', JSON.stringify(filtered));
}

// Calcular pérdida de peso semanal real
function calculateWeeklyLoss() {
  const ketoProfile = safeParseJSON(localStorage.getItem('keto_profile'), {});
  const currentWeight = ketoProfile.weight || 80;
  
  const weightHistory = safeParseJSON(localStorage.getItem('keto_weight_history'), []);
  
  if (!Array.isArray(weightHistory) || weightHistory.length === 0) {
    return '0';
  }
  
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  const lastWeekKey = lastWeek.toISOString().slice(0, 10);
  
  const lastWeekEntry = weightHistory.find(entry => entry.date === lastWeekKey);
  
  if (lastWeekEntry) {
    const loss = (lastWeekEntry.weight - currentWeight).toFixed(1);
    return loss;
  }
  
  return '0';
}

// ==================== FEEDBACK HÁPTICO ====================

// Feedback háptico para móviles
function hapticFeedback(type) {
  if ('vibrate' in navigator && window.matchMedia('(display-mode: standalone)').matches) {
    var patterns = {
      light: [10],
      medium: [30],
      heavy: [50],
      success: [30, 50, 30],
      error: [100, 50, 100]
    };
    navigator.vibrate(patterns[type] || patterns.light);
  }
}

// Toast con feedback háptico
function showToastWithHaptic(message, type) {
  hapticFeedback(type || 'success');
  showToast(message);
}

// ==================== MODO OSCURO AUTOMÁTICO ====================

// Detectar tema del sistema
function setThemeFromSystem() {
  var savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
}

// Escuchar cambios del sistema
if (typeof window !== 'undefined' && window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      document.documentElement.classList.toggle('dark', e.matches);
    }
  });
}

// ==================== TOOLTIPS ====================

// Crear tooltip reutilizable
function showTooltip(element, message, position) {
  var existing = document.querySelector('.custom-tooltip');
  if (existing) existing.remove();
  
  var tooltip = document.createElement('div');
  tooltip.className = 'custom-tooltip fixed z-[100] px-3 py-2 rounded-lg text-sm text-white bg-surface-container-high shadow-lg pointer-events-none opacity-0 transition-opacity duration-200';
  tooltip.textContent = message;
  
  var rect = element.getBoundingClientRect();
  var tooltipRect = tooltip.getBoundingClientRect();
  
  var pos = position || 'top';
  if (pos === 'top') {
    tooltip.style.left = (rect.left + rect.width / 2 - 50) + 'px';
    tooltip.style.top = (rect.top - 40) + 'px';
  } else if (pos === 'bottom') {
    tooltip.style.left = (rect.left + rect.width / 2 - 50) + 'px';
    tooltip.style.top = (rect.bottom + 10) + 'px';
  }
  
  document.body.appendChild(tooltip);
  setTimeout(function() { tooltip.classList.remove('opacity-0'); }, 10);
  setTimeout(function() {
    tooltip.classList.add('opacity-0');
    setTimeout(function() { tooltip.remove(); }, 200);
  }, 2500);
}

// Inicializar tooltips en elementos con data-tooltip
function initTooltips() {
  document.querySelectorAll('[data-tooltip]').forEach(function(el) {
    el.addEventListener('mouseenter', function() {
      showTooltip(this, this.getAttribute('data-tooltip'), this.getAttribute('data-position') || 'top');
    });
    el.addEventListener('touchstart', function() {
      showTooltip(this, this.getAttribute('data-tooltip'), this.getAttribute('data-position') || 'top');
    }, { passive: true });
  });
}

// ==================== NOTIFICACIONES ====================

// Solicitar permiso de notificaciones
function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

// Programar notificación
function scheduleNotification(title, body, delayMinutes) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  
  setTimeout(function() {
    new Notification(title, {
      body: body,
      icon: 'icon-192.png',
      badge: 'icon-192.png'
    });
  }, delayMinutes * 60 * 1000);
}

// Notificación para recordar agua
function remindWater() {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('💧 Recordatorio de Hidratación', {
      body: 'No olvides beber agua hoy. Tu objetivo: 2L',
      icon: 'icon-192.png'
    });
  }
}

// ==================== UI HELPERS ====================

// Alternar tema oscuro/claro
function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  var theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  
  // Actualizar icono del botón si existe
  var icon = document.querySelector('header button[onclick="toggleTheme()"]');
  if (icon) {
    icon.textContent = theme === 'dark' ? 'dark_mode' : 'light_mode';
  }
  // Para perfil.html
  var icon2 = document.querySelector('#themeIcon');
  if (icon2) {
    icon2.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
  }
}

// Alternar sidebar colapsado
function toggleSidebar() {
  var b = document.body;
  var s = document.getElementById('sidebarNav');
  var t = document.getElementById('sidebarToggle');
  var p = document.querySelector('.topbar-pl');
  var m = document.querySelector('.main-content');
  
  b.classList.toggle('sidebar-collapsed');
  
  if (b.classList.contains('sidebar-collapsed')) {
    s.style.width = '72px';
    s.style.overflow = 'hidden';
    if (p) p.style.paddingLeft = '88px';
    if (m) m.style.marginLeft = '72px';
    if (t) {
      t.style.left = '72px';
      // Actualizar icono Chevron
      t.innerHTML = '<span class="material-symbols-outlined text-white/60 hover:text-primary-container text-lg">chevron_right</span>';
    }
    localStorage.setItem('sidebarCollapsed', 'true');
  } else {
    s.style.width = '256px';
    s.style.overflow = '';
    if (p) p.style.paddingLeft = '272px';
    if (m) m.style.marginLeft = '256px';
    if (t) {
      t.style.left = '256px';
      // Actualizar icono Chevron
      t.innerHTML = '<span class="material-symbols-outlined text-white/60 hover:text-primary-container text-lg">chevron_left</span>';
    }
    localStorage.setItem('sidebarCollapsed', 'false');
  }
}

// Inicializar sidebar desde localStorage
function initSidebar() {
  var s = document.getElementById('sidebarNav');
  var t = document.getElementById('sidebarToggle');
  var p = document.querySelector('.topbar-pl');
  var m = document.querySelector('.main-content');
  
  if (localStorage.getItem('sidebarCollapsed') === 'true') {
    document.body.classList.add('sidebar-collapsed');
    if (s) {
      s.style.width = '72px';
      s.style.overflow = 'hidden';
    }
    if (p) p.style.paddingLeft = '88px';
    if (m) m.style.marginLeft = '72px';
    if (t) {
      t.style.left = '72px';
      t.innerHTML = '<span class="material-symbols-outlined text-white/60 hover:text-primary-container text-lg">chevron_right</span>';
    }
  }
}

// ==================== INICIALIZACIÓN ====================

// ==================== EXPORT/IMPORT DATA ====================

// Alias para compatibilidad
function downloadBackup() {
  return exportAllData();
}

function triggerRestore() {
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = function(e) {
    var file = e.target.files[0];
    if (file) {
      importData(file, function(success) {
        if (success) {
          setTimeout(function() {
            location.reload();
          }, 1500);
        }
      });
    }
  };
  input.click();
}

// Obtener todas las claves de localStorage de la app
function getAllAppData() {
  var data = {};
  var keys = [
    'keto_profile',
    'keto_macros',
    'ketoFoods',
    'despensa',
    'customRecipes',
    'ketoWorkouts',
    'userData',
    'weight_history',
    'theme',
    'sidebarCollapsed',
    'ketolab_onboarding_done',
    'preferred_meal_mode',
    'preferred_workout_mode'
  ];
  
  keys.forEach(function(key) {
    var value = localStorage.getItem(key);
    if (value !== null) {
      data[key] = JSON.parse(value);
    }
  });
  
  // Agregar planes de comida (últimos 30 días)
  var mealPlans = {};
  var today = new Date();
  for (var i = 0; i < 30; i++) {
    var date = new Date(today);
    date.setDate(date.getDate() - i);
    var dateKey = date.toISOString().slice(0, 10);
    var plan = localStorage.getItem('mealPlan_' + dateKey);
    if (plan) {
      mealPlans[dateKey] = JSON.parse(plan);
    }
  }
  if (Object.keys(mealPlans).length > 0) {
    data.mealPlans = mealPlans;
  }
  
  // Agregar checklists (últimos 30 días)
  var checklists = {};
  for (var j = 0; j < 30; j++) {
    var cDate = new Date(today);
    cDate.setDate(cDate.getDate() - j);
    var cDateKey = cDate.toISOString().slice(0, 10);
    var checklist = localStorage.getItem('checklist_' + cDateKey);
    if (checklist) {
      checklists[cDateKey] = JSON.parse(checklist);
    }
  }
  if (Object.keys(checklists).length > 0) {
    data.checklists = checklists;
  }
  
  return data;
}

// Exportar todos los datos a archivo JSON
function exportAllData() {
  var data = getAllAppData();
  var now = new Date().toISOString();
  data.exportedAt = now;
  data.version = '1.0.0';
  
  // Guardar fecha de último backup
  localStorage.setItem('lastBackupDate', now);
  
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  var url = URL.createObjectURL(blob);
  
  var a = document.createElement('a');
  a.href = url;
  a.download = 'ketolab_backup_' + new Date().toISOString().slice(0, 10) + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  // Actualizar visualización de fecha si existe
  var lastBackupEl = document.getElementById('lastBackupDate');
  if (lastBackupEl) {
    lastBackupEl.textContent = new Date().toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  showToast('Datos exportados correctamente');
  return true;
}

// Importar datos desde archivo JSON
function importData(file, callback) {
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = JSON.parse(e.target.result);
      
      if (!data.version) {
        showToast('Archivo de backup inválido', 'error');
        return;
      }
      
      // Restaurar cada clave
      var restoredKeys = [];
      
      // Perfil y macros
      if (data.keto_profile) {
        localStorage.setItem('keto_profile', JSON.stringify(data.keto_profile));
        restoredKeys.push('Perfil');
      }
      if (data.keto_macros) {
        localStorage.setItem('keto_macros', JSON.stringify(data.keto_macros));
        restoredKeys.push('Macros');
      }
      if (data.userData) {
        localStorage.setItem('userData', JSON.stringify(data.userData));
        restoredKeys.push('Datos de usuario');
      }
      if (data.weight_history) {
        localStorage.setItem('weight_history', JSON.stringify(data.weight_history));
        restoredKeys.push('Historial de peso');
      }
      if (data.ketoFoods) {
        localStorage.setItem('ketoFoods', JSON.stringify(data.ketoFoods));
        restoredKeys.push('Alimentos');
      }
      if (data.despensa) {
        localStorage.setItem('despensa', JSON.stringify(data.despensa));
        restoredKeys.push('Despensa');
      }
      if (data.customRecipes) {
        localStorage.setItem('customRecipes', JSON.stringify(data.customRecipes));
        restoredKeys.push('Recetas personalizadas');
      }
      if (data.ketoWorkouts) {
        localStorage.setItem('ketoWorkouts', JSON.stringify(data.ketoWorkouts));
        restoredKeys.push('Entrenamientos');
      }
      
      // Restaurar mealPlans
      if (data.mealPlans) {
        Object.keys(data.mealPlans).forEach(function(dateKey) {
          localStorage.setItem('mealPlan_' + dateKey, JSON.stringify(data.mealPlans[dateKey]));
        });
        restoredKeys.push('Planes de comida');
      }
      
      // Restaurar checklists
      if (data.checklists) {
        Object.keys(data.checklists).forEach(function(dateKey) {
          localStorage.setItem('checklist_' + dateKey, JSON.stringify(data.checklists[dateKey]));
        });
        restoredKeys.push('Checklists');
      }
      
      showToast('Importación exitosa: ' + restoredKeys.join(', '));
      
      if (callback && typeof callback === 'function') {
        callback(true);
      }
      
    } catch (err) {
      console.error('Error importing data:', err);
      showToast('Error al importar: formato inválido', 'error');
      if (callback && typeof callback === 'function') {
        callback(false);
      }
    }
  };
  reader.onerror = function() {
    showToast('Error al leer archivo', 'error');
  };
  reader.readAsText(file);
}

// Auto-inicializar cuando el DOM esté listo
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    setThemeFromSystem();
    initTooltips();
  });
}

// ==================== NOTIFICACIONES PUSH ====================

// Solicitar permiso para notificaciones push
function requestPushPermission() {
  if (!('Notification' in window)) {
    showToast('Este navegador no soporta notificaciones push', 'error');
    return Promise.reject('No support');
  }
  
  if (Notification.permission === 'granted') {
    return Promise.resolve('granted');
  }
  
  if (Notification.permission !== 'denied') {
    return Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        localStorage.setItem('push_enabled', 'true');
        showToast('¡Notificaciones activadas!');
        subscribeToPush();
        return 'granted';
      } else {
        showToast('Notificaciones bloqueadas', 'error');
        return 'denied';
      }
    });
  }
  
  return Promise.resolve(Notification.permission);
}

// Suscribirse a push notifications (necesita backend con VAPID key)
function subscribeToPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    return Promise.reject('No support');
  }
  
  return navigator.serviceWorker.ready.then(function(registration) {
    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'
      )
    }).then(function(subscription) {
      localStorage.setItem('push_subscription', JSON.stringify(subscription));
      // Aquí se enviaría la suscripción al servidor
      return subscription;
    }).catch(function(err) {
      console.error('[Push] Error al suscribir:', err);
      return null;
    });
  });
}

// Convertir VAPID key base64 a Uint8Array
function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);
  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Verificar estado de notificaciones
function getPushStatus() {
  if (!('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission;
}

// Programar notificación local
function scheduleNotification(title, body, delayMinutes, tag) {
  var delay = delayMinutes * 60 * 1000;
  setTimeout(function() {
    showLocalNotification(title, body, tag);
  }, delay);
}

// Mostrar notificación local (sin push server)
function showLocalNotification(title, body, tag) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body: body,
      icon: './icons/icon-192x192.png',
      badge: './icons/icon-72x72.png',
      tag: tag || 'ketolab-notification',
      vibrate: [200, 100, 200]
    });
  }
}

// Programar recordatorios keto
function initKetoReminders() {
  var enabled = localStorage.getItem('reminders_enabled');
  if (enabled !== 'true') return;
  
  // Agua cada 2 horas (ejemplo)
  var waterGoal = localStorage.getItem('water_goal') || 2000;
  var currentWater = localStorage.getItem('current_water') || 0;
  
  if (currentWater < waterGoal) {
    scheduleNotification('💧 KetoLab', '¡Hora de beber agua! Objetivo: ' + (waterGoal - currentWater) + 'ml restantes', 120, 'water');
  }
}

// ==================== IMÁGENES DE RECETAS ====================

// Base de datos de imágenes de recetas (urls absolutas o locales)
var recipeImages = {
  'huevos-revueltos': './images/recipes/huevos.svg',
  'tortilla-espanola': './images/recipes/huevos.svg',
  'aguacate-relleno': './images/recipes/aguacate.svg',
  'ensalada-cesar': './images/recipes/ensalada.svg',
  'pollo-asado': './images/recipes/pollo-jugoso.svg',
  'carne-molida': './images/recipes/carne-molida.svg',
  'salmon-horno': './images/recipes/salmon.svg',
  'panceta-crispy': './images/recipes/panceta.svg',
  'pure-coliflor': './images/recipes/pure-coliflor.svg',
  'arroz-coliflor': './images/recipes/arroz-coliflor.svg',
  'hongos-ajillo': './images/recipes/hongos.svg',
  'aderezo-cesar': './images/recipes/aderezo.svg',
  'keto-bread': './images/recipes/pan.svg',
  'cheesecake': './images/recipes/cheesecake.svg'
};

// Obtener imagen de receta
function getRecipeImage(recipeId) {
  return recipeImages[recipeId] || './images/recipes/default.svg';
}

// ==================== SISTEMA MULTILINGÜE (i18n) ====================

// Strings en español (default)
var i18nStrings = {
  // Navegación
  'nav.inicio': 'Inicio',
  'nav.perfil': 'Perfil',
  'nav.alimentos': 'Alimentos',
  'nav.plan': 'Plan',
  'nav.despensa': 'Despensa',
  'nav.macros': 'Macros',
  'nav.checklist': 'Check',
  'nav.entrenamientos': 'Gym',
  'nav.suplementos': 'Sup',
  'nav.recetas': 'Recetas',
  'nav.backup': 'Backup',
  
  // Dashboard
  'dashboard.bienvenido': 'Bienvenido',
  'dashboard.peso': 'Peso',
  'dashboard.objetivo': 'Objetivo',
  'dashboard.ketosis': 'Ketosis',
  'dashboard.ultimo-peso': 'Último peso',
  'dashboard.progreso': 'Progreso',
  'dashboard.semana': 'Esta semana',
  'dashboard.mes': 'Este mes',
  
  // Macros
  'macros.calorias': 'Calorías',
  'macros.proteina': 'Proteína',
  'macros.grasa': 'Grasa',
  'macros.carbs': 'Carbohidratos',
  'macros.net-carbs': 'Carbs Netos',
  
  // Comunes
  'btn.guardar': 'Guardar',
  'btn.cancelar': 'Cancelar',
  'btn.eliminar': 'Eliminar',
  'btn.editar': 'Editar',
  'btn.agregar': 'Agregar',
  'btn.buscar': 'Buscar',
  'btn.exportar': 'Exportar',
  'btn.importar': 'Importar',
  
  // Notificaciones
  'notif.agua': '¡Hora de beber agua!',
  'notif.comida': 'Hora de comer',
  'notif.objetivo': '¡Objetivo completado!',
  
  // Settings
  'settings.idioma': 'Idioma',
  'settings.notificaciones': 'Notificaciones',
  'settings.tema': 'Tema',
  'settings.dark': 'Oscuro',
  'settings.light': 'Claro'
};

// Strings en inglés
var i18nStringsEn = {
  // Navegación
  'nav.inicio': 'Home',
  'nav.perfil': 'Profile',
  'nav.alimentos': 'Foods',
  'nav.plan': 'Plan',
  'nav.despensa': 'Pantry',
  'nav.macros': 'Macros',
  'nav.checklist': 'Check',
  'nav.entrenamientos': 'Gym',
  'nav.suplementos': 'Supp',
  'nav.recetas': 'Recipes',
  'nav.backup': 'Backup',
  
  // Dashboard
  'dashboard.bienvenido': 'Welcome',
  'dashboard.peso': 'Weight',
  'dashboard.objetivo': 'Goal',
  'dashboard.ketosis': 'Ketosis',
  'dashboard.ultimo-peso': 'Last weight',
  'dashboard.progreso': 'Progress',
  'dashboard.semana': 'This week',
  'dashboard.mes': 'This month',
  
  // Macros
  'macros.calorias': 'Calories',
  'macros.proteina': 'Protein',
  'macros.grasa': 'Fat',
  'macros.carbs': 'Carbohydrates',
  'macros.net-carbs': 'Net Carbs',
  
  // Comunes
  'btn.guardar': 'Save',
  'btn.cancelar': 'Cancel',
  'btn.eliminar': 'Delete',
  'btn.editar': 'Edit',
  'btn.agregar': 'Add',
  'btn.buscar': 'Search',
  'btn.exportar': 'Export',
  'btn.importar': 'Import',
  
  // Notificaciones
  'notif.agua': 'Time to drink water!',
  'notif.comida': 'Time to eat',
  'notif.objetivo': 'Goal completed!',
  
  // Settings
  'settings.idioma': 'Language',
  'settings.notificaciones': 'Notifications',
  'settings.tema': 'Theme',
  'settings.dark': 'Dark',
  'settings.light': 'Light'
};

// Obtener idioma actual
function getCurrentLang() {
  return localStorage.getItem('lang') || 'es';
}

// Establecer idioma
function setLang(lang) {
  localStorage.setItem('lang', lang);
  applyTranslations();
  showToast(lang === 'es' ? 'Idioma: Español' : 'Language: English');
}

// Obtener traducción
function t(key) {
  var lang = getCurrentLang();
  var strings = lang === 'en' ? i18nStringsEn : i18nStrings;
  return strings[key] || key;
}

// Aplicar traducciones a elementos con data-i18n
function applyTranslations() {
  if (typeof document === 'undefined') return;
  
  var elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    var translation = t(key);
    if (translation !== key) {
      el.textContent = translation;
    }
  });
  
  // Actualizar selector de idioma si existe
  var langSelector = document.getElementById('langSelector');
  if (langSelector) {
    langSelector.value = getCurrentLang();
  }
  var mobileLangSelector = document.getElementById('mobileLangSelector');
  if (mobileLangSelector) {
    mobileLangSelector.value = getCurrentLang();
  }
}

// Inicializar i18n
function initI18n() {
  // Detectar idioma del navegador si no hay preferencia guardada
  if (!localStorage.getItem('lang')) {
    var browserLang = navigator.language || navigator.userLanguage;
    if (browserLang && browserLang.startsWith('en')) {
      localStorage.setItem('lang', 'en');
    }
  }
  applyTranslations();
}

// Para Node.js (Jest)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    safeParseJSON, validateMealPlan, escapeHtml, schemas, getLocalData
  };
}
