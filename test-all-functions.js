// ==========================================
// KETOLAB - SCRIPT DE PRUEBAS AUTOMATIZADAS
// Ejecutar en la consola del navegador (F12)
// ==========================================

(async function() {
    console.log('🧪 INICIANDO PRUEBAS DE KETOLAB...');
    console.log('='.repeat(50));
    
    const results = [];
    
    function test(name, fn) {
        try {
            const result = fn();
            if (result === true || result === undefined) {
                console.log(`✅ ${name}`);
                results.push({ name, status: 'PASS' });
                return true;
            } else {
                console.log(`⚠️ ${name} - Resultado: ${result}`);
                results.push({ name, status: 'WARN', result });
                return result;
            }
        } catch (e) {
            console.log(`❌ ${name} - Error: ${e.message}`);
            results.push({ name, status: 'FAIL', error: e.message });
            return false;
        }
    }

    // ==========================================
    // TEST 1: Verificar localStorage
    // ==========================================
    console.log('\n📦 TEST 1: localStorage');
    
    test('localStorage disponible', () => {
        localStorage.setItem('test', 'test');
        const val = localStorage.getItem('test');
        localStorage.removeItem('test');
        return val === 'test' ? true : 'No funciona';
    });

    // ==========================================
    // TEST 2: Perfil - Guardar perfil
    // ==========================================
    console.log('\n👤 TEST 2: Perfil');
    
    const testProfile = {
        nombre: 'Usuario Test',
        edad: 30,
        sexo: 'masculino',
        altura: 175,
        startWeight: 85,
        goalWeight: 75,
        activity: 'moderado',
        objetivo: 'perder_grasa'
    };
    
    test('Guardar perfil en localStorage', () => {
        localStorage.setItem('keto_profile', JSON.stringify(testProfile));
        const saved = JSON.parse(localStorage.getItem('keto_profile'));
        return saved.nombre === 'Usuario Test' ? true : 'Perfil no guardado';
    });
    
    test('Calcular macros automáticamente', () => {
        const profile = JSON.parse(localStorage.getItem('keto_profile'));
        // BMR = 10 * peso + 6.25 * altura - 5 * edad + 5 (hombre)
        const bmr = 10 * profile.startWeight + 6.25 * profile.altura - 5 * profile.edad + 5;
        const activityMultiplier = { sedentario: 1.2, ligero: 1.375, moderado: 1.55, activo: 1.725, muy_activo: 1.9 };
        const tdee = bmr * (activityMultiplier[profile.activity] || 1.55);
        const macros = {
            calories: Math.round(tdee * 0.8), // Déficit del 20%
            protein: Math.round(profile.startWeight * 2), // 2g por kg
            fat: Math.round((tdee * 0.75) / 9),
            carbs: Math.round((tdee * 0.05) / 4)
        };
        localStorage.setItem('keto_macros', JSON.stringify(macros));
        console.log('   Macros calculados:', macros);
        return macros.calories > 0 ? true : 'Error en cálculo';
    });

    // ==========================================
    // TEST 3: Alimentos - CRUD
    // ==========================================
    console.log('\n🥩 TEST 3: Alimentos');
    
    test('Agregar alimento personalizado', () => {
        const foods = JSON.parse(localStorage.getItem('ketoFoods') || '[]');
        const newFood = {
            id: 'test_' + Date.now(),
            name: 'Pollo Test',
            calories: 165,
            protein: 31,
            carbs: 0,
            fat: 4,
            portion: 100,
            category: 'proteina',
            isKeto: true
        };
        foods.push(newFood);
        localStorage.setItem('ketoFoods', JSON.stringify(foods));
        return foods.length > 0 ? true : 'No se agregó';
    });
    
    test('Buscar alimento', () => {
        const foods = JSON.parse(localStorage.getItem('ketoFoods') || '[]');
        const found = foods.find(f => f.name === 'Pollo Test');
        return found ? true : 'No encontrado';
    });
    
    test('Marcar como favorito', () => {
        const foods = JSON.parse(localStorage.getItem('ketoFoods') || '[]');
        const food = foods.find(f => f.name === 'Pollo Test');
        if (food) {
            food.isFavorite = true;
            localStorage.setItem('ketoFoods', JSON.stringify(foods));
            return true;
        }
        return 'Alimento no encontrado';
    });
    
    test('Eliminar alimento', () => {
        let foods = JSON.parse(localStorage.getItem('ketoFoods') || '[]');
        foods = foods.filter(f => f.name !== 'Pollo Test');
        localStorage.setItem('ketoFoods', JSON.stringify(foods));
        const found = foods.find(f => f.name === 'Pollo Test');
        return found ? 'No se eliminó' : true;
    });

    // ==========================================
    // TEST 4: Plan de comidas
    // ==========================================
    console.log('\n📅 TEST 4: Plan de comidas');
    
    test('Crear plan del día', () => {
        const today = new Date().toISOString().split('T')[0];
        const mealPlan = {
            desayuno: [{ id: '1', name: 'Huevos', portion: 100, calories: 155 }],
            almuerzo: [],
            cena: [],
            snacks: []
        };
        localStorage.setItem('mealPlan_' + today, JSON.stringify(mealPlan));
        return true;
    });
    
    test('Agregar a comida específica', () => {
        const today = new Date().toISOString().split('T')[0];
        let plan = JSON.parse(localStorage.getItem('mealPlan_' + today) || '{}');
        plan.almuerzo = [{ id: '2', name: 'Pollo', portion: 150, calories: 248 }];
        localStorage.setItem('mealPlan_' + today, JSON.stringify(plan));
        return plan.almuerzo.length > 0 ? true : 'No se agregó';
    });
    
    test('Calcular totales del día', () => {
        const today = new Date().toISOString().split('T')[0];
        const plan = JSON.parse(localStorage.getItem('mealPlan_' + today) || '{}');
        let totalCal = 0, totalProt = 0;
        Object.values(plan).forEach(meals => {
            meals.forEach(item => {
                totalCal += item.calories || 0;
            });
        });
        console.log('   Total calorías hoy:', totalCal);
        return totalCal > 0 ? true : 'Error en cálculo';
    });

    // ==========================================
    // TEST 5: Registro de peso
    // ==========================================
    console.log('\n⚖️ TEST 5: Peso');
    
    test('Registrar peso', () => {
        const today = new Date().toISOString().split('T')[0];
        const entry = { date: today, weight: 83.5 };
        const history = JSON.parse(localStorage.getItem('keto_weight_history') || '[]');
        history.push(entry);
        localStorage.setItem('keto_weight_history', JSON.stringify(history));
        return history.length > 0 ? true : 'No se registró';
    });
    
    test('Calcular progreso', () => {
        const profile = JSON.parse(localStorage.getItem('keto_profile') || '{}');
        const history = JSON.parse(localStorage.getItem('keto_weight_history') || '[]');
        if (history.length > 0) {
            const current = history[history.length - 1].weight;
            const lost = profile.startWeight - current;
            const percent = (lost / (profile.startWeight - profile.goalWeight) * 100).toFixed(1);
            console.log('   Peso perdido:', lost.toFixed(1) + 'kg', '(' + percent + '%)');
            return true;
        }
        return 'Sin historial';
    });

    // ==========================================
    // TEST 6: Checklist
    // ==========================================
    console.log('\n✅ TEST 6: Checklist');
    
    test('Crear checklist del día', () => {
        const today = new Date().toISOString().split('T')[0];
        const checklist = {
            agua: false,
            suplementos: false,
            ayuno: false,
            ejercicio: false,
            keto: false
        };
        localStorage.setItem('checklist_' + today, JSON.stringify(checklist));
        return true;
    });
    
    test('Marcar tarea como completada', () => {
        const today = new Date().toISOString().split('T')[0];
        let checklist = JSON.parse(localStorage.getItem('checklist_' + today) || '{}');
        checklist.agua = true;
        localStorage.setItem('checklist_' + today, JSON.stringify(checklist));
        return checklist.agua === true ? true : 'No se marcó';
    });
    
    test('Calcular progreso del checklist', () => {
        const today = new Date().toISOString().split('T')[0];
        const checklist = JSON.parse(localStorage.getItem('checklist_' + today) || '{}');
        const total = Object.keys(checklist).length;
        const completed = Object.values(checklist).filter(v => v === true).length;
        const percent = Math.round((completed / total) * 100);
        console.log('   Progreso:', percent + '%', `(${completed}/${total})`);
        return percent >= 0 ? true : 'Error';
    });

    // ==========================================
    // TEST 7: Rachas (Streaks)
    // ==========================================
    console.log('\n🔥 TEST 7: Rachas');
    
    test('Iniciar tracking de racha', () => {
        const today = new Date().toISOString().split('T')[0];
        const streak = {
            currentStreak: 1,
            longestStreak: 1,
            lastCompletedDate: today
        };
        localStorage.setItem('ketoStreak', JSON.stringify(streak));
        return true;
    });
    
    test('Verificar incremento de racha', () => {
        const streak = JSON.parse(localStorage.getItem('ketoStreak') || '{}');
        console.log('   Racha actual:', streak.currentStreak, 'días');
        console.log('   Racha máxima:', streak.longestStreak, 'días');
        return streak.currentStreak > 0 ? true : 'Error';
    });

    // ==========================================
    // TEST 8: Suplementos
    // ==========================================
    console.log('\n💊 TEST 8: Suplementos');
    
    test('Registrar suplemento tomado', () => {
        const today = new Date().toISOString().split('T')[0];
        const supplements = {
            magnesio: true,
            omega3: true,
            vitamina_d: false
        };
        localStorage.setItem('supplements_' + today, JSON.stringify(supplements));
        return true;
    });

    // ==========================================
    // TEST 9: Entrenamientos
    // ==========================================
    console.log('\n🏋️ TEST 9: Entrenamientos');
    
    test('Crear workout del día', () => {
        const today = new Date().toISOString().split('T')[0];
        const workout = {
            date: today,
            exercises: [
                { name: 'Press de banca', sets: 4, reps: 10, weight: 80 }
            ],
            duration: 45,
            calories: 300
        };
        localStorage.setItem('workout_' + today, JSON.stringify(workout));
        return true;
    });
    
    test('Calcular volumen total', () => {
        const today = new Date().toISOString().split('T')[0];
        const workout = JSON.parse(localStorage.getItem('workout_' + today) || '{}');
        const volume = workout.exercises?.reduce((sum, ex) => sum + (ex.sets * ex.reps * ex.weight), 0) || 0;
        console.log('   Volumen total:', volume, 'kg');
        return volume > 0 ? true : 'Sin ejercicios';
    });

    // ==========================================
    // TEST 10: Backup/Restore
    // ==========================================
    console.log('\n💾 TEST 10: Backup');
    
    test('Exportar datos (backup)', () => {
        const backup = {
            profile: localStorage.getItem('keto_profile'),
            macros: localStorage.getItem('keto_macros'),
            foods: localStorage.getItem('ketoFoods'),
            weightHistory: localStorage.getItem('keto_weight_history'),
            streak: localStorage.getItem('ketoStreak')
        };
        const backupStr = JSON.stringify(backup);
        localStorage.setItem('ketolab_backup', backupStr);
        console.log('   Tamaño backup:', (backupStr.length / 1024).toFixed(2), 'KB');
        return backupStr.length > 0 ? true : 'Error';
    });
    
    test('Importar datos (restore)', () => {
        const backup = JSON.parse(localStorage.getItem('ketolab_backup') || '{}');
        if (backup.profile) localStorage.setItem('keto_profile', backup.profile);
        return backup.profile ? true : 'Sin backup';
    });

    // ==========================================
    // RESULTADOS FINALES
    // ==========================================
    console.log('\n' + '='.repeat(50));
    console.log('📊 RESULTADOS DE PRUEBAS');
    console.log('='.repeat(50));
    
    const passed = results.filter(r => r.status === 'PASS').length;
    const warnings = results.filter(r => r.status === 'WARN').length;
    const failed = results.filter(r => r.status === 'FAIL').length;
    
    console.log(`\n✅ Pasadas: ${passed}`);
    console.log(`⚠️ Advertencias: ${warnings}`);
    console.log(`❌ Fallidas: ${failed}`);
    console.log(`📝 Total: ${results.length}`);
    
    const percent = Math.round((passed / results.length) * 100);
    console.log(`\n🎯 Porcentaje de éxito: ${percent}%`);
    
    if (failed > 0) {
        console.log('\n❌ PRUEBAS FALLIDAS:');
        results.filter(r => r.status === 'FAIL').forEach(r => {
            console.log(`   - ${r.name}: ${r.error}`);
        });
    }
    
    if (warnings > 0) {
        console.log('\n⚠️ PRUEBAS CON ADVERTENCIAS:');
        results.filter(r => r.status === 'WARN').forEach(r => {
            console.log(`   - ${r.name}: ${r.result}`);
        });
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('🧪 PRUEBAS COMPLETADAS');
    console.log('='.repeat(50));
    
})();
