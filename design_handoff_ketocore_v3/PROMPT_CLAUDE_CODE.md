# Prompt de arranque para Claude Code

Copia esto como primer mensaje en Claude Code, dentro del repo de KetoCore.

---

Vamos a implementar el rediseño de la app móvil de KetoCore (v3). El paquete de diseño está en `design_handoff_ketocore_v3/`.

**Antes de escribir código:**

1. Lee `design_handoff_ketocore_v3/README.md` completo. Es la especificación: tokens exactos, los 6 componentes, las 18 pantallas y el cambio de modelo de datos.
2. Abre los `.dc.html` del paquete en el navegador para ver el resultado previsto. Son **referencias de diseño en HTML**, no código a copiar: hay que recrearlos en Astro + Tailwind con los patrones que ya usa `web/src/`.
3. Explora `web/src/pages/app/`, `web/src/components/AppSidebar.astro` y `web/src/styles/global.css` para entender qué existe hoy.
4. Dime qué encontraste y proponme un plan por fases antes de tocar nada.

**Orden de implementación obligatorio** (está en el README, no lo reordenes):

1. Tokens en `tailwind.config` + los 6 componentes como `.astro`, **con el estado de alerta desde el día uno**.
2. `DayBudget` **variable** en el modelo de datos, antes de cualquier pantalla. Si nace fijo, después no se le puede añadir el bonus por entreno.
3. Hoy + hoja Registrar + Scanner, con la animación de 720 ms.
4. Macros, Alimentos, Plan y Compras sobre `DataRow` — borrando las tablas heredadas.
5. Progreso, Yo y Coach (el Coach absorbe Inspector y Guía).
6. Entrenar y Suplementos conectados al bucle; Comunidad al final.
7. Onboarding y Welcome.

**Reglas que no se negocian:**

- El botón central del dock **abre una hoja, nunca navega**.
- Naranja `#ff4d00` **solo** en estado de alerta; lima `#c8f560` es el color operativo.
- Máximo **un bloque crema** por pantalla.
- **Cero** tablas y **cero** modales centrados.
- Nada pide confirmación; todo se deshace (4 s).
- Cifras en listas siempre en JetBrains Mono, tabulares, alineadas a la derecha.
- Texto ≥ 12.5 px, objetivo táctil ≥ 44 px.
- Respeta `prefers-reduced-motion`.

**Ojo con esto:** los valores `+7 g` / `+4 g` del bonus por entreno son de ejemplo. Impleméntalos como función configurable y documentada (`trainingBonus(type, durationMin, intensity)`), con un TODO visible para que un profesional los valide. No los dejes hardcodeados en la vista.

Empieza por el paso 1 y para cuando lo tengas, para que yo lo revise antes de seguir.
