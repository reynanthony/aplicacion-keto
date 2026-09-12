# MASTER PROJECT WORKFLOW

## Flujo Maestro de Desarrollo, Diseño, Optimización y Evolución de Aplicaciones

**Versión:** 1.0
**Ámbito:** Web / PWA / APK / Desktop
**Herramientas de referencia:** Figma + Git + AI Coding Agent
**Documentos relacionados:**

* `MASTER-UI-UX-DESIGN-SPEC.md`
* `MASTER-APP-OPTIMIZATION.md`

---

# 1. PROPÓSITO

Este documento define el flujo completo para crear, rediseñar, actualizar, optimizar y mantener aplicaciones.

Su objetivo es evitar el desarrollo improvisado.

La aplicación debe evolucionar mediante un proceso controlado:

```text
IDEA
 ↓
PRODUCT DEFINITION
 ↓
UX
 ↓
INFORMATION ARCHITECTURE
 ↓
WIREFRAMES
 ↓
DESIGN SYSTEM
 ↓
UI DESIGN
 ↓
PROTOTYPE
 ↓
TECHNICAL ARCHITECTURE
 ↓
IMPLEMENTATION
 ↓
TESTING
 ↓
OPTIMIZATION
 ↓
RELEASE
 ↓
MONITORING
 ↓
ITERATION
```

---

# 2. PRINCIPIO FUNDAMENTAL

## NO PROGRAMAR ANTES DE SABER QUÉ SE VA A CONSTRUIR

El código no debe utilizarse para descubrir el producto.

Primero se define:

* qué problema resuelve;
* quién lo utiliza;
* qué debe hacer;
* cómo se navega;
* cómo se ve;
* cómo responde;
* cómo se comporta en diferentes dispositivos.

Después se implementa.

---

# 3. FUENTES DE VERDAD

El proyecto tendrá tres fuentes principales de verdad.

## PRODUCT

Define:

> qué debe hacer la aplicación.

## DESIGN

Define:

> cómo debe verse y comportarse.

## CODE

Define:

> cómo está implementado.

La relación correcta es:

```text
PRODUCT
   ↓
DESIGN
   ↓
CODE
```

El código no debe convertirse accidentalmente en la definición del producto.

---

# 4. DOCUMENTOS MAESTROS

Todo proyecto deberá reconocer:

```text
/docs/

MASTER-PROJECT-WORKFLOW.md
MASTER-UI-UX-DESIGN-SPEC.md
MASTER-APP-OPTIMIZATION.md
```

Y, según la fase:

```text
PRODUCT-SPEC.md
DESIGN-REVIEW.md
AUDIT-REPORT.md
OPTIMIZATION-PLAN.md
OPTIMIZATION-FINAL-REPORT.md
RELEASE-REPORT.md
```

---

# 5. ESTRUCTURA DEL PROYECTO

Recomendación:

```text
PROJECT
│
├── docs/
│   ├── MASTER-PROJECT-WORKFLOW.md
│   ├── MASTER-UI-UX-DESIGN-SPEC.md
│   ├── MASTER-APP-OPTIMIZATION.md
│   ├── PRODUCT-SPEC.md
│   ├── DESIGN-REVIEW.md
│   ├── AUDIT-REPORT.md
│   └── RELEASE-REPORT.md
│
├── design/
│
├── src/
│
├── tests/
│
├── public/
│
└── ...
```

Adaptar la estructura al framework real.

No mover carpetas únicamente para cumplir este ejemplo.

---

# 6. FASE 0 — IDEA

Antes de escribir código definir:

### Problema

¿Qué problema se intenta resolver?

### Usuario

¿Quién tiene ese problema?

### Solución

¿Cómo lo resolverá la aplicación?

### Resultado

¿Qué debe conseguir el usuario?

---

# 7. PRODUCT SPEC

Crear:

`PRODUCT-SPEC.md`

Debe incluir:

```text
1. Product vision
2. Target users
3. Problem
4. Solution
5. Core features
6. Secondary features
7. User flows
8. Business rules
9. Permissions
10. Constraints
11. Non-goals
12. Success criteria
```

---

# 8. CORE VS SECONDARY

Clasificar funcionalidades:

```text
CORE
Necesarias para que el producto funcione.

SECONDARY
Mejoran el producto.

OPTIONAL
Pueden implementarse posteriormente.
```

Esto evita construir demasiado antes de validar la idea principal.

---

# 9. FASE 1 — UX

Crear:

```text
User Personas
User Journeys
User Flows
Information Architecture
```

No comenzar todavía con detalles visuales.

Primero resolver:

> ¿Cómo utilizará la persona el producto?

---

# 10. FASE 2 — INFORMATION ARCHITECTURE

Crear la estructura:

```text
HOME
├── Section A
├── Section B
├── Section C
├── Profile
└── Settings
```

Definir:

* navegación;
* jerarquía;
* relaciones;
* profundidad;
* acciones principales.

---

# 11. FASE 3 — WIREFRAMES

Diseñar primero:

* layout;
* contenido;
* jerarquía;
* navegación;
* acciones.

Sin dedicar demasiado tiempo inicialmente a:

* colores;
* imágenes;
* sombras;
* efectos.

El objetivo es validar estructura.

---

# 12. FASE 4 — DESIGN SYSTEM

Construir el sistema visual.

```text
FOUNDATIONS
    ↓
TOKENS
    ↓
COMPONENTS
    ↓
PATTERNS
    ↓
SCREENS
```

Figma permite utilizar variables para tokens, valores reutilizables y diferentes modos/contextos.

---

# 13. TOKENS

Definir como mínimo:

```text
Color
Typography
Spacing
Sizing
Radius
Border
Shadow
Motion
Breakpoints
```

Cuando corresponda.

---

# 14. COMPONENTS

Crear componentes reutilizables:

```text
Button
Input
Select
Checkbox
Radio
Switch
Card
Badge
Avatar
Tabs
Dialog
Toast
Navigation
Table
List
```

No crear componentes innecesarios.

---

# 15. COMPONENT PROPERTIES

Definir propiedades semánticas.

Ejemplo:

```text
Button
├── Variant
├── Size
├── State
├── Icon
└── Loading
```

Evitar crear decenas de componentes visualmente duplicados.

---

# 16. AUTO LAYOUT

Utilizar Auto Layout para estructuras que deban responder a contenido o tamaño.

Especialmente:

* botones;
* listas;
* cards;
* barras;
* formularios;
* navegación;
* dashboards.

Auto Layout permite que los diseños respondan dinámicamente a cambios de contenido y tamaño.

---

# 17. FASE 5 — RESPONSIVE DESIGN

Definir comportamiento para:

```text
Mobile
Tablet
Laptop
Desktop
Large Desktop
```

No limitarse a diseñar diferentes tamaños.

Definir:

* qué cambia;
* qué desaparece;
* qué se reorganiza;
* qué se convierte en menú;
* qué mantiene tamaño;
* qué ocupa todo el ancho.

---

# 18. FASE 6 — UI DESIGN

Ahora sí construir las pantallas finales.

Cada pantalla debe tener:

* layout;
* contenido;
* jerarquía;
* estados;
* responsive;
* navegación;
* interacción.

---

# 19. FASE 7 — ESTADOS

Cada flujo importante debe contemplar:

```text
DEFAULT
LOADING
EMPTY
ERROR
SUCCESS
DISABLED
OFFLINE
```

No diseñar solamente el "happy path".

---

# 20. FASE 8 — PROTOTYPE

Crear prototipo para los flujos principales.

Ejemplo:

```text
Login
 ↓
Dashboard
 ↓
Crear
 ↓
Formulario
 ↓
Guardar
 ↓
Success
```

El prototipo debe validar el comportamiento antes del desarrollo.

---

# 21. DESIGN REVIEW

Antes de programar:

crear:

`DESIGN-REVIEW.md`

Verificar:

```text
[ ] User flows
[ ] Navigation
[ ] Components
[ ] States
[ ] Responsive
[ ] Accessibility
[ ] Motion
[ ] Empty states
[ ] Error states
[ ] Loading states
[ ] Prototype
```

---

# 22. FASE 9 — TECHNICAL PLANNING

Ahora entra el desarrollo.

Definir:

* framework;
* lenguaje;
* arquitectura;
* backend;
* database;
* authentication;
* storage;
* APIs;
* deployment;
* mobile strategy.

No seleccionar tecnología únicamente por moda.

---

# 23. ARQUITECTURA TÉCNICA

Separar cuando corresponda:

```text
UI
 ↓
State
 ↓
Business Logic
 ↓
Services
 ↓
API
 ↓
Database
```

Evitar concentrar toda la aplicación dentro de los componentes visuales.

---

# 24. DESIGN → CODE

Crear correspondencia:

```text
Figma Token
     ↓
CSS Variable
     ↓
Component Token
     ↓
UI Component
```

Ejemplo:

```text
color-primary
      ↓
--color-primary
      ↓
Button / Primary
      ↓
<button>
```

---

# 25. REGLA DE CONSISTENCIA

Los nombres deben ser suficientemente similares entre diseño y código.

Ejemplo:

```text
Figma:
Button/Primary

Code:
Button variant="primary"
```

Esto reduce errores de interpretación.

Figma también recomienda utilizar nombres semánticos y alinear componentes del diseño con los existentes en producción para evitar sistemas paralelos.

---

# 26. FASE 10 — IMPLEMENTATION

Construir en este orden:

```text
FOUNDATIONS
 ↓
TOKENS
 ↓
COMPONENTS
 ↓
LAYOUT
 ↓
PAGES
 ↓
FLOWS
 ↓
DATA
 ↓
INTEGRATIONS
```

No empezar creando páginas gigantescas.

---

# 27. DESARROLLO INCREMENTAL

Implementar pequeñas unidades funcionales.

Ejemplo:

```text
Button
 ↓
Input
 ↓
Form
 ↓
Login
 ↓
Authentication
 ↓
Dashboard
```

Cada etapa debe funcionar antes de continuar.

---

# 28. GIT

Crear commits pequeños y descriptivos.

Ejemplos:

```text
feat: add authentication form
feat: add dashboard navigation
fix: correct mobile layout
perf: optimize dashboard queries
refactor: extract reusable card
```

Evitar:

```text
update
changes
final
final2
```

---

# 29. FASE 11 — TESTING

Probar:

### Functional

* navegación;
* formularios;
* CRUD;
* autenticación;
* permisos;
* integraciones.

### Visual

* desktop;
* tablet;
* mobile.

### Edge cases

* sin datos;
* demasiados datos;
* texto largo;
* error;
* offline;
* conexión lenta.

---

# 30. FASE 12 — PERFORMANCE AUDIT

Después de que la funcionalidad esté estable:

usar:

`MASTER-APP-OPTIMIZATION.md`

Ejecutar:

```text
AUDIT
 ↓
BASELINE
 ↓
PROBLEMS
 ↓
PRIORITY
 ↓
PLAN
```

No optimizar a ciegas.

---

# 31. WEB PERFORMANCE

Cuando corresponda medir:

* LCP;
* INP;
* CLS;
* bundle;
* requests;
* API;
* imágenes;
* fuentes.

Core Web Vitals se centra precisamente en carga, interactividad y estabilidad visual mediante LCP, INP y CLS.

---

# 32. MOBILE PERFORMANCE

Medir:

* startup;
* memoria;
* CPU;
* batería;
* tamaño;
* navegación;
* scroll;
* animaciones.

Probar también en hardware no ideal.

---

# 33. FASE 13 — UX PERFORMANCE

No medir solamente código.

Evaluar:

```text
¿La aplicación responde inmediatamente?

¿El usuario sabe qué ocurrió?

¿Las pantallas se sienten fluidas?

¿Las transiciones son naturales?

¿Hay esperas innecesarias?

¿Hay pasos innecesarios?

¿La aplicación se siente consistente?
```

---

# 34. FASE 14 — SECURITY REVIEW

Antes del release:

* authentication;
* authorization;
* permissions;
* secrets;
* API;
* database;
* RLS;
* input validation;
* storage;
* dependencies.

---

# 35. FASE 15 — RELEASE CANDIDATE

Crear una versión candidata.

```text
Development
      ↓
Staging
      ↓
Release Candidate
      ↓
Production
```

No llevar directamente cambios experimentales a producción.

---

# 36. RELEASE CHECKLIST

```text
[ ] Build successful
[ ] Tests passed
[ ] No critical bugs
[ ] Security checked
[ ] Performance checked
[ ] Responsive checked
[ ] Mobile checked
[ ] Environment variables verified
[ ] Database migrations verified
[ ] Backup verified when applicable
[ ] Version updated
[ ] Release notes prepared
```

---

# 37. VERSIONING

Mantener versión identificable.

Ejemplo:

```text
1.0.0
1.1.0
1.1.1
2.0.0
```

Adaptar la estrategia al proyecto.

---

# 38. RELEASE REPORT

Crear:

`RELEASE-REPORT.md`

Incluir:

```text
Version
Date
Features
Bug fixes
Performance changes
Breaking changes
Known issues
Migration requirements
Rollback strategy
```

---

# 39. FASE 16 — MONITORING

Después del release observar:

* errores;
* crashes;
* rendimiento;
* API;
* database;
* uso;
* comportamiento.

No asumir que un release está perfecto simplemente porque pasó pruebas.

---

# 40. FASE 17 — FEEDBACK

Recoger:

* errores;
* solicitudes;
* problemas de UX;
* funcionalidades solicitadas;
* comportamiento inesperado.

Clasificar:

```text
BUG
UX
PERFORMANCE
FEATURE
SECURITY
TECHNICAL DEBT
```

---

# 41. BACKLOG

Mantener:

`BACKLOG.md`

Formato:

```text
ID
Title
Category
Priority
Description
Impact
Status
```

Estados:

```text
BACKLOG
READY
IN PROGRESS
REVIEW
TESTING
DONE
```

---

# 42. TECHNICAL DEBT

Registrar explícitamente:

* código temporal;
* hacks;
* dependencias antiguas;
* componentes duplicados;
* problemas conocidos.

No permitir que la deuda técnica desaparezca de la documentación.

---

# 43. DESIGN DEBT

También registrar:

* componentes duplicados;
* estilos inconsistentes;
* spacing irregular;
* colores fuera del sistema;
* pantallas antiguas;
* patrones obsoletos.

---

# 44. DESIGN ↔ CODE DRIFT

Periódicamente comparar:

```text
FIGMA
vs
PRODUCTION
```

Identificar:

* componentes diferentes;
* colores diferentes;
* spacing diferente;
* estados faltantes;
* comportamiento diferente.

Corregir el origen de la discrepancia.

---

# 45. REFACTORING

El refactor debe ser controlado.

Priorizar cuando exista:

* duplicación importante;
* riesgo;
* dificultad de mantenimiento;
* impacto en rendimiento;
* dificultad para incorporar nuevas funciones.

No refactorizar todo simplemente porque el código tiene meses de antigüedad.

---

# 46. MAJOR VERSION

Antes de una gran actualización:

```text
AUDIT
 ↓
MIGRATION PLAN
 ↓
BACKUP
 ↓
BRANCH
 ↓
IMPLEMENTATION
 ↓
TEST
 ↓
STAGING
 ↓
RELEASE
```

Nunca hacer una migración crítica directamente sobre producción sin estrategia de recuperación.

---

# 47. REGLA DE REVERSIBILIDAD

Siempre que sea posible, los cambios importantes deben poder revertirse.

Especialmente:

* database;
* authentication;
* API;
* arquitectura;
* pagos;
* permisos.

---

# 48. IA COMO AGENTE

La IA debe comportarse como:

```text
ANALYST
+
DESIGNER
+
ENGINEER
+
TESTER
```

Pero no debe asumir decisiones que correspondan al propietario del producto.

---

# 49. QUÉ PUEDE DECIDIR LA IA

Puede decidir razonablemente:

* refactors internos;
* optimización;
* organización;
* nombres técnicos;
* pequeñas mejoras;
* implementación de componentes ya definidos.

---

# 50. QUÉ DEBE CONSULTAR

Debe pedir decisión cuando implique:

* cambio de producto;
* eliminación de funcionalidad;
* cambio de flujo importante;
* cambio de modelo de negocio;
* cambio de permisos;
* migración importante;
* cambio de arquitectura con alto riesgo;
* modificación irreversible.

---

# 51. REGLA "NO INVENTAR"

Cuando algo no está definido:

```text
NO SUPONER
 ↓
IDENTIFICAR
 ↓
DOCUMENTAR
 ↓
PREGUNTAR
```

Especialmente:

* reglas de negocio;
* permisos;
* navegación;
* comportamiento destructivo;
* datos;
* estados críticos.

---

# 52. REGLA "NO SOBREINGENIERÍA"

No implementar:

* arquitectura innecesaria;
* microservicios sin necesidad;
* librerías para problemas simples;
* abstracciones excesivas;
* sistemas complejos antes de necesitarlos.

La complejidad debe justificarse por una necesidad real.

---

# 53. REGLA "NO SOBRE-DISEÑO"

No añadir:

* animaciones innecesarias;
* efectos excesivos;
* componentes por moda;
* decoración que dificulte la lectura;
* interacción que no aporte valor.

---

# 54. EXPERIENCIA FINAL

Antes de cada release realizar una revisión subjetiva.

Utilizar la aplicación como un usuario real.

Preguntar:

```text
¿Se siente rápida?

¿Se siente fluida?

¿Entiendo dónde estoy?

¿Sé qué puedo hacer?

¿Sé qué acaba de ocurrir?

¿La interfaz me guía?

¿Hay algo que me haga detenerme?

¿Hay algo que me haga pensar innecesariamente?

¿Se siente consistente?

¿Se siente profesional?
```

---

# 55. DEFINICIÓN DE PRODUCTO TERMINADO

Un producto no está terminado solamente porque:

```text
BUILD = SUCCESS
```

Debe cumplir:

```text
PRODUCT
+
UX
+
UI
+
FUNCTION
+
PERFORMANCE
+
SECURITY
+
ACCESSIBILITY
+
TESTING
+
RELEASE
```

---

# 56. CICLO COMPLETO

El workflow completo queda:

```text
                    IDEA
                     │
                     ▼
              PRODUCT SPEC
                     │
                     ▼
                 UX FLOWS
                     │
                     ▼
          INFORMATION ARCHITECTURE
                     │
                     ▼
                WIREFRAMES
                     │
                     ▼
              DESIGN SYSTEM
                     │
                     ▼
                  UI DESIGN
                     │
                     ▼
                PROTOTYPE
                     │
                     ▼
              DESIGN REVIEW
                     │
                     ▼
           TECHNICAL ARCHITECTURE
                     │
                     ▼
               DEVELOPMENT
                     │
                     ▼
                  TESTING
                     │
                     ▼
             PERFORMANCE AUDIT
                     │
                     ▼
              SECURITY REVIEW
                     │
                     ▼
             RELEASE CANDIDATE
                     │
                     ▼
                  RELEASE
                     │
                     ▼
                MONITORING
                     │
                     ▼
                 FEEDBACK
                     │
                     ▼
                  BACKLOG
                     │
                     └─────────────┐
                                   │
                                   ▼
                              ITERATION
                                   │
                                   └──────→ UX / DESIGN / CODE
```

---

# 57. COMANDO MAESTRO PARA EL AGENTE

Cuando se inicie un proyecto nuevo:

```text
Lee:

/docs/MASTER-PROJECT-WORKFLOW.md
/docs/MASTER-UI-UX-DESIGN-SPEC.md
/docs/MASTER-APP-OPTIMIZATION.md

NO COMIENCES A PROGRAMAR INMEDIATAMENTE.

Determina primero en qué fase se encuentra actualmente el proyecto.

Si es un proyecto nuevo:

1. Analiza PRODUCT-SPEC.md.
2. Define user flows.
3. Define information architecture.
4. Prepara estructura de diseño.
5. Espera validación del diseño.
6. Después prepara arquitectura técnica.
7. Después implementa.

Si es un proyecto existente:

1. Audita el proyecto.
2. Identifica funcionalidades existentes.
3. Identifica arquitectura.
4. Identifica problemas.
5. Mide rendimiento.
6. Genera AUDIT-REPORT.md.
7. Genera OPTIMIZATION-PLAN.md.
8. No realices cambios estructurales importantes sin aprobación.

En todos los casos:

NO INVENTES REQUISITOS.

NO ELIMINES FUNCIONALIDADES SIN JUSTIFICACIÓN.

NO REESCRIBAS EL PROYECTO COMPLETO SIN NECESIDAD.

NO INTRODUZCAS DEPENDENCIAS SIN JUSTIFICACIÓN.

NO MODIFIQUES BASE DE DATOS SIN PLAN.

NO REALICES CAMBIOS IRREVERSIBLES SIN CONFIRMACIÓN.

Prioriza siempre:

1. Correctitud.
2. Seguridad.
3. UX.
4. Rendimiento.
5. Mantenibilidad.
6. Elegancia técnica.

El objetivo final es construir una aplicación que no solamente funcione, sino que se sienta rápida, fluida, intuitiva, consistente y profesional.
```

# FIN DEL MASTER PROJECT WORKFLOW
