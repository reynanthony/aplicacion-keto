// ==================== UTILIDADES COMPARTIDAS - KetoLab ====================
// Este archivo contiene funciones comunes usadas por todos los módulos

// ==================== SEGURIDAD ====================

// Sanitizar texto para prevenir XSS
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
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('[Utils] Error saving to localStorage:', e.message);
    return false;
  }
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

// Mostrar toast (implementación compatible con todos los módulos)
function showToast(message, duration) {
  if (!message) return;
  
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 z-[70] hidden opacity-0 translate-y-4 pointer-events-none transition-all duration-300';
    toast.innerHTML = '<div class="glass-card rounded-full px-6 py-3 flex items-center gap-3 shadow-lg"><span class="material-symbols-outlined text-primary-container">info</span><span class="text-white font-medium"></span></div>';
    document.body.appendChild(toast);
  }
  
  const messageSpan = toast.querySelector('span:last-child');
  if (messageSpan) {
    messageSpan.textContent = message;
  }
  
  toast.classList.remove('hidden', 'opacity-0', 'translate-y-4', 'pointer-events-none');
  toast.classList.add('opacity-100', 'translate-y-0');
  
  setTimeout(function() {
    toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
    toast.classList.remove('opacity-100', 'translate-y-0');
  }, duration || 3000);
}

// ==================== EXPORTAR PARA USO GLOBAL ====================
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

// ==================== INICIALIZACIÓN ====================

// Auto-inicializar cuando el DOM esté listo
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('[Utils] Utils loaded successfully');
  });
}
