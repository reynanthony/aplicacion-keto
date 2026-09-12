-- La tabla public.ingredientes tenia una policy RLS totalmente abierta
-- (cmd ALL, roles {public}, qual true, with_check null) que permitia a
-- cualquiera con la anon key leer, insertar, actualizar y borrar filas
-- sin restriccion. Verificado en auditoria 2026-09-12
-- (docs/AUDIT-REPORT.md, docs/archive/sql-legacy/README.md) que ningun
-- codigo del frontend ni de las Edge Functions consulta esta tabla: el
-- motor real de riesgo de ingredientes usa un archivo JS estatico
-- (web/public/app/data/keto-inspector-ingredientes.js). Se retira la
-- policy sin restriccion; con RLS ya habilitado y sin policies, el
-- acceso queda restringido a service_role. No se borra la tabla ni sus
-- datos (110 filas) por si se decide conectarla de verdad mas adelante.

DROP POLICY IF EXISTS ingredientes_all ON public.ingredientes;
