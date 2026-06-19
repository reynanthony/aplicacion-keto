# Script de Instalación - KetoLab + Supabase AI

## Pasos de Instalación

### 1. Ejecutar Schema SQL en Supabase

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Navega a **SQL Editor**
3. Copia todo el contenido de `supabase/schema-keto-intelligence.sql`
4. Pega en el editor
5. Click en **Run**

### 2. Deploy Edge Function

```bash
# Instalar Supabase CLI si no lo tienes
npm install -g supabase

# Login a tu cuenta
supabase login

# Ir al directorio del proyecto
cd C:\KetoLab

# Inicializar (solo la primera vez)
supabase init

# Deploy de la función keto-ai
supabase functions deploy keto-ai
```

### 3. Configurar Secrets de Edge Function

En Supabase Dashboard → **Edge Functions** → **keto-ai** → **Secrets**:

```
OPENAI_API_KEY=sk-tu-api-key-aqui
```

Para obtener tu API key de OpenAI:
- Ve a [OpenAI Platform](https://platform.openai.com/api-keys)
- Click en "Create new secret key"
- Copia la key y pégala en Supabase

### 4. Verificar Instalación

1. Abre `plan.html` en tu navegador
2. Abre la consola (F12 → Console)
3. Deberías ver:
   ```
   [KetoSupabase] Inicializado con Supabase
   [KetoAI] Cliente inicializado
   ```

4. Verifica que el botón "IA" aparece junto a "Crear plan"

---

## Estructura de Archivos Creados

```
C:\KetoLab\
├── modules\
│   ├── supabase-keto-intelligence.js  # Cliente Supabase
│   ├── supabase-keto-ai.js           # Cliente AI (OpenAI)
│   ├── user-learning.js               # Feedback del usuario
│   └── keto-score-calculator.js       # KetoScore mejorado
│
├── supabase\
│   ├── schema-keto-intelligence.sql   # Schema de BD
│   └── functions\
│       └── keto-ai\
│           └── index.ts               # Edge Function
│
└── plan.html                          # UI actualizada
```

---

## Funcionalidades Disponibles

### 1. Generación de Recetas con IA
- Click en botón "IA" junto a "Crear plan"
- Selecciona tipo de comida (desayuno, almuerzo, cena, snacks)
- Configura macros objetivo
- Indica ingredientes a evitar
- IA genera receta única

### 2. Plan Semanal con IA
- Genera plan semanal completo
- Cada comida generada con IA
- Optimizado para tus macros objetivo
- Evita ingredientes que no te gustan

### 3. Búsqueda Semántica (futuro)
- Buscar recetas similares
- Encontrar sustitutos de ingredientes
- Recomendaciones personalizadas

### 4. Feedback y Aprendizaje
- Like/dislike de recetas
- Calificaciones
- Perfil de usuario dinámico
- Sincronización en la nube (con Supabase)

---

## Costos

| Servicio | Tier Gratuito | Notas |
|----------|--------------|-------|
| Supabase PostgreSQL | 500MB | $0 |
| Supabase Auth | 50K MAU | $0 |
| Supabase Edge Functions | 2M invocaciones/mes | $0 |
| OpenAI (GPT-4o-mini) | $0.00015/1K tokens | ~$0.01 por receta |

**Total: $0/mes** (con uso moderado)

---

## Solución de Problemas

### Error: "Supabase no encontrado"
- Verifica que `window.supabase` está disponible
- Revisa que tienes la SDK de Supabase cargada

### Error: "Edge Function no existe"
- Verifica que deployaste la función: `supabase functions deploy keto-ai`
- Verifica que la URL es correcta

### Error: "OpenAI API key inválida"
- Ve a Supabase → Edge Functions → keto-ai → Secrets
- Verifica que `OPENAI_API_KEY` está configurado
- Verifica que la key es válida en OpenAI

### Error: "CORS"
- Las Edge Functions de Supabase manejan CORS automáticamente
- Asegúrate de usar `Authorization: Bearer <token>`

---

## Recomendaciones

1. **Empieza con el tier gratuito** de Supabase
2. **Usa GPT-4o-mini** (más barato que GPT-4)
3. **Implementa cache** para reducir llamadas a la API
4. **Monitorea uso** en Supabase Dashboard

---

## Próximas Mejoras Posibles

1. [ ] Embeddings vectoriales para recetas
2. [ ] Fine-tuning del modelo
3. [ ] Cache de respuestas en Supabase
4. [ ] Historial de recetas generadas
5. [ ] Compartir recetas entre usuarios

---

**¿Necesitas ayuda?** Revisa el archivo `REPORTE-EJECUTIVO-KETOLAB.md` para más detalles.
