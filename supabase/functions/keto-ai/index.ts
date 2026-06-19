// ==================== SUPABASE EDGE FUNCTION: Keto AI ====================
// Ubicación: supabase/functions/keto-ai/index.ts
// Ejecutar: supabase functions deploy keto-ai

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import OpenAI from 'https://esm.sh/openai@4.20.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY') ?? '',
    })

    const { action, data } = await req.json()

    switch (action) {
      case 'ping':
        return new Response(JSON.stringify({ status: 'ok', version: '2.1' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      
      case 'get_embedding':
        return await handleGetEmbedding(openai, data, supabaseClient)
      
      case 'generate_recipe':
        return await handleGenerateRecipe(openai, data, supabaseClient)
      
      case 'detect_critical':
        return await handleDetectCritical(openai, data, supabaseClient)
      
      case 'suggest_substitute':
        return await handleSuggestSubstitute(openai, data, supabaseClient)
      
      case 'analyze_recipe':
        return await handleAnalyzeRecipe(openai, data, supabaseClient)
      
      default:
        return new Response(JSON.stringify({ error: 'Acción no válida' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        })
    }
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})

async function handleGetEmbedding(openai, data, supabaseClient) {
  const { texto } = data
  
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: texto,
  })
  
  const embedding = response.data[0].embedding
  
  return new Response(JSON.stringify({ 
    embedding: embedding,
    model: 'text-embedding-3-small'
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function handleGenerateRecipe(openai, data, supabaseClient) {
  const { preferencias, evitar, mealType, macrosObjetivo } = data
  
  const objetivoMacros = macrosObjetivo || {
    calories: 400,
    netCarbs: 8,
    protein: 25,
    fat: 30
  }

  const prompt = `
  Eres un chef experto en dietas cetogénicas (keto).
  
  Contexto:
  - Objetivo de macros: ${objetivoMacros.calories} kcal, ${objetivoMacros.netCarbs}g net carbs, ${objetivoMacros.protein}g proteína, ${objetivoMacros.fat}g grasa
  - Tipo de comida: ${mealType || 'cualquiera'}
  - Preferencias del usuario: ${preferencias || 'ninguna específica'}
  - Evitar: ${evitar?.join(', ') || 'nada'}
  
  Genera una receta keto ORIGINAL, DELICIOSA y ÚNICA que:
  1. Tenga menos de ${objetivoMacros.netCarbs}g de net carbs por porción
  2. Use ingredientes comunes y accesibles
  3. Sea fácil de preparar
  4. Tenga un nombre creativo y atractivo
  5. Incluya exactamente 5-8 ingredientes principales
  6. Sea realista y práctica
  
  Devuelve SOLO JSON válido:
  {
    "nombre": "Nombre creativo de la receta",
    "mealType": "${mealType || 'cena'}",
    "ingredientes": [
      {"nombre": "ingrediente 1", "cantidad": "100g"},
      {"nombre": "ingrediente 2", "cantidad": "2 unidades"}
    ],
    "instrucciones": ["Paso 1...", "Paso 2...", "Paso 3..."],
    "tiempoPrep": 20,
    "dificultad": "fácil",
    "porciones": 2,
    "macrosPorcion": {
      "calories": ${objetivoMacros.calories},
      "protein": ${objetivoMacros.protein},
      "fat": ${objetivoMacros.fat},
      "netCarbs": ${objetivoMacros.netCarbs}
    },
    "tips": ["Consejo útil 1", "Consejo útil 2"]
  }
  
  IMPORTANTE: Devuelve SOLO el JSON, sin texto adicional.
  `

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Eres un chef keto experto. Genera recetas deliciosas.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.85,
    max_tokens: 1500,
    response_format: { type: 'json_object' }
  })

  const receta = JSON.parse(response.choices[0].message.content)

  return new Response(JSON.stringify({ 
    success: true,
    receta: receta,
    modelo: 'gpt-4o-mini'
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function handleDetectCritical(openai, data, supabaseClient) {
  const { ingrediente } = data
  
  const prompt = `
  Analiza si "${ingrediente}" es keto-friendly.
  
  Responde SOLO JSON válido:
  {
    "esCritico": true/false,
    "nivel": "critico/moderado/seguro",
    "carbsNetos100g": número,
    "motivo": "explicación breve",
    "alternativas": ["alternativa 1", "alternativa 2"]
  }
  `

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.2,
    response_format: { type: 'json_object' }
  })

  const resultado = JSON.parse(response.choices[0].message.content)

  return new Response(JSON.stringify(resultado), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function handleSuggestSubstitute(openai, data, supabaseClient) {
  const { ingrediente, contexto, tipo } = data
  
  const prompt = `
  Para "${ingrediente}" en ${contexto || 'una receta'},
  sugiere 3 alternativas keto que cumplan la misma función culinaria.
  
  Tipo de ingrediente: ${tipo || 'general'}
  
  Responde SOLO JSON válido:
  {
    "original": "${ingrediente}",
    "alternativas": [
      {"nombre": "alternativa 1", "proporcion": "1:1", "notas": "nota breve"},
      {"nombre": "alternativa 2", "proporcion": "1:1", "notas": "nota breve"},
      {"nombre": "alternativa 3", "proporcion": "1:1", "notas": "nota breve"}
    ]
  }
  `

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    response_format: { type: 'json_object' }
  })

  const resultado = JSON.parse(response.choices[0].message.content)

  return new Response(JSON.stringify(resultado), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function handleAnalyzeRecipe(openai, data, supabaseClient) {
  const { receta } = data
  
  const prompt = `
  Analiza la siguiente receta para dieta keto:
  Nombre: ${receta.nombre || 'Sin nombre'}
  Ingredientes: ${receta.ingredientes?.map(i => `${i.nombre} (${i.cantidad})`).join(', ') || 'No especificados'}
  
  Responde SOLO JSON válido:
  {
    "aptaKeto": true/false,
    "ketoScore": número del 0-100,
    "netCarbsTotal": número,
    "analisis": {
      "puntosFuertes": ["punto 1", "punto 2"],
      "problemas": ["problema 1"],
      "mejoras": ["mejora 1"]
    },
    "ingredientesCriticos": [
      {"nombre": "ingrediente", "problema": "explicación", "alternativa": "sustituto"}
    ],
    "consejos": ["consejo 1", "consejo 2"]
  }
  `

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5,
    response_format: { type: 'json_object' }
  })

  const resultado = JSON.parse(response.choices[0].message.content)

  return new Response(JSON.stringify(resultado), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
