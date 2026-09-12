# 📍 MAPA DE DECISIONES - KetoLab
**Recomendaciones de producto y estrategia**

---

## 🎯 Pregunta Central
¿Qué debemos priorizar: **Calidad técnica** o **Nuevas funcionalidades**?

### Respuesta: **Calidad técnica PRIMERO**

**Razón:** El costo de arreglar deuda técnica crece exponencialmente
- Arreglarlo ahora: 40h = $2,000
- En 3 meses con más usuarios: 80h = $4,000+
- En 6 meses con equipo más grande: 120h+ = imposible

---

## 📊 Matriz de Decisiones

### Escenario 1: Crecer de usuarios (Recomendado)
```
MES 1: Refactoring (18h) + Mantener usuarios existentes
  ↓
MES 2: Tests (12h) + Pequeño crecimiento
  ↓
MES 3+: Nuevas features + Estabilidad garantizada
```

**Resultado:** Escala sostenible, código mantenible

### Escenario 2: Features primero (NO recomendado)
```
MES 1: Agregar analytics + Notificaciones push
  ↓
MES 2: Problemas de deuda técnica se acumulan
  ↓
MES 3: Código un desastre, cambios lentos (5x más tiempo)
  ↓
MES 4: Equipo nuevo tarda 2 semanas solo en entender código
```

**Resultado:** Costo exponencial, eventualmente requiere rewrite

---

## 💡 Decisiones de Producto

### 1. Qué Mantener ✅

| Feature | Razón | Estado |
|---------|-------|--------|
| **Generadores automáticos** | Diferenciador clave | Keep + pulir |
| **PWA offline-first** | Ventaja competitiva | Keep + mejorar |
| **localStorage sin backend** | Simplicidad + privacidad | Keep |
| **Diseño moderno** | Ya es bueno | Mantener |

### 2. Qué Mejorar 🟡

| Feature | Cambio | Impacto |
|---------|--------|--------|
| **Dialogs nativos** | → Modales personalizados | UX +30% |
| **Validación** | Más robusta | Confianza +40% |
| **Documentación** | Mejorar para nuevos devs | Onboarding -50% |
| **i18n** | Completar ES/EN | Mercado +20% |

### 3. Qué Agregar 🟢

**Fase 1 (Mes 3-4):** Después de refactoring
- [ ] Notificaciones push (6h) - Engagement +30%
- [ ] Analytics básico (4h) - Tomar mejores decisiones
- [ ] Imágenes de recetas completas (6h) - UX mejorado

**Fase 2 (Mes 5-6):** Post MVP+
- [ ] Compartir recetas (8h) - Community feature
- [ ] Histórico detallado (6h) - Valor agregado
- [ ] API OpenFoodFacts integrada (4h) - Más alimentos

**Fase 3 (Mes 7+):** Cuando sea rentable
- [ ] Cloud sync (16h) - Multi-dispositivo
- [ ] Wearables integration (24h) - Apple Watch/Fitbit
- [ ] AI chatbot (20h) - Coach virtual

### 4. Qué Descartar ❌

| Feature | Razón | Alternativa |
|---------|-------|-----------|
| Apple Health integration | No API web, necesita app nativa | Esperar (24h, caro) |
| Integración redes sociales | Fuera de scope | Dashboard privado es mejor |
| Modo multiplayer/comunidad | Requiere backend | Fase 3 si hay demanda |

---

## 📈 Proyecciones de Impacto

### Escenario: Post-Refactoring (Mes 2)

| Métrica | Antes | Después | Cambio |
|---------|-------|---------|--------|
| Bugs por mes | 4 | 1 | -75% |
| Tiempo por feature | 4h | 2.5h | -37% |
| NPS (esperado) | 6.5/10 | 8.0/10 | +23% |
| Tiempo onboarding dev | 8h | 3h | -62% |
| Escalabilidad | 3/10 | 7/10 | +133% |

### Ingresos/Retención (12 meses)

**Sin refactoring:** 
- Usuarios mes 1: 1,000
- Usuarios mes 6: 1,200 (crecimiento lento)
- Usuarios mes 12: 1,400
- Churn: 30% (equipo saturado)

**Con refactoring:**
- Usuarios mes 1: 1,000
- Usuarios mes 6: 2,500 (2.5x)
- Usuarios mes 12: 5,000 (5x)
- Churn: 10% (equipo estable)

**Diferencia:** 3,600 usuarios adicionales = $5,400 MRR extra (@ $1.5/usuario)

---

## 🗺️ Roadmap Recomendado (12 meses)

### Q1 2026 (Meses 1-3)
**Foco: Calidad Técnica**

```
Semana 1-2: Refactoring crítico (Phase 1)
- Centralizar código duplicado
- Reemplazar dialogs nativos
- Mejorar validación

Semana 3-4: Completar refactoring + Tests
- Tests unitarios básicos
- Documentation
- Deploy + validar

Resultado: v9.0/10
Effort: 40h
GOAL: Estable para crecer
```

### Q2 2026 (Meses 4-6)
**Foco: Funcionalidades Clave**

```
Mes 4: Notificaciones Push
- Implementar push notifications
- Recordatorios automáticos
- Analytics básico
Effort: 10h

Mes 5: Que usuarios pidan
- Basado en feedback
- Features votadas por community
Effort: 16h

Resultado: v9.5/10
GOAL: Diferenciación
```

### Q3 2026 (Meses 7-9)
**Foco: Expansión**

```
Mes 7: Multi-lenguaje completo
- i18n full (200+ strings)
- Soporte ES/EN/PT
Effort: 12h

Mes 8: Backend MVP (opcional)
- Cloud sync
- Multi-dispositivo
Effort: 20h

Mes 9: Comunidad básica
- Compartir recetas
- Rating de recetas
Effort: 12h

Resultado: v10.0/10
GOAL: Escalable globalmente
```

### Q4 2026 (Meses 10-12)
**Foco: Monetización + Wearables**

```
Mes 10: Integración Wearables
- Apple Watch sincronización
- Fitbit integration
Effort: 24h

Mes 11-12: PAUSA y estabilización
- Bug fixes
- Performance optimization
- User feedback implementation

AÑO 2027: Decisión sobre IA chatbot
```

---

## 💰 Presupuesto Recomendado

### Recursos Humanos

**Meses 1-2 (Refactoring):**
- 1 Senior Dev: 40h @ $75/h = $3,000
- 1 QA/Tester: 20h @ $40/h = $800
- Code review: 10h @ $50/h = $500
- **Subtotal:** $4,300

**Meses 3-6 (Features):**
- 1-2 Dev: 80h @ $60/h = $4,800
- 1 Designer: 20h @ $80/h = $1,600 (opcional)
- **Subtotal:** $6,400

**Meses 7-12 (Scale):**
- 2 Dev + 1 PM: variable
- **Subtotal:** $12,000+

**Total Año 1:** ~$25,000

### Infraestructura

- Hosting (GitHub Pages): $0
- Dominio: $12/año
- Certificados SSL: $0 (Let's Encrypt)
- Analytics: $0 (Plausible free tier)
- **Total:** <$20/año

---

## 🎯 KPIs a Monitorear

### Técnicos
- [ ] Code duplication ratio: >20% → <5%
- [ ] Test coverage: 0% → 60%
- [ ] Lighthouse performance: 75 → 95
- [ ] Bugs por mes: 4 → <1

### Comerciales
- [ ] Daily Active Users (DAU)
- [ ] Retention rate (month-over-month)
- [ ] Net Promoter Score (NPS)
- [ ] Feature adoption rate

### Operacionales
- [ ] Time to fix bug: 4h → 1.5h
- [ ] Time to feature: 4h → 2.5h
- [ ] Developer onboarding: 8h → 3h
- [ ] Deploy frequency: 1x/semana → 3x/semana

---

## ✅ Checklist de Decisión

### Antes de empezar Sprint 1

- [ ] **Aprobación** de refactoring vs nuevas features (✅ Refactoring)
- [ ] **Budget** asignado para 40h (✅ $2,000-3,000)
- [ ] **Developer** confirmado full-time (Pendiente)
- [ ] **Timeline** claro (Meses 1-2) (✅)
- [ ] **Success criteria** definidas (✅ v9.0/10 o mejor)
- [ ] **Git workflow** establecido (Pull requests, review)
- [ ] **Testing** strategy documentada

### Antes de ir a Producción (Sprint 2)

- [ ] Tests suite completa (60%+ cobertura)
- [ ] Documentación actualizada
- [ ] Changelog generado
- [ ] Security audit completado
- [ ] Performance benchmarks validados

---

## 📞 Recomendación Final

### DECISIÓN: ✅ PROCEDER

**Condiciones:**
1. Refactoring AHORA (antes de escalar)
2. 1 developer full-time por 2 semanas
3. Budget $2,000-3,000 para Q1
4. Roadmap acordado con equipo

**Justificación:**
- ROI positivo en mes 3
- Costo de no hacer: $5,400+ en oportunidades perdidas
- Deuda técnica es insostenible para crecimiento

**Responsables:**
- [ ] CTO: Aprobación + Budget
- [ ] Producto: Roadmap + Prioridades
- [ ] Desarrollo: Ejecución + QA

---

**Documento de decisión estratégica**  
**Preparado:** 27-03-2026  
**Válido para:** Q1 2026  
**Próxima revisión:** Post Sprint 1
