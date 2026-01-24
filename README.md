# AM Seguridad · Landing institucional (Next.js + .NET)

Migración de la landing a una arquitectura moderna y escalable:

- **Frontend**: Next.js (App Router) + Tailwind CSS + Framer Motion.
- **Backend**: ASP.NET Core Minimal API (.NET 8) con persistencia JSON.
- **Autogestión real**: el panel `/admin` permite editar textos, URLs de imágenes, novedades y recursos sin tocar código.

> El frontend consume el backend vía `NEXT_PUBLIC_API_BASE_URL`.

---

## Stack tecnológico

### Frontend

- **Next.js 14** (App Router, TypeScript).
- **Tailwind CSS** para estilos rápidos, consistentes y responsivos.
- **Framer Motion** para animaciones suaves y controladas por viewport.

### Backend

- **ASP.NET Core Minimal API (.NET 8)**.
- Persistencia simple y transparente en `backend/data/content.json`.
- Endpoints pensados para autogestión de contenido.

---

## Estructura del proyecto

```text
.
├─ app/
│  ├─ admin/page.tsx      # Panel de autogestión
│  ├─ layout.tsx          # Layout + metadata
│  ├─ page.tsx            # Landing principal
│  └─ globals.css         # Estilos globales + Tailwind
├─ components/
│  ├─ NavBar.tsx
│  ├─ SectionHeading.tsx
│  ├─ AnimatedSection.tsx
│  └─ cards.tsx
├─ lib/
│  ├─ api.ts              # Cliente HTTP hacia .NET
│  ├─ types.ts            # Tipos del dominio de contenido
│  └─ defaultContent.ts   # Fallback local si no hay API
├─ backend/
│  ├─ data/content.json
│  └─ src/AMSeguridad.Api
│     ├─ Program.cs
│     ├─ Models/LandingModels.cs
│     └─ Services/ContentStore.cs
├─ package.json
├─ tailwind.config.ts
├─ postcss.config.mjs
└─ .env.local.example
```

---

## Configuración de entorno

Copiá el ejemplo:

```bash
cp .env.local.example .env.local
```

Variable clave:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5050
```

---

## Ejecutar en local

### 1) Backend (.NET)

Desde la raíz del repo:

```bash
dotnet run --project backend/src/AMSeguridad.Api --urls http://0.0.0.0:5050
```

Health check:

```bash
curl http://localhost:5050/api/health
```

### 2) Frontend (Next.js)

```bash
npm install
npm run dev -- --hostname 0.0.0.0 --port 3000
```

Abrí:

- Landing: `http://localhost:3000/`
- Panel: `http://localhost:3000/admin`

---

## Autogestión: qué puede editar el cliente

El panel `/admin` permite:

- Cambiar **textos principales** (hero, contacto, servicios).
- Cambiar **URLs de imágenes** (hero, tecnología, novedades).
- Subir/editar **novedades**.
- Gestionar **recursos** (por ejemplo PDFs, enlaces operativos, fichas técnicas).
- Actualizar el contenido completo sin depender del proveedor.

Todo persiste en:

- `backend/data/content.json`

---

## API disponible

### Contenido completo

- `GET /api/content`
- `PUT /api/content`

### Novedades

- `POST /api/news`
- `PUT /api/news/{id}`
- `DELETE /api/news/{id}`

### Recursos

- `POST /api/resources`
- `PUT /api/resources/{id}`
- `DELETE /api/resources/{id}`

---

## Notas de arquitectura (visión senior)

Este enfoque deja una base clara para evolucionar a:

- Persistencia en base de datos (SQL Server / PostgreSQL).
- Autenticación y roles (admin, editor, comercial, RRHH).
- Integraciones (CRM, WhatsApp API, email transaccional, analítica).
- CI/CD con build separado de frontend y backend.

Si querés, en la próxima iteración lo convertimos en:

- Next.js en Vercel
- .NET en Azure App Service / Render
- DB + storage real para imágenes

---

## Autenticación y roles (MVP)

Se agregó un login simple por roles para proteger `/admin`:

- Ruta: `/login`
- Roles: `admin` y `empleado`
- Protección: el panel `/admin` requiere sesión válida en `sessionStorage`

### Credenciales demo

- **Admin**: `admin` / `Admin123*`
- **Empleado**: `empleado` / `Empleado123*`

> Esto es un MVP de frontend. La siguiente iteración recomendada es moverlo al backend .NET con JWT/cookies httpOnly y control de permisos por endpoint.

---

## Media y Cloudinary (WebP obligatorio)

Las imágenes se cargan desde **Cloudinary** y se convierten a WebP antes de publicar. Se recomienda usar el formato:

```
https://res.cloudinary.com/<cloud>/image/upload/f_webp,q_auto/v123/archivo
```

En el panel `/admin` hay un botón "Convertir a WebP" para normalizar URLs.

---

## Auditoría

Se requiere auditoría completa: quién editó, qué cambió y cuándo. Esto se implementará con una tabla de logs de auditoría en PostgreSQL.

---

## Backend .NET completo (PostgreSQL)

Se agregó un backend con **Entity Framework Core** y **PostgreSQL**:

- `AppDbContext` en `backend/src/AMSeguridad.Api/Data/AppDbContext.cs`
- Entidades en `backend/src/AMSeguridad.Api/Entities/`
- DTOs en `backend/src/AMSeguridad.Api/DTOs/`
- Servicios y controllers en `backend/src/AMSeguridad.Api/Services/` y `Controllers/`
- Middlewares: `ExceptionHandlingMiddleware` y `AuditMiddleware`
- Script SQL para crear la base: `backend/sql/schema.sql`

### Endpoints principales

- `POST /api/auth/login`
- `GET/PUT /api/content`
- `GET /api/audit`
- `GET/POST /api/users`
- `PUT /api/users/{id}/status`

### Base de datos

El archivo `backend/sql/schema.sql` contiene la estructura completa (usuarios, auditoría y contenido).Configurar conexión en `backend/src/AMSeguridad.Api/appsettings.json`.
