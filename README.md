<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descripción

Repositorio base de una aplicación NestJS (TypeScript) con Prisma ya configurado. Este README contiene lo esencial para arrancar y configurar la base de datos PostgreSQL.
version de node 22.11.0

## Dependencias principales

Revisa `package.json` para las versiones exactas; las dependencias clave son:

- @nestjs/core, @nestjs/common, @nestjs/platform-express
- typescript, ts-node, ts-node-dev (desarrollo)
- prisma (dev), @prisma/client (runtime)
- pg (driver de PostgreSQL)
- jest / @nestjs/testing (tests)

Si falta alguna dependencia, ejecuta:

```powershell
npm install
```

## Prisma + PostgreSQL (configuración)

Este proyecto usa Prisma como ORM y PostgreSQL como base de datos. Pasos mínimos para dejar todo listo:

1. Crear un archivo `.env` en la raíz del proyecto.
2. Añadir la variable `DATABASE_URL` con la connection string de PostgreSQL (ejemplos abajo).
3. Generar el cliente de Prisma y ejecutar migraciones.

Comandos:

```powershell
npx prisma generate
npx prisma migrate dev --name init
```

Ejemplo de connection string (ajusta usuario, contraseña, host, puerto y base de datos):

```text
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

Ejemplo local (para pruebas):

```text
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/mydb?schema=public"
```

Nota: crea la base de datos indicada (por ejemplo `mydb`) en tu instancia de Postgres antes de ejecutar las migraciones o usa una base de datos existente.

## Crear el archivo .env

En la raíz del proyecto crea un archivo llamado `.env` y pega la connection string. Ejemplo mínimo:

```text
DATABASE_URL="postgresql://postgres:password@localhost:5432/nestproject?schema=public"
```

No subas el `.env` al repositorio; añade `.env` a `.gitignore`.

## Scripts útiles (npm)

Comandos comunes que puedes usar:

```powershell
npm install           # instalar dependencias
npm run start         # iniciar en modo producción
npm run start:dev     # iniciar en modo desarrollo (watch)
npm run start:prod    # iniciar producción optimizada
npm run test          # tests unitarios
npm run test:e2e      # e2e tests
npm run test:cov      # coverage
```

## Pasos rápidos para empezar

1. Instala dependencias:

```powershell
npm install
```

2. Crea `.env` con `DATABASE_URL` apuntando a tu Postgres.

3. Genera Prisma y aplica migraciones:

```powershell
npx prisma generate
npx prisma migrate dev --name init
```

4. Inicia en modo desarrollo:

```powershell
npm run start:dev
```

## Buenas prácticas

- Revisa `prisma/schema.prisma` para ver los modelos y la configuración del esquema.
- Si trabajas con Docker, puedes levantar un contenedor Postgres y usar la connection string hacia ese contenedor.
- Mantén secretos fuera del repositorio; usa variables de entorno o un secret manager en producción.

## Recursos

- Documentación NestJS: https://docs.nestjs.com
- Prisma: https://www.prisma.io/docs

## Licencia

Revisa el archivo `LICENSE` para más detalles.
