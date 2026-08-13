-- Corrige 2 fotos rotas mas en alimentos, encontradas tras la ronda anterior:
-- estas filas compartian por coincidencia la misma foto muerta que otras
-- filas ya arregladas (Aceite de oliva / Aceite de aguacate), pero el UPDATE
-- anterior apunto por id especifico y no las toco. Verificado 1 fila por
-- nombre antes de aplicar. URLs de reemplazo verificadas con curl (200).
UPDATE alimentos SET imagen_url = 'https://images.pexels.com/photos/3029520/pexels-photo-3029520.jpeg?auto=compress&cs=tinysrgb&w=400&h=300' WHERE nombre = 'Aguacate';
UPDATE alimentos SET imagen_url = 'https://images.pexels.com/photos/7953254/pexels-photo-7953254.jpeg?auto=compress&cs=tinysrgb&w=400&h=300' WHERE nombre = 'Aceite MCT';
