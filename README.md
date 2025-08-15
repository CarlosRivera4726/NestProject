<p align="center">
<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>

</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

````bash
# development
$ npm run start

# watch mode
$ npm run start:dev

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descripción

Repositorio base de una aplicación NestJS (TypeScript) con Prisma ya configurado en el proyecto. Este README resume lo más importante para empezar rápidamente en español.

## Dependencias principales

Las dependencias clave que este proyecto suele usar (ver `package.json` para versiones exactas):

- @nestjs/core, @nestjs/common, @nestjs/platform-express (NestJS)
- typescript, ts-node, ts-node-dev (desarrollo)
- prisma (dev), @prisma/client (runtime)
- pg (driver de PostgreSQL)
- jest / @nestjs/testing (tests)

Si falta alguna dependencia al ejecutar el proyecto, instálala con `npm install`.

## Prisma + PostgreSQL (configuración)

Este proyecto incluye Prisma (ver `prisma/schema.prisma`). Usamos PostgreSQL como base de datos. Pasos mínimos para configurar la BD local y Prisma:

1. Crear un archivo `.env` en la raíz del proyecto.
2. Añadir la variable `DATABASE_URL` con la connection string de PostgreSQL (ejemplo abajo).
3. Generar el cliente de Prisma y ejecutar migraciones:

```powershell
npx prisma generate
npx prisma migrate dev --name init
````

Ejemplo de connection string (ajusta usuario, contraseña, host, puerto y base de datos):

```text
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

Ejemplo concreto local:

```text
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/mydb?schema=public"
```

Nota: Prisma usa la variable `DATABASE_URL` en `prisma/schema.prisma`. Asegúrate de crear la base de datos `mydb` en Postgres o usar una existente.

## Crear el archivo .env

En la raíz del proyecto crea un archivo llamado `.env` y pega la connection string. Ejemplo mínimamente requerido:

```text
DATABASE_URL="postgresql://postgres:password@localhost:5432/nestproject?schema=public"
```

Protege tus credenciales y no las subas al control de versiones (añade `.env` a `.gitignore`).

## Scripts útiles (npm)

Comandos típicos incluidos en proyectos NestJS:

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

## Notas y buenas prácticas

- Revisa `prisma/schema.prisma` para ver los modelos y la configuración del esquema.
- Si trabajas con Docker, puedes levantar un contenedor Postgres y usar la connection string hacia ese contenedor.
- Mantén secretos fuera del repositorio; usa variables de entorno o un secret manager en producción.

## Recursos

- Documentación NestJS: https://docs.nestjs.com
- Prisma: https://www.prisma.io/docs

## Licencia

Proyecto generado desde el starter de NestJS. Revisa el archivo LICENSE para detalles.
