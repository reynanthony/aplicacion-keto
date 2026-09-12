-- =============================================
-- EJERCICIOS POR CATEGORÍA
-- Crear tabla ejercicios y poblar con datos
-- =============================================

-- Crear tabla ejercicios
CREATE TABLE IF NOT EXISTS public.ejercicios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(150) NOT NULL,
    categoria VARCHAR(50),
    musculos_trabajados TEXT,
    equipo_necesario TEXT,
    nivel VARCHAR(20) DEFAULT 'principiante',
    calorias_estimadas_por_minuto DECIMAL(5,2),
    instrucciones TEXT,
    activo BOOLEAN DEFAULT TRUE
);

-- Asegurar RLS
ALTER TABLE public.ejercicios ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "ejercicios_all" ON public.ejercicios;
CREATE POLICY "ejercicios_all" ON public.ejercicios FOR ALL USING (true);

-- PECHO
INSERT INTO public.ejercicios (nombre, categoria, musculos_trabajados, equipo_necesario, nivel, calorias_estimadas_por_minuto, instrucciones) VALUES
('Press de banca con barra', 'pecho', 'pectoral mayor, tríceps, hombro anterior', 'barra, banco', 'intermedio', 8.5, '1. Acuéstate en banco con pies en suelo. 2. Agarra barra más ancho que hombros. 3. Baja barra a pecho medio. 4. Empuja hacia arriba hasta extensión completa.'),
('Press de banca inclinado', 'pecho', 'pectoral superior, tríceps, delta anterior', 'barra, banco inclinado', 'intermedio', 9.0, '1. Ajusta banco a 30-45 grados. 2. Baja barra a pecho superior. 3. Empuja hacia arriba. 4. Controla el descenso.'),
('Press de banca con mancuernas', 'pecho', 'pectoral mayor, tríceps', 'mancuernas, banco', 'principiante', 7.5, '1. Acuéstate con mancuernas en pecho. 2. Empuja ambas hacia arriba. 3. Baja controladamente. 4. Mantén core activado.'),
('Flexiones de brazos', 'pecho', 'pectoral, tríceps, core', 'ninguno', 'principiante', 6.0, '1. Posición de планк con manos en suelo. 2. Baja pecho hacia suelo. 3. Empuja hacia arriba. 4. Mantén cuerpo en línea recta.'),
('Flexiones diamante', 'pecho', 'tríceps, pectoral interior', 'ninguno', 'intermedio', 7.0, '1. Manos forman diamante bajo pecho. 2. Baja cuerpo manteniendo codos pegados. 3. Empuja hacia arriba. 4. Enfócate en tríceps.'),
('Aperturas con mancuernas', 'pecho', 'pectoral mayor', 'mancuernas, banco', 'intermedio', 6.5, '1. Acuéstate con brazos extendidos arriba. 2. Abre brazos en arco hacia abajo. 3. Siente estirón en pecho. 4. Vuelve a posición inicial.'),
('Fondos en paralelas', 'pecho', 'pectoral inferior, tríceps', 'paralelas', 'avanzado', 9.5, '1. Agárrate a barras paralelas. 2. Desciende hasta codos a 90 grados. 3. Empuja hacia arriba. 4. Mantén cuerpo recto.'),
('Chest fly en máquina', 'pecho', 'pectoral mayor', 'máquina chest fly', 'principiante', 6.0, '1. Ajusta peso y posición. 2. Empuja agarres hacia adelante. 3. Controla el movimiento. 4. Regresa lentamente.');

-- ESPALDA
INSERT INTO public.ejercicios (nombre, categoria, musculos_trabajados, equipo_necesario, nivel, calorias_estimadas_por_minuto, instrucciones) VALUES
('Dominadas', 'espalda', 'dorsal ancho, bíceps, antebrazo', 'barra de dominadas', 'avanzado', 10.0, '1. Cuelga de barra con agarre pronado. 2. Tira hacia arriba hasta barbilla sobre barra. 3. Baja controladamente. 4. Evita balanceo.'),
('Jalón al pecho', 'espalda', 'dorsal ancho, bíceps', 'máquina polea', 'principiante', 7.0, '1. Siéntate y agarra barra amplia. 2. Tira hacia pecho bajo. 3. Aprieta dorsales abajo. 4. Suelta lentamente.'),
('Remo con barra', 'espalda', 'dorsal, romboides, bíceps', 'barra, pesa rusa', 'intermedio', 8.5, '1. Inclínate hacia adelante con espalda plana. 2. Agarra barra y tira hacia abdomen. 3. Aprieta escápulas. 4. Baja controladamente.'),
('Remo con mancuerna', 'espalda', 'dorsal, romboides', 'mancuerna, banco', 'principiante', 6.5, '1. Apóyate en banco con una mano. 2. Tira mancuerna hacia cadera. 3. Aprieta espalda arriba. 4. Baja controladamente.'),
('Pullover con mancuerna', 'espalda', 'dorsal ancho, pectoral', 'mancuerna, banco', 'intermedio', 6.0, '1. Acuéstate con mancuerna sobre pecho. 2. Baja detrás de cabeza manteniendo codos suaves. 3. Regresa a posición inicial. 4. Controla el movimiento.'),
('Polea baja al pecho', 'espalda', 'dorsal, bíceps', 'máquina polea', 'principiante', 7.0, '1. Agarra cuerda en polea baja. 2. Tira hacia abajo apretando dorsales. 3. Separa manos al final. 4. Controla retorno.'),
('Peso muerto', 'espalda', 'dorsal, glúteos, isquiotibiales', 'barra', 'avanzado', 10.0, '1. Posición pies bajo barra. 2. Agarra barra y sube con piernas. 3. Estira completamente arriba. 4. Baja manteniendo espalda plana.'),
('Hiperextensiones', 'espalda', 'erectores espinales, glúteos', 'banco de hiperextensión', 'principiante', 5.5, '1. Apóyate en banco a nivel de caderas. 2. Baja torso hacia suelo. 3. Sube apretando glúteos y espalda. 4. No hiperextiendas.');

-- PIERNAS
INSERT INTO public.ejercicios (nombre, categoria, musculos_trabajados, equipo_necesario, nivel, calorias_estimadas_por_minuto, instrucciones) VALUES
('Sentadilla con barra', 'piernas', 'cuádriceps, glúteos, isquiotibiales', 'barra, rack', 'intermedio', 9.0, '1. Barra en trapecio, pies más ancho que hombros. 2. Baja sentadilla hasta muslos paralelos. 3. Sube empujando talones. 4. Mantén rodillas sobre pies.'),
('Sentadilla búlgara', 'piernas', 'cuádriceps, glúteos', 'banco, mancuernas', 'intermedio', 8.0, '1. Pie trasero en banco. 2. Baja hasta rodilla casi toca suelo. 3. Empuja hacia arriba. 4. Alterna piernas.'),
('Prensa de piernas', 'piernas', 'cuádriceps, glúteos', 'máquina prensa', 'principiante', 7.5, '1. Siéntate con pies en plataforma. 2. Baja peso flexionando rodillas. 3. Empuja sin bloquear rodillas. 4. Controla el descenso.'),
('Zancadas caminando', 'piernas', 'cuádriceps, glúteos, isquios', 'ninguno', 'principiante', 7.0, '1. Da paso largo hacia adelante. 2. Baja hasta rodilla trasera casi toca. 3. Avanza con otra pierna. 4. Mantén torso erguido.'),
('Zancadas inversas', 'piernas', 'cuádriceps, glúteos', 'ninguno', 'principiante', 6.0, '1. Da paso hacia atrás. 2. Baja hasta rodilla trasera casi toca. 3. Regresa a posición. 4. Alterna piernas.'),
('Extensión de cuádriceps', 'piernas', 'cuádriceps', 'máquina extensión', 'principiante', 5.5, '1. Siéntate conrodillas bajo almohadillas. 2. Extiende piernas completamente. 3. Aprieta cuádriceps arriba. 4. Baja controladamente.'),
('Curl de isquiotibiales', 'piernas', 'isquiotibiales', 'máquina curl', 'principiante', 5.0, '1. Acuéstate boca abajo. 2. Curl hacia glúteos. 3. Aprieta isquios arriba. 4. Baja lentamente.'),
('Elevación de pantorrillas', 'piernas', 'gemelos', 'máquina o escalón', 'principiante', 4.5, '1. Pies en borde de escalón. 2. Sube sobre puntas. 3. Aprieta gemelos arriba. 4. Baja lentamente.'),
('Sentadilla sumo', 'piernas', 'aductores, cuádriceps, glúteos', 'kettlebell o mancuerna', 'intermedio', 8.0, '1. Pies muy anchos, puntas hacia afuera. 2. Baja como sentadilla. 3. Sube empujando talones. 4. Mantén pecho arriba.'),
('Hip thrust', 'piernas', 'glúteos, isquiotibiales', 'banco, barra', 'intermedio', 8.5, '1. Espalda en banco, barra sobre cadera. 2. Empuja cadera hacia arriba. 3. Aprieta glúteos arriba. 4. Baja controladamente.');

-- HOMBROS
INSERT INTO public.ejercicios (nombre, categoria, musculos_trabajados, equipo_necesario, nivel, calorias_estimadas_por_minuto, instrucciones) VALUES
('Press militar con barra', 'hombros', 'deltoides anterior y medio, tríceps', 'barra, rack', 'intermedio', 8.0, '1. Barra en clavículas. 2. Presiona arriba sin arquear espalda. 3. Baja controladamente. 4. Mantén core activado.'),
('Press Arnold', 'hombros', 'deltoides anterior, medio y posterior', 'mancuernas', 'intermedio', 7.5, '1. Empezar con palmas hacia ti. 2. Gira mientras subes. 3. Termina con palmas hacia afuera. 4. Invierte el movimiento.'),
('Elevaciones laterales', 'hombros', 'deltoides medio', 'mancuernas', 'principiante', 5.5, '1. Brazos al lado con ligero flex. 2. Eleva hacia lados hasta平行. 3. Aprieta arriba. 4. Baja lentamente.'),
('Elevaciones frontales', 'hombros', 'deltoides anterior', 'mancuernas', 'principiante', 5.0, '1. Brazos al frente con codos suaves. 2. Eleva hasta altura de hombros. 3. Aprieta arriba. 4. Baja controladamente.'),
('Face pulls', 'hombros', 'deltoides posterior, romboides', 'cuerda polea', 'intermedio', 6.0, '1. Cuerda en polea alta. 2. Tira hacia cara separando manos. 3. Aprieta escápulas. 4. Regresa lentamente.'),
('Pájaros con mancuernas', 'hombros', 'deltoides posterior', 'mancuernas, banco inclinado', 'principiante', 5.0, '1. Inclínate hacia adelante sobre banco. 2. Brazos colgando. 3. Eleva hacia lados apretando espalda. 4. Baja lentamente.'),
('Encogimientos', 'hombros', 'trapecio', 'mancuernas o barra', 'principiante', 5.5, '1. Hombros arriba como encogimiento. 2. Aprieta trapecios. 3. Mantén 1 segundo. 4. Baja lentamente.');

-- BRAZOS
INSERT INTO public.ejercicios (nombre, categoria, musculos_trabajados, equipo_necesario, nivel, calorias_estimadas_por_minuto, instrucciones) VALUES
('Curl con barra', 'brazos', 'bíceps', 'barra o mancuernas', 'principiante', 6.0, '1. Brazos al frente, codos fijos. 2. Curl hacia hombros. 3. Aprieta bíceps arriba. 4. Baja controladamente.'),
('Curl martillo', 'brazos', 'bíceps braquial, antebrazo', 'mancuernas', 'principiante', 5.5, '1. Agarre neutral (martillo). 2. Curl hacia hombros. 3. Aprieta abajo. 4. Alterna o simultáneo.'),
('Curl concentración', 'brazos', 'bíceps', 'mancuerna, banco', 'principiante', 5.0, '1. Sentado con codo en muslo. 2. Curl mancuerna hacia hombro. 3. Aprieta bíceps. 4. Baja lentamente.'),
('Press francés', 'brazos', 'tríceps', 'barra o mancuerna', 'intermedio', 6.0, '1. Acostado, barra sobre pecho. 2. Baja hacia frente de cabeza. 3. Extiende hacia arriba. 4. Mantén codos fijos.'),
('Extensión de tríceps en polea', 'brazos', 'tríceps', 'cuerda polea alta', 'principiante', 5.5, '1. Cuerda en polea alta. 2. Tira hacia abajo separando manos. 3. Extiende completamente. 4. Aprieta tríceps abajo.'),
('Fondos de tríceps en banco', 'brazos', 'tríceps', 'banco o silla', 'principiante', 6.0, '1. Manos en banco detrás. 2. Bajar bajando codos a 90 grados. 3. Empuja hacia arriba. 4. Mantén espalda cerca del banco.'),
('Patada de tríceps', 'brazos', 'tríceps', 'mancuerna', 'principiante', 5.0, '1. En cuatro puntos, brazo doblado atrás. 2. Extiende hacia atrás. 3. Aprieta tríceps arriba. 4. Baja controladamente.');

-- CORE
INSERT INTO public.ejercicios (nombre, categoria, musculos_trabajados, equipo_necesario, nivel, calorias_estimadas_por_minuto, instrucciones) VALUES
('Plancha frontal', 'core', 'abdomen, oblicuos, espalda', 'ninguno', 'principiante', 5.0, '1. Antebrazos y puntas de pies. 2. Cuerpo en línea recta. 3. Aprieta abdomen. 4. Mantén 30-60 segundos.'),
('Plancha lateral', 'core', 'oblícuos, abdomen', 'ninguno', 'principiante', 5.5, '1. Apóyate en antebrazo y lado del pie. 2. Cuerpo en línea recta. 3. Aprieta oblicuos. 4. Alterna lados.'),
('Crunch abdominal', 'core', 'abdomen recto', 'ninguno', 'principiante', 4.5, '1. Acostado boca arriba. 2. Eleva hombros hacia rodillas. 3. Aprieta abdomen arriba. 4. Baja controladamente.'),
('Elevación de piernas', 'core', 'abdomen inferior', 'ninguno o barra', 'intermedio', 5.5, '1. Acostado boca arriba. 2. Eleva piernas hacia techo. 3. Baja controladamente sin tocar suelo. 4. Mantén core apretado.'),
('Bicycle crunch', 'core', 'abdomen, oblicuos', 'ninguno', 'principiante', 6.0, '1. Acostado, manos en nuca. 2. Eleva hombros y toca rodilla con codo opuesto. 3. Alterna pedaleando. 4. Mantén cuello relajado.'),
('Mountain climbers', 'core', 'abdomen, hombros, piernas', 'ninguno', 'intermedio', 8.0, '1. Posición de plancha alta. 2. Lleva rodilla al pecho alternando. 3. Aumenta velocidad. 4. Mantén cadera estable.'),
('Dead bug', 'core', 'abdomen profundo', 'ninguno', 'principiante', 4.0, '1. Acostado boca arriba con brazos arriba. 2. Extiende pierna opuesta y brazo. 3. Regresa y alterna. 4. Mantén腰 against suelo.'),
('Ab wheel roll out', 'core', 'abdomen, espalda, hombros', 'rueda abdominal', 'avanzado', 7.0, '1. Rodillas en suelo, rueda adelante. 2. Extiende cuerpo manteniendo abdomen apretado. 3. Regresa a posición inicial. 4. No dejes caer cadera.'),
('Russian twist', 'core', 'oblicuos', 'ninguno o peso', 'principiante', 5.5, '1. Sentado con rodillas dobladas. 2. Inclina torso hacia atrás. 3. Gira a cada lado. 4. Mantén pies elevados.');

-- CARDIO
INSERT INTO public.ejercicios (nombre, categoria, musculos_trabajados, equipo_necesario, nivel, calorias_estimadas_por_minuto, instrucciones) VALUES
('Correr', 'cardio', 'todo el cuerpo', 'ninguno o cinta', 'principiante', 10.0, '1. Postura erguida con brazos relajados. 2. Pie aterriza bajo cadera. 3. Ritmo constante. 4. Respira profundamente.'),
('Sprint interval', 'cardio', 'todo el cuerpo', 'pista o cinta', 'avanzado', 15.0, '1. Sprint máximo 20 segundos. 2. Descanso activo 40 segundos. 3. Repite 8-10 veces. 4. Calienta antes.'),
('Burpees', 'cardio', 'todo el cuerpo', 'ninguno', 'intermedio', 12.0, '1. De pie, salta hacia планк. 2. Flexión de pecho. 3. Salta pies hacia manos. 4. Salta con brazos arriba.'),
('Jump rope', 'cardio', 'pantorrillas, hombros', 'soga', 'principiante', 11.0, '1. Soga con doblez a la mitad. 2. Gira muñecas y salta apenas. 3. Mantén codos cerca del cuerpo. 4. Alterna pies o双脚 together.'),
('Cycling', 'cardio', 'piernas, core', 'bicicleta', 'principiante', 9.0, '1. Siéntate con pies en pedales. 2. Mantén cadencia constante. 3. Ajusta resistencia gradualmente. 4. Respira profundamente.'),
('Rowing', 'cardio', 'espalda, piernas, core', 'máquina remo', 'principiante', 10.0, '1. Piernas empujando primero. 2. Inclina torso hacia atrás. 3. Tira manijas al pecho. 4. Regresa en orden inverso.'),
('Swimming', 'cardio', 'todo el cuerpo', 'piscina', 'principiante', 9.0, '1. Braza libre o pecho. 2. Respiración lateral. 3. Patada continua. 4. Mantén cuerpo horizontal.'),
('Stair climbing', 'cardio', 'piernas, glúteos', 'escaleras o máquina', 'principiante', 9.5, '1. Paso completo en cada escalón. 2. Mantén ritmo constante. 3. Usa barandilla si necesitas. 4. Desciende con cuidado.');

SELECT 'Ejercicios insertados!' as status;
