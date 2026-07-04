# Handoff: Rediseño completo de KetoCore (app + sitio de marketing)

## Overview
KetoCore es una PWA de nutrición cetogénica en español (app oscura, mobile-first, con sitio de marketing claro). Este paquete contiene el **rediseño visual completo** de las 21 pantallas del producto en una dirección "Editorial Bento": fondo tostado near-black en la app, crema editorial en el sitio, acento naranja `#ff4d00`, tipografía Plus Jakarta Sans + Inter, e iconografía Material Symbols Outlined.

El objetivo es reemplazar la UI actual del codebase (Astro + Tailwind, ver `web/src/pages/`) manteniendo **todas las funciones existentes** y añadiendo una función nueva (Scanner Keto IA). **Prioridad móvil.**

## About the Design Files
Los archivos `.dc.html` de este bundle son **referencias de diseño creadas en HTML** — prototipos que muestran el look final y el comportamiento previsto, **no código de producción para copiar tal cual**. Cada uno usa un runtime propio (`support.js`) que no debe portarse.

La tarea es **recrear estos diseños en el entorno existente del codebase** (Astro + Tailwind, componentes `.astro`, con estilos inline y `<style is:global>`) siguiendo sus patrones establecidos. No copies el HTML de los `.dc.html` directamente; traduce el layout, tokens y comportamiento a la estructura Astro/Tailwind actual.

## Fidelity
**Alta fidelidad (hifi).** Colores, tipografía, espaciado e interacciones son finales. Recrea la UI pixel-perfect usando las librerías y patrones del codebase. Donde el mock es estático (checkboxes, tabs, calculadora, filtros, chat), implementa la lógica real conectándola a los módulos existentes en `web/public/app/modules/`.

## Design Tokens

### Color — App (tema oscuro)
| Token | Hex | Uso |
|---|---|---|
| `bg` | `#0b0a08` | Fondo de página (app) |
| `bg-sidebar` | `#0f0d0a` | Barra lateral |
| `surface` | `#161310` | Tiles / tarjetas |
| `surface-2` | `#1e1a15` | Tiles anidados / filas |
| `cream` | `#f3ede3` | Tile de contraste (destacados) |
| `text` | `#f7f4f0` | Texto principal |
| `text-60` | `rgba(247,244,240,0.55)` | Texto secundario |
| `text-40` | `rgba(247,244,240,0.40)` | Texto terciario / labels |
| `border` | `rgba(255,240,225,0.06)` | Bordes de tarjeta |

### Color — Sitio de marketing (tema claro)
| Token | Hex | Uso |
|---|---|---|
| `bg` | `#f4efe6` | Fondo de página |
| `surface` | `#ffffff` | Tarjetas |
| `ink` | `#1a140e` | Texto principal / tiles oscuros |
| `ink-60` | `rgba(26,20,14,0.55)` | Texto secundario |

### Acento y semánticos (ambos temas)
| Token | Hex |
|---|---|
| `primary` | `#ff4d00` |
| `primary-dark` | `#ea580c` / `#c23400` |
| `primary-light` | `#fb923c` / `#ff7a3c` |
| `green` (éxito/keto) | `#22c55e` / `#16a34a` |
| `amber` (grasas/moderar) | `#d97706` / `#f59e0b` / `#fbbf24` |
| `cyan` (carbos) | `#0891b2` / `#22d3ee` |
| `blue` (info/agua) | `#60a5fa` / `#2563eb` |
| `purple` (coach/IA) | `#a78bfa` / `#7c3aed` |
| `pink` (comunidad) | `#f472b6` |
| `red` (evitar/salir) | `#ef4444` |

### Tipografía
- **Display / headings**: `Plus Jakarta Sans`, pesos 700–900. Títulos de página `font-size: 42px; font-weight: 800; letter-spacing: -0.035em; line-height: 0.98` (app). Números grandes usan `font-variant-numeric: tabular-nums; letter-spacing: -0.02em`.
- **Texto**: `Inter`, pesos 400–700. Base 14–16px.
- **Iconos**: `Material Symbols Outlined` (variable font). Relleno con `font-variation-settings: 'FILL' 1` para estados activos/sólidos.

### Escala de espaciado
Radios: tiles grandes `22–26px`, tarjetas medias `16–20px`, chips/botones `12–14px`, pills `100px`.
Padding de página (app): `38px 40px 56px` desktop → `22px 16px 96px` móvil.
Gap de grillas: `18–22px`.

### Sombras
- Botón primario: `0 6px 20px rgba(255,77,0,0.3)`
- Tile destacado naranja: `0 12px 40px rgba(255,77,0,0.2)`
- Hover de tarjeta (marketing): `0 16px 40px rgba(26,20,14,0.08)`

## Componentes compartidos

### KetoSidebar (`KetoSidebar.dc.html`) — navegación de la app
- **Desktop (>900px)**: aside fijo de 250px, sticky, con secciones (Principal / Herramientas / Inteligencia / Progreso & Perfil), 16 enlaces, y tarjeta de usuario al pie. Estado activo = fondo `#ff4d00` + texto `#0b0a08` + icono `FILL 1`.
- **Móvil (≤900px)**: el aside se oculta; aparece un **bottom tab bar** fijo de 5 items (Inicio, Macros, **Escanear** [botón central naranja elevado], Plan, Más) + un **drawer** deslizable ("Más") con el resto de secciones en grilla 2-col.
- Prop `active`: enum con el id de la sección para resaltar el item.
- **Importante**: este componente inyecta las media queries responsive globales (ver abajo). En el codebase, ese rol lo cumple el layout/Tailwind.

### KetoTopNav (`KetoTopNav.dc.html`) — navegación del sitio de marketing
- **Desktop (>820px)**: nav sticky translúcida (blur) con logo + links (Protocolos, Aprender, Recetas, Herramientas, Retos, Historias) + CTA "Entrar a la app".
- **Móvil (≤820px)**: colapsa a logo + botón hamburguesa que abre un panel lateral con todos los links.

## Responsive (prioridad móvil)
Breakpoints: **900px** (app), **820px** (marketing), **560px** (ajuste fino de tablas/tipografía).
Reglas clave a portar:
- Grillas multi-columna → 1 columna (o 2 para los bento de stats) por debajo del breakpoint.
- Bento con `grid-row: span 2` → `auto` en móvil (el tile destacado pasa a ancho completo).
- Tipografía de títulos 42px → 30px (≤900) → 26px (≤560); hero 60px → 40px.
- Padding de página se reduce y se añade `padding-bottom` para el bottom-nav.
- **Tablas de 5 columnas** (registro de Macros, base de datos de Alimentos): en móvil ocultan columnas secundarias. Macros → *Comida + kcal* (los macros ya están en tiles arriba). Alimentos → *Alimento + Veredicto keto* (lo crítico). En el codebase, resuélvelo con `hidden md:table-cell` o equivalente.

## Screens / Views

### App (tema oscuro, con KetoSidebar)
1. **Dashboard** (`KetoCore Dashboard v2.dc.html`) — pantalla de inicio. Bento: tile naranja sólido con Health Score (número gigante), tile crema de calorías, tiles de adherencia/racha, plan del día, macros. Header editorial ("Buenos días, María / Vas ganando la semana").
2. **Macros** (`KetoCore Macros.dc.html`) — donut de distribución (grasas/proteína/carbos), tile crema de carbos netos restantes, 3 tiles de macro con progreso, y tabla "Registro de hoy" (Comida | kcal | P | G | C).
3. **Plan Alimenticio** (`KetoCore Plan.dc.html`) — selector de día (7 pills), 4 tarjetas de comida con imagen/estado, resumen del resto de la semana, nudge crema de lista de compras.
4. **Recetas** (`KetoCore Recetas.dc.html`) — buscador, chips de filtro, receta destacada + 2 laterales, grilla 4-col de recetas (categoría, tiempo, carbos netos).
5. **Coach IA** (`KetoCore Coach.dc.html`) — chat. Header con estado "En línea", tira de contexto (racha/peso/carbos/score), burbujas usuario/coach, tarjetas de sugerencia dentro de respuesta, chips de preguntas rápidas, input con mic + enviar.
6. **Inspector** (`KetoCore Inspector.dc.html`) — análisis. Veredicto naranja con score 82/100, 3 alertas semánticas (cetosis/proteína/hidratación), métricas con barras, gráfico de adherencia (barras), proyección de peso (SVG con línea sólida + proyección punteada).
7. **Progreso** (`KetoCore Progreso.dc.html`) — bento: peso actual con gráfico, tile crema de meta (65%), stats de racha/comidas, medidas corporales, logros (grid de badges bloqueados/desbloqueados), fotos de progreso (placeholders).
8. **Checklist** (`KetoCore Checklist.dc.html`) — banner verde de progreso (67%, anillo), 2 categorías (Nutrición/Bienestar) con ítems check, resumen semanal (7 días).
9. **Entrenamientos** (`KetoCore Entrenamientos.dc.html`) — entrenamiento de hoy (tile verde), stats de la semana, frecuencia cardíaca (tile crema), biblioteca de rutinas 3-col.
10. **Alimentos** (`KetoCore Alimentos.dc.html`) — buscador + chips + botón escanear código. Tabla "¿Es keto?" (Alimento | kcal | Grasa | C.netos | Veredicto) con badges Keto/Moderar/Evitar.
11. **Suplementos** (`KetoCore Suplementos.dc.html`) — disclaimer médico, recomendados para ti, categorías (grid), tile crema "Tomar hoy" con agenda + contador 2/3.
12. **Lista de Compras** (`KetoCore Compras.dc.html`) — resumen (artículos/carrito/costo), 4 tarjetas por pasillo con checkboxes (algunos tachados).
13. **Comunidad** (`KetoCore Comunidad.dc.html`) — tarjeta de perfil con stats, feed de publicaciones (avatar/racha/like/comentar), tile crema de leaderboard, reto activo con progreso.
14. **Mis Objetivos** (`KetoCore Objetivos.dc.html`) — objetivo principal (tile naranja, 65%), 3 sub-objetivos, línea de tiempo de hitos (completado/actual/bloqueado).
15. **Mi Perfil** (`KetoCore Perfil.dc.html`) — header de cuenta (avatar/plan/racha), perfil metabólico, metas de macros, ajustes con toggles (notificaciones, sync, tema, cerrar sesión).
16. **Guía** (`KetoCore Guia.dc.html`) — quick-start naranja, temas frecuentes (grid), FAQ acordeón.

### Onboarding / entrada (tema oscuro, sin sidebar)
17. **Welcome** (`KetoCore Welcome.dc.html`) — registro/login. Hero, pills de features, tabs Crear cuenta/Entrar, inputs, CTA, "continuar sin cuenta (modo local)".
18. **Onboarding** (`KetoCore Onboarding.dc.html`) — wizard de 4 pasos (rail izq con progreso + contenido der). Paso 2 mostrado: selección de objetivo (radio cards).

### Marketing (tema claro, con KetoTopNav)
19. **Landing** (`KetoCore Landing.dc.html`) — hero con preview de la app (mockup dark flotante), badge de social proof, stats, cómo funciona (3 pasos), banda de recetas, precios (Free/Pro), CTA naranja, footer.
20. **Protocolos** (`KetoCore Protocolos.dc.html`) — grid 3-col de protocolos (Keto Estándar, 16:8, Cíclico, Reversión, Hormonal, Ayuno prolongado) con categoría/dificultad/duración.
21. **Aprender** (`KetoCore Aprender.dc.html`) — centro de aprendizaje: chips de categoría, artículo destacado, grid 3-col de artículos.
22. **Herramientas** (`KetoCore Herramientas.dc.html`) — calculadora de macros (form + resultado en tile oscuro) + 4 herramientas (IMC, TDEE, proteína, agua).
23. **Retos** (`KetoCore Retos.dc.html`) — grid 2-col de retos (30 días sin azúcar, 7 días keto, 16:8, 10k pasos) con participantes/duración/CTA.
24. **Historias** (`KetoCore Historias.dc.html`) — stats de comunidad + grid 2-col de transformaciones (avatar, edad/protocolo, kg perdidos, testimonio).

> Nota: Recetas está tanto en la app (privada) como enlazada desde marketing.

## Interactions & Behavior (a implementar con la lógica del codebase)
- **Bottom-nav / drawer** (móvil): el drawer abre/cierra con overlay; el tab "Escanear" es el CTA central elevado.
- **Checklist / Compras**: toggling de ítems actualiza progreso (anillo/contador) y persiste.
- **Herramientas**: la calculadora recalcula macros al cambiar inputs (usar el módulo de cálculo existente `keto-score-calculator.js` / TMB).
- **Coach IA**: chat conectado al backend de IA (`supabase-keto-ai.js`); chips insertan preguntas.
- **Scanner**: cámara → detección → veredicto keto + macros (integrar con `keto-inspector-scanner-integration.js`).
- **Filtros/chips** (Recetas, Alimentos, Aprender): filtran la lista.
- **Hover**: tarjetas de marketing elevan `translateY(-4/-5px)`; nav links oscurecen; botón primario eleva + sombra.
- **Transiciones**: `.13–.16s` para hover; anillo de score anima `stroke-dashoffset` `1.2s cubic-bezier(.4,0,.2,1)`; scanline `2.4s ease-in-out infinite`.

## State Management (referencia — el codebase ya tiene sus módulos)
Estado por pantalla: registro de comidas/macros del día, checklist diario + racha, plan semanal, objetivos + hitos, perfil metabólico (peso/altura/edad/actividad/TMB), agenda de suplementos, hilos del coach. Reutilizar los módulos en `web/public/app/modules/` y `storage-manager.js` / `cloudSync.js`.

## Assets
- **Logo**: `assets/logo.svg` (gradiente naranja del original `web/public/app/logo.svg`). Ya existe en el codebase.
- **Iconos**: Material Symbols Outlined vía Google Fonts (el codebase ya lo carga).
- **Imágenes de comida/recetas/ejercicios**: los mocks usan placeholders con gradiente + icono. En producción usar las reales de `web/public/app/images/`.
- **Fuentes**: Plus Jakarta Sans + Inter vía Google Fonts.

## Files (referencias de diseño en este bundle)
Los 24 archivos `KetoCore *.dc.html` (pantallas) + `KetoSidebar.dc.html` y `KetoTopNav.dc.html` (navegación). Cada uno es autónomo salvo la barra/nav compartidas y `assets/logo.svg`. Ignora `support.js` (runtime del prototipo, no portar).
