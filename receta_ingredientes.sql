-- Tabla de ingredientes de recetas
CREATE TABLE IF NOT EXISTS receta_ingredientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    receta_id UUID REFERENCES recetas(id) ON DELETE CASCADE,
    alimento_id UUID REFERENCES alimentos(id) ON DELETE SET NULL,
    nombre_alimento TEXT NOT NULL,
    cantidad_gramos DECIMAL(10,2) NOT NULL,
    orden INTEGER DEFAULT 0,
    fecha_creacion TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE receta_ingredientes ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para lectura pública
CREATE POLICY "receta_ingredientes_read" ON receta_ingredientes
    FOR SELECT USING (true);

-- Tabla de macros de recetas (para no calcular cada vez)
CREATE TABLE IF NOT EXISTS receta_macros (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    receta_id UUID UNIQUE REFERENCES recetas(id) ON DELETE CASCADE,
    calorias_totales INTEGER DEFAULT 0,
    proteinas_totales DECIMAL(10,2) DEFAULT 0,
    grasas_totales DECIMAL(10,2) DEFAULT 0,
    carbohidratos_totales DECIMAL(10,2) DEFAULT 0,
    porcion_gramos INTEGER DEFAULT 100,
    fecha_actualizacion TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE receta_macros ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para lectura pública
CREATE POLICY "receta_macros_read" ON receta_macros
    FOR SELECT USING (true);

-- Trigger para actualizar fecha_actualizacion
CREATE OR REPLACE FUNCTION update_fecha_actualizacion()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_actualizacion = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_receta_macros_update
    BEFORE UPDATE ON receta_macros
    FOR EACH ROW
    EXECUTE FUNCTION update_fecha_actualizacion();
