-- Poblar receta_macros con macros calculados para cada receta
INSERT INTO receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT 
    r.id,
    COALESCE(SUM(
        CASE 
            WHEN a.calorias_100g IS NOT NULL THEN (ri.cantidad_gramos * a.calorias_100g / 100)
            ELSE 0
        END
    ), 0)::INTEGER as calorias,
    COALESCE(SUM(
        CASE 
            WHEN a.proteinas_100g IS NOT NULL THEN (ri.cantidad_gramos * a.proteinas_100g / 100)
            ELSE 0
        END
    ), 0)::DECIMAL(10,2) as proteinas,
    COALESCE(SUM(
        CASE 
            WHEN a.grasas_100g IS NOT NULL THEN (ri.cantidad_gramos * a.grasas_100g / 100)
            ELSE 0
        END
    ), 0)::DECIMAL(10,2) as grasas,
    COALESCE(SUM(
        CASE 
            WHEN a.carbohidratos_100g IS NOT NULL THEN (ri.cantidad_gramos * a.carbohidratos_100g / 100)
            ELSE 0
        END
    ), 0)::DECIMAL(10,2) as carbs
FROM recetas r
LEFT JOIN receta_ingredientes ri ON r.id = ri.receta_id
LEFT JOIN alimentos a ON ri.alimento_id = a.id
GROUP BY r.id
ON CONFLICT (receta_id) DO UPDATE SET
    calorias_totales = EXCLUDED.calorias_totales,
    proteinas_totales = EXCLUDED.proteinas_totales,
    grasas_totales = EXCLUDED.grasas_totales,
    carbohidratos_totales = EXCLUDED.carbohidratos_totales;
