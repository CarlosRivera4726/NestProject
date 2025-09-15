-- This is an empty migration.

DROP TRIGGER IF EXISTS "INSERT_ROLE" ON public."Persona";
DROP FUNCTION IF EXISTS public.func_insert_by_role();

CREATE OR REPLACE FUNCTION public.func_insert_by_role()
RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  IF NEW."role" = 'ADMIN' THEN
    INSERT INTO public."Administrador" ("personaId")
    VALUES (NEW."id")
    ON CONFLICT ("personaId") DO NOTHING;
  ELSIF NEW."role" = 'INSPECTOR' THEN
	INSERT INTO public."Inspector" ("personaId")
	VALUES (NEW."id")
	ON CONFLICT ("personaId") DO NOTHING;

 ELSIF NEW."role" = 'DEVELOPER' THEN
	INSERT INTO public."Administrador" ("personaId")
	VALUES (NEW."id")
	ON CONFLICT ("personaId") DO NOTHING;

  ELSIF NEW."role" = 'USUARIO' THEN
    INSERT INTO public."Usuario" ("personaId")
    VALUES (NEW."id")
    ON CONFLICT ("personaId") DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER "INSERT_ROLE"
AFTER INSERT ON public."Persona"
FOR EACH ROW
EXECUTE FUNCTION public.func_insert_by_role();