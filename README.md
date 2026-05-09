<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descripción

API REST construida con **NestJS** (TypeScript) + **Prisma** + **PostgreSQL**. Incluye autenticación JWT, integración con MercadoPago para procesamiento de pagos, y Swagger para documentación.

**Requisito:** Node.js >= 22.11.0

## Qué contiene

- **Autenticación:** JWT + Passport (local y JWT strategies)
- **Base de datos:** PostgreSQL con Prisma ORM
- **Pagos:** Integración MercadoPago
- **Validación:** class-validator + Zod
- **Documentación:** Swagger/OpenAPI
- **Testing:** Jest (unitarios + e2e)
- **Code quality:** ESLint + Prettier

## Inicio rápido

### 1. Instalar dependencias

```powershell
npm install
```

(Prisma se genera automáticamente con `postinstall`)

### 2. Configurar variables de entorno

Crea archivo `.env` en la raíz con:
- `DATABASE_URL`: connection string PostgreSQL
- `MP_ACCESS_TOKEN`: token MercadoPago (si usas pagos)

**No subas `.env` al repo** (ya está en `.gitignore`)

### 3. Aplicar migraciones

```powershell
npx prisma migrate dev
```

Esto crea las tablas en PostgreSQL según `prisma/schema.prisma`.

### 4. Iniciar servidor

```powershell
npm run start:dev
```

Servidor corre en `http://localhost:3000` con Swagger en `/api/docs`.

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run start` | Producción |
| `npm run start:dev` | Desarrollo (watch mode) |
| `npm run start:debug` | Debug mode |
| `npm run start:prod` | Build optimizado |
| `npm run build` | Compilar TypeScript |
| `npm test` | Tests unitarios |
| `npm run test:watch` | Tests con watch |
| `npm run test:cov` | Coverage |
| `npm run test:e2e` | E2E tests |
| `npm run lint` | ESLint + fix |
| `npm run format` | Prettier |

## Estructura de proyecto

```
src/
├── modules/         # Módulos de negocio
├── guards/          # Autenticación (JWT, roles)
├── decorators/      # Decoradores custom
├── filters/         # Global error handlers
└── main.ts          # Entry point

prisma/
└── schema.prisma    # Modelos DB + migraciones
```

## Desarrollo local

**Con PostgreSQL local:**
```powershell
# Connection string típica
DATABASE_URL="postgresql://user:password@localhost:5432/nombre_db?schema=public"
```

**Con Docker:**
```powershell
docker run --name postgres -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres:latest
```

Luego crea la BD y aplica migraciones.

## Producción

- Build: `npm run build`
- Run: `npm run start:prod`
- Usa secret manager (no variables en .env)
- PostgreSQL con backups habilitados

## Recursos útiles

- [Documentación NestJS](https://docs.nestjs.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [MercadoPago API](https://developers.mercadopago.com)
