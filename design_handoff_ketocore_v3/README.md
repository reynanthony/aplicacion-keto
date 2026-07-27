# Handoff: KetoCore v3 — rediseño de la PWA móvil

## Overview

KetoCore es una PWA de seguimiento de dieta keto (Astro + Tailwind, `web/src/`). Este paquete contiene el rediseño completo de la **experiencia móvil de la app** (no del sitio de marketing): 18 pantallas, un sistema de 6 componentes, una identidad visual propia de la app y un cambio de modelo de datos (el presupuesto de carbos pasa a ser variable).

El objetivo del rediseño era triple:
1. Que la app deje de ser una grilla de escritorio apilada y se organice alrededor de **una sola cifra accionable**: carbos netos disponibles hoy.
2. Que la app se **distinga claramente del modo web** (hoy solo se diferencian en claro/oscuro).
3. Que los módulos "plus" (entrenamiento, suplementación, comunidad) **se conecten al núcleo** en vez de ser apps sueltas dentro de la misma cáscara.

## About the Design Files

Los archivos `.dc.html` de este paquete son **referencias de diseño creadas en HTML** — prototipos que muestran el aspecto y el comportamiento previstos. **No son código de producción para copiar tal cual.**

La tarea es **recrear estos diseños en el entorno existente del repo** (Astro + Tailwind, componentes `.astro`), usando sus patrones y utilidades ya establecidos. El HTML de los prototipos usa estilos inline y una tipografía cargada desde Google Fonts porque es un medio de prototipado; en producción debe traducirse a tokens de Tailwind y componentes reutilizables.

Los archivos se abren directamente en un navegador. Requieren `support.js` (incluido) como hermano en la misma carpeta.

## Fidelity

**Alta fidelidad (hifi).** Colores, tipografía, tamaños, radios, espaciados y tiempos de animación son finales y están especificados abajo con valores exactos. La UI debe recrearse fielmente. Lo único deliberadamente abierto son las imágenes de comida (en los prototipos hay iconos como marcador de posición) y las fórmulas exactas de cálculo metabólico, que deben validarse con un profesional (ver "Fórmulas a validar").

---

## Por qué cambia el color (justificación de la decisión más visible)

El sistema actual ("Editorial Bento") usa naranja `#ff4d00` como color único, tanto en la web como en la app, tanto para acciones como para estados positivos. Eso genera tres problemas:

1. **La app no se distingue del sitio.** Comparten paleta, tipografía y superficies; la única diferencia es que la app es oscura. Un usuario no percibe "otra cosa", percibe "la versión oscura de la web".
2. **No existe una señal de alarma.** Si el naranja ya es el color de todo (botones, cifras, chips, iconos), no queda ningún color libre para comunicar "estás a punto de salir de cetosis". Y ese es, en una app keto, el aviso más importante que existe.
3. **El naranja es un color de advertencia por convención.** Usarlo para "vas bien" trabaja contra la intuición del usuario.

La decisión del rediseño:

| Color | Rol en la app v3 |
|---|---|
| **Lima `#c8f560`** | Color operativo del producto: cetosis activa, acción primaria, "vas bien". |
| **Naranja `#ff4d00`** | Reservado **solo** para el estado de alerta (margen agotado / cetosis en riesgo) y para la marca en el sitio de marketing. |
| **Verde profundo `#071410` / `#0c2119`** | Superficies de la app (frente al crema editorial del sitio). |
| **Crema `#f3ede3`** | Un solo bloque por pantalla: la decisión o consecuencia a leer. Es el puente visual con la identidad del sitio. |

Consecuencia buscada: **la app entera cambia de temperatura cuando peligra la cetosis** (fondo `#140b07`, cifra en naranja, dock naranja). Es una señal que se lee de un vistazo, sin leer un solo número, y es imposible de construir con una sola paleta. Ver pantalla `16 · Estado de alerta` en el prototipo.

Lo que **no** cambia: el logo, el nombre, la tipografía de títulos (Plus Jakarta Sans) y el naranja como color de marca en el sitio de marketing. La marca sigue siendo la misma; cambia la gramática de la app.

**Si el equipo decide rechazar este cambio**, la alternativa está prototipada: la variante "Instrumento" en `KetoCore Identidad App.dc.html` (`#3a`) mantiene el naranja y logra la diferenciación solo con tipografía mono y superficie fría. Es más conservadora y pierde la señal de alerta.

---

## Design Tokens

### Color

```
/* Superficies (app) */
--surface-app:        #071410   /* fondo de pantalla */
--surface-1:          #0c2119   /* tarjetas, dock, hojas */
--surface-2:          #0f2b20   /* anidado dentro de tarjeta */
--surface-alert-app:  #140b07   /* fondo en estado de alerta */
--surface-alert-1:    #1d0d07
--surface-alert-card: #241009

/* Señal */
--lime:               #c8f560   /* acción, cetosis, "vas bien" */
--lime-deep:          #84cc16   /* fin del degradado de barras */
--lime-dark:          #4d7c0f
--orange:             #ff4d00   /* SOLO alerta */
--orange-soft:        #ff7a3c   /* texto sobre fondo de alerta */
--cream:              #f3ede3   /* 1 bloque por pantalla */
--violet:             #a78bfa   /* Coach IA, nada más */
--amber:              #fbbf24   /* veredicto "moderar" */

/* Texto */
--text:               #e6fff2
--text-70:            rgba(226,255,238,0.70)
--text-50:            rgba(226,255,238,0.50)
--text-40:            rgba(226,255,238,0.40)
--text-on-lime:       #0a1f14
--text-on-cream:      #1a140e

/* Bordes */
--border:             rgba(210,255,230,0.10)
--border-soft:        rgba(210,255,230,0.06)
--border-alert:       rgba(255,77,0,0.28)
```

### Tipografía

| Uso | Familia | Peso | Tamaño | Notas |
|---|---|---|---|---|
| Cifra protagonista | Archivo | 900 | 76 px | `font-stretch:125%`, `letter-spacing:-0.04em`, `line-height:0.82`. **Una por pantalla.** |
| Cifra secundaria | Archivo | 900 | 20–40 px | `font-stretch:110–115%` |
| Cifras en listas/tablas | JetBrains Mono | 700–800 | 11–16 px | `font-variant-numeric: tabular-nums`. Alineadas a la derecha. |
| Etiquetas y metadatos | Barlow Condensed | 600–700 | 11–13.5 px | `text-transform:uppercase`, `letter-spacing:0.08em` |
| Títulos y nombres | Plus Jakarta Sans | 800 | 14–29 px | `letter-spacing:-0.02em a -0.035em` |
| Texto corrido | Inter | 400–600 | 12.5–14.5 px | `line-height:1.45–1.6`. **Mínimo 12.5 px.** |

Iconografía: **Material Symbols Outlined**. `FILL 1` para estados activos/seleccionados, `FILL 0` para el resto.

### Forma

```
radius-hero:   26px   /* tarjeta de presupuesto */
radius-card:   22–24px
radius-tile:   18px
radius-row:    14px
radius-sheet:  28px   /* solo esquinas superiores */
radius-pill:   100px  /* dock, botones, chips, avatares de acción */
radius-device:  40px  /* marco del teléfono en los mocks */
```

### Espaciado

```
padding lateral de pantalla:  20px
gap vertical entre bloques:   13–14px
padding de tarjeta:           16–20px
padding de fila:              11–14px vertical
altura del dock:              62px, con 16px de margen lateral y 18px inferior
FAB central:                  56px
objetivo táctil mínimo:       44px
```

### Movimiento

| Evento | Duración | Easing |
|---|---|---|
| Hoja entrando | 320 ms | `cubic-bezier(.22,1,.36,1)` |
| Hoja saliendo | 240 ms | `cubic-bezier(.22,1,.36,1)` |
| Scrim (fade) | 180 ms | `ease-out` |
| Feedback de toque (scale 0.9→1) | 160 ms | `cubic-bezier(.22,1,.36,1)` |
| **Cambio de un dato por acción del usuario** | **720 ms** | `ease-out` cúbico (`1-(1-p)³`) |
| Anillo de confirmación del FAB | 620 ms | `ease-out`, scale 0.6→2.4, opacity 0.9→0 |
| Toast entrando | 260 ms | `cubic-bezier(.22,1,.36,1)`, duración visible 4 s |
| Línea del scanner | 1600 ms bucle | `ease-in-out` |

Regla: los datos que cambian **por una acción del usuario** se animan 720 ms; los que cambian **por sincronización** aparecen sin animación.

---

## Los 6 componentes

Todo el sistema se construye con estos seis. Si una pantalla nueva necesita algo que no está aquí, es una decisión de sistema, no de pantalla.

### 1. `BudgetHeader`
La cifra que manda: carbos netos disponibles.

- **Props:** `used: number`, `limit: number`, `bonus?: number`, `state: 'ok' | 'warn' | 'over'`, `variant: 'hero' | 'bar'`
- **`hero`** (solo en Hoy): etiqueta condensada + cifra Archivo 76 px lima + `g` + `de {limit}` + barra 9 px + pie con "{used} usados" y estado.
- **`bar`** (cabecera de Macros, Plan, Recetas, Alimentos, Compras, Entrenar): barra 6 px + cifra Archivo 12.5 px.
- **Reglas:** la barra crece con lo **consumido**; la cifra grande es lo que **queda**. Cuando hay bonus por entreno, la barra muestra un segundo segmento en `rgba(200,245,96,0.28)` y aparece un chip lima `+N g` con icono `fitness_center` en la esquina superior derecha.
- **`over`**: toda la pantalla cambia a la paleta de alerta, no solo este componente.

### 2. `DataRow`
El caballo de batalla. Sustituye **todas** las tablas de la app actual.

- **Props:** `leading: 'time' | 'icon' | 'check' | 'verdict-bar'`, `title`, `meta?`, `value?`, `verdict?`, `state: 'done' | 'pending' | 'blocked'`
- Separador inferior `1px solid rgba(210,255,230,0.06)`; sin tarjeta propia dentro de listas largas.
- Columna de cifras siempre en **JetBrains Mono**, alineada a la derecha, **una sola cifra dominante por fila**.
- `done`: opacidad 45 % + `line-through`. `blocked`: atenuado, **nunca oculto**.
- `verdict-bar`: barra vertical de 3 px a la izquierda (lima / ámbar / naranja).
- **Gesto:** swipe a la izquierda → editar / borrar, con deshacer.

### 3. `DecisionCard`
La acción del momento. **Máximo una por pantalla**, y solo si hay algo que hacer *ahora*.

- **Variantes:** `lime` (acción positiva), `cream` (explicación o consecuencia), `alert` (corrección).
- Lleva verbo. Si no puedes escribir el botón, no es una `DecisionCard`: es una tarjeta de datos.
- Siempre descartable; nunca dos apiladas.

### 4. `Chip`
Tres papeles, una forma (pastilla 100 px, Barlow Condensed mayúsculas):

- `state` — solo lectura. Punto pulsante (`animation: pulse 2s infinite`) **solo** en estados en vivo (cetosis, sincronizando).
- `filter` — pulsable. Uno activo por grupo, relleno lima; el resto sobre superficie al 6 %.
- `verdict` — clasificación: lima (keto) / ámbar (moderar) / naranja (evitar).
- Máximo 4 visibles antes de scroll horizontal.

### 5. `Dock`
Cuatro destinos y un botón. Constante en toda la app **salvo** cámara, onboarding y welcome.

- `Hoy · Macros · [Registrar] · Plan · Yo`
- Pastilla flotante 62 px, `#0c2119`, borde `--border`, 16 px de margen lateral, 18 px inferior (+ safe area de iOS).
- FAB central 56 px lima, `box-shadow: 0 8px 24px rgba(200,245,96,0.35)`, `margin-bottom:13px` (sobresale del dock).
- **Regla dura:** el botón central **abre una hoja, nunca navega**. Si algún día navega, deja de ser el centro.
- "Yo" absorbe los destinos secundarios con su estado a la derecha.

### 6. `Sheet`
Todo lo que en la web era modal. **No hay diálogos centrados en la app.**

- Anatomía: asa 40×4 px → cabecera (título + subtítulo de contexto + cerrar) → cuerpo → nota de estado.
- Si la hoja tapa el presupuesto, **lo repite en su subtítulo** ("Margen de hoy · 15 g netos").
- Cierra por scrim, arrastre del asa o botón cerrar. Nunca una hoja sin salida.

---

## El cambio de modelo de datos: presupuesto variable

**Esto debe implementarse antes que cualquier pantalla.** Si el presupuesto nace fijo, después no se le puede añadir.

```ts
type DayBudget = {
  baseLimit: number;      // del objetivo del onboarding: 20–50 g netos
  trainingBonus: number;  // 0 si no hay entreno planificado hoy
  limit: number;          // baseLimit + trainingBonus
  used: number;           // suma de netos registrados
  available: number;      // limit - used  → LA cifra de la app
  state: 'ok' | 'warn' | 'over';   // warn: available <= 15% de limit; over: available <= 0
  bonusReason?: string;   // texto mostrado en la tarjeta crema de Hoy
};
```

Regla de estado y color:
- `ok` → paleta lima.
- `warn` → paleta lima con el chip de estado en ámbar.
- `over` → **toda la pantalla** en paleta de alerta.

### Fórmulas a validar (no las inventes en producción)

Los prototipos muestran `+7 g` para una sesión de fuerza y `+4 g` para cardio en ayunas. **Son valores de ejemplo.** Antes de producción:

- Definir `trainingBonus` como función de tipo de sesión, duración e intensidad, documentada y revisada por un profesional de nutrición deportiva.
- Mostrar siempre el *por qué* junto al número (tarjeta crema en Hoy). Un número sin explicación destruye la credibilidad de la app entre usuarios avanzados.
- El bonus se consume **después** de la sesión (regla de producto que el Coach comunica).

---

## Screens / Views

Cada pantalla es 390 × 844 px. Estructura común: barra de estado (≈29 px) → cabecera (≈62 px) → columna de contenido (`flex:1`, scroll) → zona de dock (88 px, con degradado `to top` desde el fondo).

### 1. Hoy
**Propósito:** saber cuánto margen queda y qué hacer en los próximos 60 minutos.
**Bloques (en orden):** `BudgetHeader hero` (con chip `+7 g` y barra de dos segmentos) → fila de `Chip state` (cetosis 16 h / kcal / 70-25-5) → `DecisionCard lime` (siguiente evento: entreno o comida) → tarjeta Coach (violeta, una frase accionable) → lista `DataRow` "Registrado hoy" (2–3 filas).
**Se movió fuera de aquí:** Health Score y tendencia de peso → Progreso. Checklist → se fusionó con el plan del día.

### 2. Registrar (Sheet)
**Propósito:** registrar comida en 4 toques desde cualquier pantalla.
**Contenido:** cabecera con "Margen de hoy · N g netos" → grid 2×2 de entradas (Escanear en lima = única acción primaria; Buscar / Dictar / Recetas en contorno) → lista "Repetir" (2 filas con `+`) → nota "Offline · sincroniza solo".
**Abre desde:** FAB central del dock. **No navega**: Hoy sigue detrás con scrim.

### 3. Scanner
**Propósito:** identificar alimento o etiqueta.
**Única pantalla a pantalla completa y sin dock.** Fondo cámara, marco con esquinas lima de 38 px, línea de escaneo en bucle 1.6 s, tres puntos pulsantes, disparador 76 px lima, chips `Alimento / Etiqueta / Código`.
**Timeout:** si tarda más de 4 s, ofrecer "escribir a mano".

### 4. Veredicto (Sheet)
**Propósito:** decidir si eso entra en el día.
**Clave:** el bloque crema traduce macros a decisión — `15 g → 13 g libres` con barra de dos segmentos y la frase "Te sigue sobrando margen para después del entreno". Debajo: 4 tiles mono (kcal / netos / grasa / prot), stepper de cantidad, y CTA lima "Añadir a mi registro".

### 5. Macros
Donut de reparto real (70/25/5) + 3 `DataRow` con barra (Netos **primero**, luego Grasas, Proteína) + registro del día con kcal y netos por fila.

### 6. Alimentos (¿es keto?)
Buscador con borde lima + `qr_code_scanner`. Lista de `DataRow` con `verdict-bar`. La cifra de netos es la dominante. Cierra con `DecisionCard cream` que interpreta el resultado **contra el margen de hoy** ("Hoy hasta la ricotta entra, porque entrenas").

### 7. Plan
`BudgetHeader bar` + rail de 6 días (día activo en lima) + `DataRow` de comidas con check + `DecisionCard cream` para la comida siguiente + nudge lima de compras. El plan **conoce los días de entreno** y coloca los carbos ahí.

### 8. Compras
Progreso en la cabecera (11/19), 3 tiles de resumen, secciones por pasillo (Frescos / Despensa) con `DataRow` `check`, marcados al 45 % + tachado. Vive **dentro de Plan**.

### 9. Recetas
Tarjeta destacada con badge "Para tu día de entreno" + 3 `DataRow`. Filtro estrella: **"Cabe en {available} g"**. Lo que no cabe se atenúa, no se oculta.

### 10. Progreso
Peso actual + sparkline lima, `DecisionCard cream` con la meta y proyección temporal, 3 tiles (racha / comidas / score), `DataRow` de medidas. **Aquí vive el Health Score**, no en Hoy.

### 11. Coach
Cabecera violeta + tira de chips de contexto (margen, entreno de hoy, peso) que le da los datos sin que el usuario los escriba. Respuestas **con acciones registrables** (tarjeta con `Programar` / `Registrar`), no párrafos. **Absorbe Inspector y Guía**: el resumen semanal llega como mensaje del Coach.

### 12. Yo
Avatar + Pro + día/racha. 2 tiles (Health Score / Adherencia). Dos grupos de `DataRow` con **estado a la derecha** (Seguimiento: progreso, objetivos, Coach; Rutina: entrenar, suplementos, cohorte) + estado de sincronización. Sustituye el drawer de 16 enlaces.

### 13. Entrenar
`BudgetHeader bar` + `DecisionCard lime` (sesión de hoy, con chip "+7 g de margen" y CTA Empezar) + tarjeta "Puedes entrenar fuerte hoy" (adaptación / proteína / sueño) + zona keto-adaptada en ppm + `DataRow` de la semana con el bonus de cada día.
**Da** gasto y ventana de glucógeno; **recibe** el veredicto de si hoy hay combustible.

### 14. Suplementos
`DecisionCard cream` "Ahora · 18:15 · Sodio + potasio" con el *por qué* derivado del histórico → lista del día (2 de 3) → tarjeta "Detectado en tus 19 días" con correlaciones reales → **aviso médico visible y completo**.
**Da** lo tomado; **recibe** síntomas, ayuno y entreno.

### 15. Comunidad (Tu cohorte)
Emparejamiento **por día del proceso** (312 personas entre el día 15 y el 25). `DecisionCard lime` con la pregunta de tu día → respuesta resuelta con **receta registrable en un toque** → tabla del reto con tu fila resaltada → nota de privacidad y moderación.

### 16. Estado de alerta
La misma pantalla Hoy con `state: 'over'`: fondo `#140b07`, cifra en naranja, dock naranja, `DecisionCard alert` con la corrección, y la fila culpable resaltada en el registro con su explicación ("declaraba 3 g en el frente y 16 g reales en la tabla").

### 17. Welcome
La promesa es la cifra: "Sabe cuántos carbos te quedan hoy." Chips de capacidades, toggle Crear cuenta / Entrar, campos, CTA lima y **"Continuar en modo local"** (mantener: es la salida sin fricción).

### 18. Onboarding (paso 2 de 4)
Cada objetivo **declara el presupuesto que implica** (20–25 g, 30–50 g, 20 g, 25 g). Bloque crema al pie con el resultado calculado. Barra de 4 pasos, vertical (no rail horizontal).

---

## Interactions & Behavior

### Flujo de registro (el 80 % de la percepción de calidad)

1. Toque en FAB → scale 0.9, anillo lima 620 ms, haptic ligero. Confirma **antes** de que la hoja llegue.
2. Hoja "Registrar" sube 320 ms; scrim 180 ms. **No navega.**
3. "Escanear" → scanner a pantalla completa; resuelve solo (~1.8 s en el prototipo).
4. Hoja de veredicto sube con el impacto en el presupuesto.
5. "Añadir" → la hoja cae 240 ms **y** la cifra rueda `15 → 13` en 720 ms con la barra en el mismo tiempo y la misma curva.
6. Toast lima con **Deshacer** 4 s + haptic de éxito.

**Ninguna acción pide confirmación. Todas se deshacen.**

Implementación del contador: `requestAnimationFrame` con `p = (now-t0)/720`, `e = 1-(1-p)³`, `value = from + (to-from)*e`. Mostrar un decimal mientras anima, entero al asentar. Referencia funcional completa: `KetoCore Registro Interactivo.dc.html` (contiene la máquina de estados y el rAF).

### Otras reglas de comportamiento

- **Hojas, no modales.** Cierre por scrim / asa / botón.
- **Swipe** a la izquierda en `DataRow` → editar / borrar con deshacer.
- **Offline visible**: registrar, ver el día y consultar alimentos funcionan sin red; la nota "Offline · sincroniza solo" aparece en la hoja de registro; el estado de sincronización vive en Yo.
- **Prompt de instalación PWA** como banner discreto azul en Hoy (día 1) — no como diálogo.
- Ninguna pantalla salvo el scanner ocupa la pantalla completa sin dock.

## State Management

```ts
// Global (contexto o store)
dayBudget: DayBudget            // ver arriba
ketosisHours: number
todayLog: LogEntry[]            // { time, name, net, kcal, meal }
todayTraining?: TrainingSession // { type, time, durationMin, bonus, reason }
supplementsToday: SupplementDose[]
syncState: 'synced' | 'pending' | 'offline'
streakDays: number
processDay: number              // día del proceso → cohorte de comunidad

// UI local
sheet: null | 'log' | 'result' | 'quantity' | 'alternatives'
scanning: boolean
toast: null | { title, sub, undo: () => void }
```

Transiciones clave: `commit(entry)` → actualiza `used`, recalcula `available`/`state`, anima 720 ms, guarda en IndexedDB (cola offline), muestra toast con `undo` 4 s.

## Assets

- `logo.svg` — el del repo (`web/public/app/logo.svg`), sin cambios.
- **Iconos:** Material Symbols Outlined (ya en uso en el repo).
- **Fuentes:** Plus Jakarta Sans e Inter (ya en uso) + **JetBrains Mono** y **Archivo** y **Barlow Condensed** (nuevas — añadir al `@import` de `global.css` o autoalojar).
- **Imágenes de comida:** los prototipos usan iconos como marcador de posición. Producción necesita fotografía real o ilustración consistente; definir antes de implementar Recetas.

## Files

| Archivo | Qué contiene |
|---|---|
| `KetoCore v3 Producción.dc.html` | **Principal.** Las 18 pantallas finales + orden de implementación + checklist. |
| `KetoCore Sistema.dc.html` | Los 6 componentes con anatomía y variantes, tokens y análisis de alcance. |
| `KetoCore Registro Interactivo.dc.html` | Prototipo **funcional** del gesto de registro (animación 720 ms real, máquina de estados). |
| `KetoCore Módulos Plus.dc.html` | El bucle "da / recibe" de entrenamiento, suplementación y comunidad. |
| `KetoCore Identidad App.dc.html` | Las dos direcciones de identidad comparadas (3a Instrumento / 3b Metabólico, la elegida). |
| `KetoCore Actual (móvil).dc.html` | El estado **anterior** recreado, con el diagnóstico de qué fallaba. |
| `support.js` | Runtime necesario para abrir los `.dc.html` en el navegador. |

## Checklist antes de subir

- [ ] Ninguna pantalla con más de un bloque crema.
- [ ] Naranja `#ff4d00` solo en estado de alerta.
- [ ] Cero tablas y cero modales centrados en toda la app.
- [ ] Registrar en 4 toques desde cualquier pantalla.
- [ ] Todo registro deshacible 4 s; nada pide confirmación.
- [ ] Offline real: registrar, ver el día y consultar alimentos sin red.
- [ ] Área táctil ≥ 44 px y texto ≥ 12.5 px en todas las filas.
- [ ] Cada cifra derivada (`+7 g`) documentada con su fórmula y revisada.
- [ ] Aviso médico visible y completo en Suplementos.
- [ ] Safe areas de iOS respetadas en dock y hojas.
- [ ] `prefers-reduced-motion`: sustituir las animaciones de 720 ms por cambio directo.

## Riesgos asumidos

- **Lima como color de producto.** El naranja pasa a ser marca del sitio y alerta de la app. Sin ese cambio no hay señal para "cetosis en riesgo".
- **Moderación de Comunidad.** Con datos de salud, un consejo peligroso es un problema legal: no sale sin reglas, reportes y alguien mirando.
- **Presupuesto variable.** Es la mejor idea del rediseño y la más fácil de romper: si el ajuste por entreno no es defendible con datos, se pierde la credibilidad de toda la app.
- **Coach como cuello de botella.** Al absorber Inspector, Guía y Suplementos, su calidad se convierte en la calidad percibida del producto.
