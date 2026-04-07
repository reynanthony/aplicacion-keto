// =============================================
// KetoLab Data Loader - Carga datos de Supabase
// =============================================

const SUPABASE_URL = 'https://lmbqzsonujwvqmfhjjgf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtYnF6c29udWp3dnFtZmhqamdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNTQzMDAsImV4cCI6MjA4ODgzMDMwMH0.SBsTQCh844rtGx0wLNZaEGO8NDmAVZjUj1YiDkRSm1k';

window.KetoLabData = {
    alimentos: [],
    recetas: [],
    suplementos: [],
    ejercicios: [],
    loaded: false
};

async function loadAllData() {
    if (window.KetoLabData.loaded) return window.KetoLabData;
    
    try {
        const headers = {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        };
        
        const [alimentos, recetas, suplementos, ejercicios] = await Promise.all([
            fetch(`${SUPABASE_URL}/rest/v1/alimentos?activo=eq.true&select=*`, { headers }).then(r => r.json()),
            fetch(`${SUPABASE_URL}/rest/v1/recetas?activo=eq.true&select=*`, { headers }).then(r => r.json()),
            fetch(`${SUPABASE_URL}/rest/v1/suplementos?activo=eq.true&select=*`, { headers }).then(r => r.json()),
            fetch(`${SUPABASE_URL}/rest/v1/ejercicios?activo=eq.true&select=*`, { headers }).then(r => r.json())
        ]);
        
        window.KetoLabData.alimentos = alimentos || [];
        window.KetoLabData.recetas = recetas || [];
        window.KetoLabData.suplementos = suplementos || [];
        window.KetoLabData.ejercicios = ejercicios || [];
        window.KetoLabData.loaded = true;
        
        console.log('✅ KetoLab data loaded from Supabase:', {
            alimentos: window.KetoLabData.alimentos.length,
            recetas: window.KetoLabData.recetas.length,
            suplementos: window.KetoLabData.suplementos.length,
            ejercicios: window.KetoLabData.ejercicios.length
        });
        
        return window.KetoLabData;
    } catch (error) {
        console.error('❌ Error loading Supabase data:', error);
        return window.KetoLabData;
    }
}

async function loadAlimentos() {
    const headers = {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    };
    
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/alimentos?activo=eq.true&select=*&order=nombre`, headers);
        const data = await response.json();
        window.KetoLabData.alimentos = data || [];
        return data;
    } catch (error) {
        console.error('Error loading alimentos:', error);
        return [];
    }
}

async function loadRecetas() {
    const headers = {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    };
    
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/recetas?activo=eq.true&select=*&order=fecha_creacion.desc`, headers);
        const data = await response.json();
        window.KetoLabData.recetas = data || [];
        return data;
    } catch (error) {
        console.error('Error loading recetas:', error);
        return [];
    }
}

async function loadSuplementos() {
    const headers = {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    };
    
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/suplementos?activo=eq.true&select=*`, headers);
        const data = await response.json();
        window.KetoLabData.suplementos = data || [];
        return data;
    } catch (error) {
        console.error('Error loading suplementos:', error);
        return [];
    }
}

async function loadEjercicios() {
    const headers = {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    };
    
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/ejercicios?activo=eq.true&select=*&order=nombre`, headers);
        const data = await response.json();
        window.KetoLabData.ejercicios = data || [];
        return data;
    } catch (error) {
        console.error('Error loading ejercicios:', error);
        return [];
    }
}

// Convertir formato Supabase a formato de la app
function convertAlimentoToAppFormat(supabaseAlimento) {
    return {
        id: supabaseAlimento.id,
        name: supabaseAlimento.nombre,
        calories: parseFloat(supabaseAlimento.calorias) || 0,
        protein: parseFloat(supabaseAlimento.proteinas) || 0,
        fat: parseFloat(supabaseAlimento.grasas) || 0,
        carbs: parseFloat(supabaseAlimento.carbos) || 0,
        fiber: parseFloat(supabaseAlimento.fibra) || 0,
        category: supabaseAlimento.categoria,
        unit: supabaseAlimento.unidad_base || 'g',
        source: supabaseAlimento.fuente || 'Supabase'
    };
}

function convertRecetaToAppFormat(supabaseReceta) {
    return {
        id: supabaseReceta.id,
        title: supabaseReceta.titulo,
        description: supabaseReceta.descripcion || '',
        instructions: supabaseReceta.instrucciones || '',
        difficulty: supabaseReceta.dificultad || 'media',
        category: supabaseReceta.tiempo_preparacion ? categorizeByTime(supabaseReceta.tiempo_preparacion) : 'snacks',
        prepTime: supabaseReceta.tiempo_preparacion || 15,
        image: supabaseReceta.imagen_url || '',
        source: 'Supabase'
    };
}

function categorizeByTime(minutes) {
    if (minutes <= 15) return 'desayuno';
    if (minutes <= 30) return 'almuerzo';
    if (minutes <= 45) return 'cena';
    return 'snacks';
}

function convertSuplementoToAppFormat(supabaseSuplemento) {
    return {
        id: supabaseSuplemento.id,
        name: supabaseSuplemento.nombre,
        category: mapCategory(supabaseSuplemento.categoria),
        dosage: supabaseSuplemento.dosis_recomendada || '',
        benefits: supabaseSuplemento.beneficios || '',
        contraindications: supabaseSuplemento.contraindicaciones || '',
        evidence: supabaseSuplemento.evidencia_nivel || 'moderada',
        source: 'Supabase'
    };
}

function mapCategory(cat) {
    const map = {
        'mineral': 'esencial',
        'vitamina': 'esencial',
        'proteina': 'rendimiento',
        'aminoacido': 'rendimiento',
        'creatina': 'rendimiento',
        'cetogenico': 'control',
        'acido_graso': 'control',
        'quemador': 'control',
        'adaptogeno': 'salud',
        'hormona': 'salud',
        'digestivo': 'salud',
        'estimulante': 'rendimiento'
    };
    return map[cat] || 'salud';
}

function convertEjercicioToAppFormat(supabaseEjercicio) {
    return {
        id: supabaseEjercicio.id,
        name: supabaseEjercicio.nombre,
        category: supabaseEjercicio.categoria,
        muscles: supabaseEjercicio.musculos_trabajados || '',
        equipment: supabaseEjercicio.equipo_necesario || 'ninguno',
        level: supabaseEjercicio.nivel || 'principiante',
        caloriesPerMinute: parseFloat(supabaseEjercicio.calorias_estimadas_por_minuto) || 5,
        instructions: supabaseEjercicio.instrucciones || '',
        source: 'Supabase'
    };
}

// Auto-load on script load
if (typeof window !== 'undefined') {
    loadAllData();
}
