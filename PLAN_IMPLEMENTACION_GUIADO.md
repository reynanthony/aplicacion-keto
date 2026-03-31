# 🗺️ PLAN DE IMPLEMENTACIÓN GUIADO - KetoLab
**Versión:** 1.0 | **Fecha:** 27-03-2026 | **Estado:** PLANIFICACIÓN  
**Objetivo:** Ejecutar todas las recomendaciones de análisis (8.5/10 → 9.5/10)

---

## 📍 NAVEGACIÓN RÁPIDA

- [FASE 1: Preparación](#fase-1-preparación) - Semana 1, Días 1-2
- [FASE 2: Refactoring Crítico](#fase-2-refactoring-crítico) - Semana 1-2
- [FASE 3: Testing & Validación](#fase-3-testing--validación) - Semana 2-3
- [FASE 4: Verificación Final](#fase-4-verificación-final) - Semana 3-4

---

## 🎯 VISIÓN GENERAL DEL PLAN

```
SEMANA 1 (Días 1-5): Refactoring Bloque 1
├── Lunes-Martes: Preparación + Código duplicado
├── Miércoles-Jueves: Dialogs nativos
└── Viernes: Code review + ajustes

SEMANA 2 (Días 6-10): Refactoring Bloque 2 + Testing
├── Lunes-Martes: Validación + localStorage
├── Miércoles: Error handling
├── Jueves-Viernes: Tests y Performance
└── Viernes: Deploy a staging

SEMANA 3-4 (Días 11-20): Testing Completo + Production
└── Validación en producción + documentación
```

**Esfuerzo Total: 40 horas** (distribuidas en 4 semanas)

---

# FASE 1: PREPARACIÓN

## Objetivo
Configurar ambiente, crear estructura de ramas, y preparar herramientas necesarias.

### 📋 TAREA 1.1: Setup de Git y Ramas
**Duración:** 30 minutos | **Responsable:** Lead dev

#### Paso 1.1.1: Crear rama principal para refactoring
```bash
# En terminal (PowerShell)
git checkout -b refactor/codigo-duplicado-y-dialogs
# Verificar
git branch
# Usar esta rama para TODA la Fase 1
```

#### Paso 1.1.2: Crear rama secundaria para cada módulo
```bash
git checkout -b refactor/funciones-utils
git checkout -b refactor/componente-modal
git checkout -b refactor/validacion-input
git checkout -b refactor/localstorage-schema
git checkout -b refactor/error-handling
git checkout -b refactor/performance
```

#### Paso 1.1.3: Crear archivos de configuración
```bash
# Crear carpeta para backups locales
mkdir -p backups/fase1
# Backup de estado actual
Copy-Item *.html, *.js backups/fase1/ -Recurse
```

**✅ Validación:**
- [ ] `git branch` muestra todas las ramas
- [ ] Carpeta `backups/fase1/` existe con arquivos

---

### 📋 TAREA 1.2: Setup de Testing Framework
**Duración:** 1 hora | **Responsable:** QA/Dev

#### Paso 1.2.1: Instalar Jest
```bash
npm install --save-dev jest @babel/preset-env babel-jest

# O si prefieres alternativa más simple
npm install --save-dev @testing-library/dom
```

#### Paso 1.2.2: Crear configuración Jest
**Crear archivo:** `jest.config.js`
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.js', '**/*.test.js'],
  collectCoverageFrom: [
    'utils.js',
    'modules/*.js',
    'food-api.js',
    '!node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 40,
      lines: 40,
      statements: 40
    }
  }
};
```

#### Paso 1.2.3: Agregar scripts a package.json
**Archivo:** `package.json`
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

**✅ Validación:**
- [ ] `npm test` ejecuta sin errores
- [ ] Jest crea carpeta `coverage/`

---

### 📋 TAREA 1.3: Audit de Código Actual
**Duración:** 1 hora | **Responsable:** Dev principal

#### Paso 1.3.1: Documentar funciones duplicadas
**Crear archivo:** `AUDIT_CODIGO_ACTUAL.md`

```markdown
# Auditoría de Código - Estado Actual

## Funciones Duplicadas Identificadas

### showToast() - Definida en 6 archivos
- [x] perfil.html - Línea ~123
- [x] plan.html - Línea ~456
- [x] macros.html - Línea ~234
- [x] recetas.html - Línea ~567
- [x] entrenamientos.html - Línea ~789
- [x] scanner.html - Línea ~345
- [ ] alimentos.html - IMPORTA desde utils.js ✓

**Acción:** REMOVER de 6 archivos, MANTENER solo en utils.js

### initSidebar() - Definida en múltiples
- [x] index.html - Línea ~500
- [x] plan.html - Línea ~400
- [x] checklist.html - Línea ~250

**Acción:** Centralizar en utils.js como initAllSidebars()

[continuar con otras funciones...]
```

**✅ Validación:**
- [ ] Documento creado y completo
- [ ] Líneas exactas identificadas para cada función

---

### 📋 TAREA 1.4: Crear Checklist Master
**Duración:** 30 minutos | **Responsable:** PM/Lead

**Crear archivo:** `CHECKLIST_IMPLEMENTACION.md`

```markdown
# ✅ Checklist Master de Implementación

## FASE 1: PREPARACIÓN [ACTUAL]
- [x] Setup git y ramas
- [x] Jest instalado
- [x] Audit de código
- [ ] **→ Proceder a FASE 2**

## FASE 2: REFACTORING CRÍTICO
### Bloque 1: Código Duplicado (8h)
- [ ] 1.A Mover showToast() a utils.js
- [ ] 1.B Remover showToast() de 6 HTML
- [ ] 1.C Mover initSidebar() a utils.js
- [ ] 1.D Mover CSS .glass-card a styles/
- [ ] Validar: npm run test (debe pasar)

### Bloque 2: Dialogs Nativos (6h)
- [ ] 2.A Crear componente Modal en utils.js
- [ ] 2.B Agregar CSS animación en styles/
- [ ] 2.C Reemplazar 42 instancias de alert()
- [ ] 2.D Reemplazar 14 instancias de confirm()
- [ ] Validar: Todos los dialogs funcionan en navegador

### Bloque 3: Validación (4h)
- [ ] 3.A Crear validateFoodInput() en utils.js
- [ ] 3.B Implementar en alimentos.html
- [ ] 3.C Usar escapeHtml() en todos innerHTML
- [ ] Validar: Sin XSS en inputs

## FASE 3: TESTING & PERFORMANCE
- [ ] 4.A Crear suite de tests básicos
- [ ] 4.B Agregar lazy loading
- [ ] 4.C Optimizar images/icons
- [ ] Validar: Cobertura ≥60%

## FASE 4: VERIFICACIÓN FINAL
- [ ] 5.A Deploy a staging
- [ ] 5.B Testing manual completo
- [ ] 5.C Code review
- [ ] 5.D Deploy a producción
```

**✅ Validación:**
- [ ] Documento creado
- [ ] Listo para marcar conforme avanza

---

### ⏸️ FIN FASE 1
**Si todo está ✅ validado, proceder a FASE 2**

---

# FASE 2: REFACTORING CRÍTICO

## Objetivo
Eliminar código duplicado, reemplazar dialogs nativos, mejorar validación.

### 🔴 BLOQUE 1: CÓDIGO DUPLICADO (8 horas)

---

## 📋 TAREA 2.1: Centralizar showToast() en utils.js
**Duración:** 2 horas | **Rama:** `refactor/funciones-utils`

### Propósito
Eliminar 6 definiciones idénticas de `showToast()`, mantener solo en `utils.js`

### Paso 2.1.1: Verificar showToast() en utils.js
**Archivo:** `utils.js`

```javascript
// Línea ~XXX - BUSCAR:
function showToast(message, duration = 3000, type = 'info') {
  // ... código
}
```

✅ **DEBE existir ya en utils.js**

Si NO existe, copiar desde `perfil.html` línea ~123:
```javascript
function showToast(msg, t = 3000, typ = "info") {
  var toast = document.createElement("div");
  toast.className = "fixed bottom-4 right-4 px-4 py-3 rounded-lg text-white text-sm font-medium z-50 animate-slideUp " +
    (typ === "success" ? "bg-green-600" : typ === "error" ? "bg-red-600" : "bg-blue-600");
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, t);
}
```

### Paso 2.1.2: Remover showToast() de HTML duplicados

**Archivo 1:** `perfil.html`
```javascript
// BUSCAR Y BORRAR (línea ~123):
function showToast(msg, t = 3000, typ = "info") {
  var toast = document.createElement("div");
  // ... todas las líneas hasta el cierre }
}
```

**Archivo 2:** `plan.html` - repetir proceso
**Archivo 3:** `macros.html` - repetir proceso
**Archivo 4:** `recetas.html` - repetir proceso
**Archivo 5:** `entrenamientos.html` - repetir proceso
**Archivo 6:** `scanner.html` - repetir proceso

**Archivo 7:** `alimentos.html` - YA IMPORTA desde utils.js ✅ (no modificar)

### Paso 2.1.3: Validar que showToast funciona
**Ejecutar:** Abrir navegador en `index.html`
```javascript
// En consola:
showToast("Test message", 2000, "success");
// Debe mostrar toast verde en esquina inferior derecha
```

**✅ Validación:**
- [ ] showToast() existe solo en utils.js
- [ ] 6 HTML NO tienen definición local
- [ ] Funciona en navegador

### Paso 2.1.4: Commit
```bash
git add perfil.html plan.html macros.html recetas.html entrenamientos.html scanner.html utils.js
git commit -m "refactor: centralizar showToast() en utils.js"
```

---

## 📋 TAREA 2.2: Centralizar initSidebar()
**Duración:** 2 horas | **Rama:** `refactor/funciones-utils`

### Paso 2.2.1: Crear initAllSidebars() en utils.js
**Agregar a utils.js** (al final, antes de cerrar):

```javascript
// ==================== SIDEBAR INITIALIZATION ====================

function initAllSidebars() {
  // Ejecutar en TODAS las páginas para inicializar sidebar uniformemente
  initSidebar?.call; // Si existe en el archivo actual
  
  // Asegurar que tema oscuro está aplicado
  if (localStorage.getItem('theme') === 'dark' || !localStorage.getItem('theme')) {
    document.documentElement.classList.add('dark');
  }
  
  // Aplicar estado del sidebar colapsado
  if (localStorage.getItem('sidebarCollapsed') === 'true') {
    collapseSidebar?.call;
  }
}

// Llamar al cargar la página
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllSidebars);
} else {
  initAllSidebars();
}
```

### Paso 2.2.2: Remover duplicados de init en HTML
**Archivos afectados:** `index.html`, `plan.html`, `checklist.html`

En cada archivo, BUSCAR Y BORRAR el código de inicialización duplicado (típicamente al final del script):

```javascript
// ❌ BUSCAR Y BORRAR en cada HTML:
// (Varios cientos de líneas de inicialización de sidebar/tema)
// if(localStorage.getItem("theme")==="dark"||...{
```

**✅ Validación:**
- [ ] initAllSidebars() existe en utils.js
- [ ] No hay duplicados en 3 HTML
- [ ] Sidebar funciona igual que antes

---

## 📋 TAREA 2.3: Centralizar CSS .glass-card
**Duración:** 2 horas | **Rama:** `refactor/funciones-utils`

### Paso 2.3.1: Crear archivo CSS centralizado
**Crear archivo:** `styles/components.css`

```css
/* ==================== GLASS CARD COMPONENT ==================== */

.glass-card {
  background: rgba(36, 34, 34, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 77, 0, 0.1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 1rem;
}

.glass-card:hover {
  border-color: rgba(255, 77, 0, 0.3);
  transform: translateY(-2px);
}

.glass-card.active {
  border-color: rgba(255, 77, 0, 0.5);
  background: rgba(36, 34, 34, 0.6);
}

/* ==================== CARD VARIANTS ==================== */

.glass-card-sm {
  padding: 1rem;
  background: rgba(36, 34, 34, 0.3);
}

.glass-card-lg {
  padding: 1.5rem;
  background: rgba(36, 34, 34, 0.5);
}

/* ==================== PROGRESS RING ==================== */

.progress-ring-glow {
  filter: drop-shadow(0 0 12px rgba(255, 77, 0, 0.4));
}

.shadow-glow {
  box-shadow: 0 10px 30px rgba(255, 77, 0, 0.15);
}

.shadow-glow-strong {
  box-shadow: 0 10px 30px rgba(255, 77, 0, 0.4);
}

/* ==================== ANIMATIONS ==================== */

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
.pulse-hover:hover { animation: pulse 0.3s ease-in-out; }
.skeleton {
  background: linear-gradient(90deg, #1e1c1c 25%, #242222 50%, #1e1c1c 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}
```

### Paso 2.3.2: Incluir en TODOS los HTML
**Agregar en `<head>` de cada archivo HTML** (ANTES de `</head>`):

```html
<!-- Componentes y estilos centralizados -->
<link rel="stylesheet" href="styles/components.css">
<link rel="stylesheet" href="styles/animations.css">
<link rel="stylesheet" href="styles/mobile-enhancements.css">
```

**Archivos a modificar:**
- [ ] index.html
- [ ] alimentos.html
- [ ] plan.html
- [ ] perfil.html
- [ ] recetas.html
- [ ] entrenamientos.html
- [ ] checklist.html
- [ ] macros.html
- [ ] compras.html
- [ ] suplementos.html
- [ ] scanner.html

### Paso 2.3.3: Remover CSS inline duplicado
**En cada HTML, BUSCAR Y BORRAR:**

```html
<!-- ❌ BUSCAR Y BORRAR este bloque <style> completo -->
<style>
.glass-card {
  background: rgba(36, 34, 34, 0.4);
  ... 
}
@keyframes fadeInUp { ... }
</style>
```

**✅ Validación:**
- [ ] `styles/components.css` creado
- [ ] Incluido en todos 10 HTML
- [ ] CSS inline removido (búsqueda no encontrar duplicados)
- [ ] Página sigue viéndose igual

---

## 📋 TAREA 2.4: Crear archivos de test para refactoring
**Duración:** 1 hora | **Rama:** `refactor/funciones-utils`

**Crear archivo:** `__tests__/utils.test.js`

```javascript
describe('Funciones Centralizadas', () => {
  
  test('showToast crea elemento DOM', () => {
    document.body.innerHTML = '';
    showToast('Test message', 1000, 'info');
    const toast = document.querySelector('[class*="bottom"]');
    expect(toast).toBeTruthy();
    expect(toast.textContent).toBe('Test message');
  });
  
  test('escapeHtml previene XSS', () => {
    const malicious = '<script>alert("xss")</script>';
    const escaped = escapeHtml(malicious);
    expect(escaped).not.toContain('<script>');
  });
  
  test('safeParseJSON maneja JSON inválido', () => {
    const invalid = '{invalid json}';
    const result = safeParseJSON(invalid, { default: 'value' });
    expect(result).toEqual({ default: 'value' });
  });
  
});
```

**Ejecutar:**
```bash
npm test -- __tests__/utils.test.js
```

**✅ Validación:**
- [ ] Todos los tests pasan
- [ ] Coverage util.js ≥70%

---

## ⏸️ FIN BLOQUE 1
**Checkpoint:** Verificar que NO se rompió nada
```bash
# En navegador - probar cada página
# ✅ index.html
# ✅ plan.html
# ✅ alimentos.html
# [todas las páginas deben funcionar igual]
```

---

## 🔴 BLOQUE 2: DIALOGS NATIVOS (6 horas)

---

## 📋 TAREA 2.5: Crear Componente Modal Personalizado
**Duración:** 2 horas | **Rama:** `refactor/componente-modal`

### Paso 2.5.1: Agregar Modal a utils.js
**Agregar al final de `utils.js`:**

```javascript
// ==================== COMPONENTE MODAL PERSONALIZADO ====================

// Estado global del modal
var modalState = {
  isOpen: false,
  callback: null,
  type: 'info',
  title: '',
  message: '',
  confirmText: 'Aceptar',
  cancelText: 'Cancelar',
  isPrompt: false,
  promptValue: ''
};

// Inicializar Modal (corre una sola vez)
function initCustomModal() {
  if (document.getElementById('customModal')) return;
  
  var modalHTML = `
    <div id="customModal" class="fixed inset-0 bg-black/50 hidden z-50 flex items-center justify-center">
      <div class="bg-surface-container rounded-lg p-6 max-w-md w-[90%] shadow-2xl fade-in-up">
        <div id="modalTitle" class="text-xl font-bold mb-4 text-on-surface"></div>
        <div id="modalMessage" class="text-on-surface-variant mb-6 leading-relaxed whitespace-pre-wrap"></div>
        
        <div id="promptContainer" class="hidden mb-4">
          <input id="promptInput" type="text" class="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-on-surface">
        </div>
        
        <div id="modalActions" class="flex gap-3 justify-end">
          <button id="modalCancelBtn" onclick="closeCustomModal()" 
                  class="px-4 py-2 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-high transition">
            Cancelar
          </button>
          <button id="modalConfirmBtn" onclick="confirmCustomModal()"
                  class="px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-medium hover:opacity-90 transition">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Event listeners
  var modal = document.getElementById('customModal');
  
  // Clic en fondo cierra modal
  modal.addEventListener('click', function(e) {
    if (e.target === this) closeCustomModal();
  });
  
  // ESC cierra modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalState.isOpen) closeCustomModal();
  });
  
  // Enter en prompt = confirmar
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && modalState.isPrompt && modalState.isOpen) {
      confirmCustomModal();
    }
  });
}

// Mostrar modal con opciones
function showModal(options) {
  var defaults = {
    type: 'info',
    title: 'Atención',
    message: '',
    confirmText: 'Aceptar',
    cancelText: 'Cancelar',
    callback: null,
    isPrompt: false,
    promptDefault: ''
  };
  
  modalState = Object.assign({}, defaults, options);
  
  var modal = document.getElementById('customModal');
  if (!modal) initCustomModal();
  
  // Actualizar contenido
  document.getElementById('modalTitle').textContent = modalState.title;
  document.getElementById('modalMessage').innerHTML = escapeHtml(modalState.message);
  document.getElementById('modalConfirmBtn').textContent = modalState.confirmText;
  document.getElementById('modalCancelBtn').textContent = modalState.cancelText;
  
  // Mostrar input si es prompt
  var promptContainer = document.getElementById('promptContainer');
  if (modalState.isPrompt) {
    promptContainer.classList.remove('hidden');
    document.getElementById('promptInput').value = modalState.promptDefault || '';
    setTimeout(() => document.getElementById('promptInput').focus(), 100);
  } else {
    promptContainer.classList.add('hidden');
  }
  
  // Colorear botón según tipo
  var confirmBtn = document.getElementById('modalConfirmBtn');
  confirmBtn.classList.remove('bg-red-600', 'bg-green-600', 'bg-yellow-600', 'bg-primary-container');
  
  switch(modalState.type) {
    case 'error':
      confirmBtn.classList.add('bg-red-600');
      break;
    case 'success':
      confirmBtn.classList.add('bg-green-600');
      break;
    case 'warning':
      confirmBtn.classList.add('bg-yellow-600');
      break;
    default:
      confirmBtn.classList.add('bg-primary-container');
  }
  
  // Mostrar modal
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  modalState.isOpen = true;
}

// Cerrar modal
function closeCustomModal() {
  var modal = document.getElementById('customModal');
  if (!modal) return;
  
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  modalState.isOpen = false;
  
  if (typeof modalState.callback === 'function') {
    modalState.callback(false);
  }
}

// Confirmar modal
function confirmCustomModal() {
  var result = modalState.isPrompt ? 
    document.getElementById('promptInput').value : 
    true;
  
  closeCustomModal();
  
  if (typeof modalState.callback === 'function') {
    modalState.callback(result);
  }
}

// ==================== WRAPPERS DE COMPATIBILIT

AD ====================

// Reemplazar alert() nativo
function customAlert(message) {
  return new Promise(resolve => {
    showModal({
      type: 'info',
      title: 'Aviso',
      message: message,
      confirmText: 'OK',
      callback: () => resolve()
    });
  });
}

// Reemplazar confirm() nativo
function customConfirm(message) {
  return new Promise(resolve => {
    showModal({
      type: 'warning',
      title: '¿Continuar?',
      message: message,
      confirmText: 'Sí',
      cancelText: 'No',
      callback: resolve
    });
  });
}

// Reemplazar prompt() nativo
function customPrompt(message, defaultValue = '') {
  return new Promise(resolve => {
    showModal({
      type: 'info',
      title: message,
      message: 'Ingresa un valor:',
      isPrompt: true,
      promptDefault: defaultValue,
      confirmText: 'OK',
      cancelText: 'Cancelar',
      callback: (result) => resolve(result === false ? null : result)
    });
  });
}

// Inicializar modal al cargar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCustomModal);
} else {
  initCustomModal();
}
```

### Paso 2.5.2: Agregar CSS para animación
**Agregar a `styles/components.css`** (al final):

```css
/* ==================== MODAL COMPONENT ==================== */

#customModal {
  animation: fadeIn 0.3s ease-out;
}

#customModal > div {
  animation: slideUp 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

#promptInput {
  outline: none;
  transition: all 0.2s;
}

#promptInput:focus {
  border-color: #ff4d00;
  box-shadow: 0 0 0 3px rgba(255, 77, 0, 0.1);
}
```

**✅ Validación:**
- [ ] Modal HTML en DOM
- [ ] CSS animaciones correctas
- [ ] Funciona en navegador: `showModal({title: 'Test', message: 'Works'})`

---

## 📋 TAREA 2.6: Reemplazar 42 Instancias de alert()/confirm()/prompt()
**Duración:** 3 horas | **Rama:** `refactor/componente-modal`

### Lista Completa de Reemplazos

#### plan.html - 8 alert + 3 confirm (total: 11)

**Línea ~413:** 
```javascript
// ANTES:
alert("Plan copiado de ayer!")

// DESPUÉS:
customAlert("Plan copiado de ayer!")
```

**Línea ~414:**
```javascript
// ANTES:
if (!confirm("Reiniciar el plan del día seleccionado?")) return;

// DESPUÉS:
const confirmed = await customConfirm("¿Reiniciar el plan del día seleccionado?");
if (!confirmed) return;
```

**[Continuar para todas las 11 instancias en plan.html]**

---

#### entrenamientos.html - 2 alert + 3 confirm (total: 5)

**Línea ~613:**
```javascript
// ANTES:
if (!confirm('Eliminar este entrenamiento?')) return;

// DESPUÉS:
const confirmed = await customConfirm('¿Eliminar este entrenamiento?');
if (!confirmed) return;
```

**[Continuar para todas las 5 instancias]**

---

#### alimentos.html - 3 alert + 2 confirm + 1 prompt (total: 6)

**Línea ~386:**
```javascript
// ANTES:
if (!confirm("Eliminar este alimento?")) return;

// DESPUÉS:
const confirmed = await customConfirm("¿Eliminar este alimento?");
if (!confirmed) return;
```

**Línea ~398 (prompt):**
```javascript
// ANTES:
var meal = prompt("¿A qué comida?: "+meals.join(", "));

// DESPUÉS:
const meal = await customPrompt("¿A qué comida?", "Desayuno");
```

**[Continuar para todas las 6 instancias]**

---

#### Otros archivos (total: 20 restantes)

- **checklist.html**: 1 confirm
- **compras.html**: 1 confirm  
- **compras.js**: 2 alert + 2 confirm
- **food-api.js**: 1 prompt
- **index.html**: 2 alert + 1 confirm
- **macros.html**: 1 confirm
- **scanner.html**: 2 alert
- **suplementos.html**: 1 prompt

**Patrón de reemplazo:**
```javascript
// alert() → customAlert()
// confirm() → await customConfirm()
// prompt() → await customPrompt()
```

⚠️ **NOTA IMPORTANTE:** Cuando uses `await`, la función debe ser `async`:

```javascript
// ANTES:
function resetPlan() {
  if (!confirm("¿Reiniciar?")) return;
  // ... resto de código
}

// DESPUÉS:
async function resetPlan() {  // ← Agregar 'async'
  const confirmed = await customConfirm("¿Reiniciar?");
  if (!confirmed) return;
  // ... resto de código
}
```

### Checklist de Reemplazo

**Crear documento:** `RESORCES REPLACEDS_DIALOGS.md`

```markdown
# Dialogs Reemplazados

## plan.html (11/11)
- [x] Línea 413: alert() #1
- [x] Línea 413: alert() #2
- [ ] ...continuar

## entrenamientos.html (5/5)
- [ ] ...

## alimentos.html (6/6)
- [ ] ...

[completar para todos los archivos]

**Total:** 42/42 reemplazados cuando todo esté marcado
```

**✅ Validación:**
- [ ] Todos los archivos compilables (sin errores de sintaxis)
- [ ] Probar cada dialog en navegador (click → debe abrir modal)
- [ ] Modal desaparece al confirmar/cancelar

---

## ⏸️ FIN BLOQUE 2
**Commit:**
```bash
git add utils.js styles/components.css
git add plan.html entrenamientos.html alimentos.html ...
git commit -m "refactor: reemplazar dialogs nativos con Modal personalizado"
```

**Checkpoint:** Abrir navegador, probar 5 dialogs diferentes
- [ ] alert funciona
- [ ] confirm abre modal
- [ ] prompt permite input
- [ ] ESC cierra modal
- [ ] Clic en fondo cierra modal

---

## 🟡 BLOQUE 3: VALIDACIÓN (4 horas)

---

## 📋 TAREA 2.7: Crear Validadores Robustos
**Duración:** 1.5 horas | **Rama:** `refactor/validacion-input`

### Paso 2.7.1: Agregar a utils.js

```javascript
// ==================== VALIDADORES ====================

// Validador de alimentos
function validateFoodInput(foodData) {
  const errors = [];
  
  // Nombre: requerido, 2-50 chars
  if (!foodData.name || foodData.name.trim().length < 2) {
    errors.push('Nombre debe tener mínimo 2 caracteres');
  }
  if (foodData.name && foodData.name.length > 50) {
    errors.push('Nombre no puede exceder 50 caracteres');
  }
  
  // Calorías: número 0-1000
  const cal = parseFloat(foodData.calories);
  if (isNaN(cal) || cal < 0 || cal > 1000) {
    errors.push('Calorías debe ser número entre 0-1000');
  }
  
  // Macros: número 0-500
  ['protein', 'fat', 'carbs'].forEach(macro => {
    const val = parseFloat(foodData[macro]);
    if (isNaN(val) || val < 0 || val > 500) {
      errors.push(`${macro} debe ser número entre 0-500`);
    }
  });
  
  return { valid: errors.length === 0, errors };
}

// Validador de usuario
function validateUserData(userData) {
  const errors = [];
  
  const weight = parseFloat(userData.currentWeight);
  if (isNaN(weight) || weight < 20 || weight > 500) {
    errors.push('Peso debe estar entre 20-500 kg');
  }
  
  const goal = parseFloat(userData.goalWeight);
  if (isNaN(goal) || goal < 20 || goal > 500) {
    errors.push('Peso objetivo debe estar entre 20-500 kg');
  }
  
  return { valid: errors.length === 0, errors };
}

// Validador genérico de número
function validateNumber(value, min, max, fieldName) {
  const num = parseFloat(value);
  if (isNaN(num)) return `${fieldName} debe ser un número`;
  if (num < min || num > max) return `${fieldName} debe estar entre ${min}-${max}`;
  return null;
}

// Validador de texto
function validateText(value, minLen, maxLen, fieldName) {
  if (!value || value.trim().length < minLen) {
    return `${fieldName} mínimo ${minLen} caracteres`;
  }
  if (value.length > maxLen) {
    return `${fieldName} máximo ${maxLen} caracteres`;
  }
  return null;
}
```

### Paso 2.7.2: Integrar en alimentos.html
**Buscar función `saveFood()` en alimentos.html** (aproximadamente línea ~388):

```javascript
// ANTES:
function saveFood() {
  var id = document.getElementById("foodId").value;
  var name = document.getElementById("foodName").value.trim();
  var calories = parseInt(document.getElementById("foodCalories").value) || 0;
  // ... sin validación
  if (!name) { alert("Ingresa el nombre..."); return; }
  // ... guardar sin validación completa
}

// DESPUÉS:
function saveFood() {
  var id = document.getElementById("foodId").value;
  var name = escapeHtml(document.getElementById("foodName").value.trim());
  var calories = parseInt(document.getElementById("foodCalories").value) || 0;
  var protein = parseFloat(document.getElementById("foodProtein").value) || 0;
  var fat = parseFloat(document.getElementById("foodFat").value) || 0;
  var carbs = parseFloat(document.getElementById("foodCarbs").value) || 0;
  var category = document.getElementById("foodCategory").value;
  
  // Validar datos
  var foodData = { name, calories, protein, fat, carbs, category };
  var validation = validateFoodInput(foodData);
  
  if (!validation.valid) {
    showModal({
      type: 'error',
      title: 'Datos inválidos',
      message: validation.errors.join('\n'),
      confirmText: 'OK'
    });
    return;
  }
  
  // ... resto de lógica de guardado
  showToast(id ? "Alimento actualizado" : "Alimento guardado", 3000, "success");
}
```

**✅ Validación:**
- [ ] Intentar agregar alimento sin nombre → muestra error
- [ ] Intentar agregar calorías inválidas → muestra error
- [ ] Alimento válido se guarda correctamente

---

## 📋 TAREA 2.8: Usar escapeHtml() consistentemente
**Duración:** 1.5 horas | **Rama:** `refactor/validacion-input`

### Paso 2.8.1: Auditoría de innerHTML en alimentos.html

**BUSCAR mediante Ctrl+F:** `innerHTML +=` en alimentos.html

Encontrar todas las líneas donde se inserta HTML con datos del usuario.

**PATRÓN a buscar:**
```javascript
// ❌ RIESGO:
element.innerHTML += `<div>${food.name}</div>`;

// ✅ SEGURO:
element.innerHTML += `<div>${escapeHtml(food.name)}</div>`;
```

### Paso 2.8.2: Reemplazar en alimentos.html

**Buscar y reemplazar patrones:**

```
Buscar:  innerHTML += `<div>${food.name}</div>`
Reemplazar: innerHTML += `<div>${escapeHtml(food.name)}</div>`
```

**Archivos con riesgo de XSS:**
- [ ] alimentos.html - ~3 lugares
- [ ] plan.html - ~2 lugares
- [ ] entrenamientos.html - ~2 lugares

**✅ Validación:**
- [ ] Sin errores en consola
- [ ] Página renderiza correctamente
- [ ] Probar ingresando carácter especial en nombre → se escapa

---

## 📋 TAREA 2.9: Crear Tests para Validación
**Duración:** 1 hora | **Rama:** `refactor/validacion-input`

**Crear archivo:** `__tests__/validation.test.js`

```javascript
describe('Validadores', () => {
  
  test('validateFoodInput - nombre requerido', () => {
    const result = validateFoodInput({ name: '', calories: 100 });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
  
  test('validateFoodInput - calorías válidas', () => {
    const result = validateFoodInput({
      name: 'Pollo',
      calories: 165,
      protein: 31,
      fat: 3,
      carbs: 0
    });
    expect(result.valid).toBe(true);
  });
  
  test('validateNumber - número inválido', () => {
    const error = validateNumber('abc', 0, 100, 'Peso');
    expect(error).toBeTruthy();
  });
  
  test('escapeHtml - previene XSS', () => {
    const malicious = '<img src=x onerror="alert(1)">';
    const escaped = escapeHtml(malicious);
    expect(escaped).not.toContain('onerror');
  });
  
});
```

**Ejecutar:**
```bash
npm test -- __tests__/validation.test.js
```

---

## ⏸️ FIN BLOQUE 3
**Commit:**
```bash
git add utils.js alimentos.html plan.html entrenamientos.html
git add __tests__/validation.test.js
git commit -m "refactor: agregar validación robusta y escapeHtml"
```

**Checkpoint:** npm test debe pasar todas las pruebas

---

## ⏸️ FIN FASE 2
**Commit final de refactoring crítico:**
```bash
git checkout main
git merge refactor/codigo-duplicado-y-dialogs
git push origin main
```

**Estado esperado:** Calidad 8.5/10 → 9.0/10

---

# FASE 3: TESTING & VALIDACIÓN

(Continúa en siguiente sección)

---

**Este es un documento vivo. Se actualiza conforme avanza la implementación.**

**Último update:** 27-03-2026  
**Estado:** FASE 2 DE 4
