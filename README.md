# KetoCore v2.0 - Sistema Híbrido

## 🎯 Objetivo

**KetoCore** es una aplicación web progresiva (PWA) de seguimiento para dieta keto que combina el control manual con asistencia inteligente.

## ✨ Novedades v2.0 - Sistema Híbrido

### Modo Automático
- **Plan de comidas inteligente**: Genera planes basados en tus recetas guardadas y objetivos de macros
- **Rutinas de ejercicio personalizadas**: Según equipamiento disponible y nivel
- **Recomendaciones de suplementación**: Basadas en tu perfil y actividad

### Modo Manual (preservado)
- Control total sobre tus planes
- Registro libre de alimentos y ejercicios
- Planificador semanal tradicional

## 🔄 Cómo Usar

1. **Configura tus preferencias** en cada sección
2. **Elige el modo** que prefieras (Manual o Automático)
3. **Ajusta** las sugerencias automáticas si lo deseas
4. **Guarda** tu plan personalizado

## 📁 Estructura

```
/
├── modules/
│   ├── auto-meal-generator.js    # Generador de planes de comida
│   ├── auto-workout-generator.js # Generador de rutinas de ejercicio
│   └── supplement-recommender.js # Recomendador de suplementos
├── data/
│   ├── recipes-db.js            # Base de datos de recetas
│   ├── exercises-db.js          # Base de datos de ejercicios
│   └── supplements-db.js        # Base de datos de suplementos
├── *.html                       # Páginas de la aplicación
└── verify_hibrido.sh           # Script de verificación
```

## 📱 Funcionalidades

- **Dashboard**: Resumen diario de progreso
- **Plan**: Planificador de comidas (Manual/Automático)
- **Recetas**: Catálogo de recetas keto
- **Despensa**: Gestión de alimentos disponibles
- **Macros**: Seguimiento de macronutrientes
- **Checklist**: Tareas diarias y registro de consumo
- **Gym**: Registro de entrenamientos (Manual/Automático)
- **Suplementos**: Recomendaciones personalizadas

## ⚠️ Advertencias

Las recomendaciones automáticas son orientativas. Consulta con un profesional de la salud antes de iniciar cualquier plan de alimentación, ejercicio o suplementación.

## 🛠️ Tecnologías

- HTML5, CSS3, JavaScript (Vanilla)
- TailwindCSS
- PWA (Service Worker)
- localStorage para persistencia

## 📋 Verificación

Ejecuta el script de verificación:
```bash
bash verify_hibrido.sh
```

---

**KetoCore** - High-Performance Fuel for Your Keto Journey
