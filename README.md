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
