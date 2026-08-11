-- Limpieza: elimina alimentos duplicados por nombre (seed original con filas
-- repetidas, ya existian antes de esta sesion). Para cada grupo se conserva
-- la fila con imagen_url si existe, si no, se conserva una cualquiera.
-- Los 18 IDs y la regla de cual conservar fueron mostrados y aprobados
-- explicitamente por el usuario (2026-08-11).
DELETE FROM alimentos WHERE id IN (
  '48a5b929-5c07-4a68-9bc7-0c25d09c23f0', -- Aceite de coco
  '9b720de7-27d1-4d3b-9b03-6600e200aa58', -- Aguacate
  '8a837b85-4cc0-4c46-a2d5-f0fbf94937ec', -- Aguacate
  '7b0cef6e-a26c-49a4-93a8-e49856fd1dba', -- Carne molida 80/20
  '0758fadd-d169-4fab-b187-5e23deee4f1f', -- Crema de coco
  '74bf7c74-e077-4588-b713-9f4ff2aa0860', -- Grasa de cerdo
  '9a2b2217-7626-4523-8827-55409bd2f297', -- Grasa de pato
  'a4334f83-93a8-466c-9f4b-fa8e8b4c25d4', -- Huevo entero
  'd39d907b-db14-43b7-a429-9bfcfab818ea', -- Leche de coco entera
  '9c57098f-00c3-4878-91f2-d5f014fe7846', -- Mantequilla
  'c9ad53ef-aba5-440c-a26c-d945094f38a9', -- Mayonesa casera
  '9fd570ea-ecdd-474d-b9a6-1e5db9c44546', -- Olivas
  'd6262139-23e2-4abf-8251-c8131213ffa5', -- Olivas negras
  'd78e20a9-8694-4ffe-9162-4be96cd2de2c', -- Pechuga de pollo
  '460c3802-0d3d-4618-9aa6-4166862688b4', -- Queso crema
  '68709b6b-0a2c-429c-aaa2-e59f51eed0b9', -- Salmón
  'e2220cc2-deff-45ad-aeb6-bd23b7c3cd0a', -- Tahini
  'b80261b7-2c22-46f0-ad72-0b93d4099c22'  -- Yogur griego entero
);
