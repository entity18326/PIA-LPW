
# OdinMobile

**OdinMobile** es una aplicación web creada con React + TypeScript + Tailwind CSS que permite autenticar usuarios, proteger rutas, y gestionar paneles (dashboard) según rol de usuario. Ideal como punto de partida para construir aplicaciones con login, roles y control de acceso.

---

## 📌 Características

- **Autenticación basada en tokens** (JWT)
- Persistencia de sesión en `localStorage`
- Protección de rutas mediante componentes `<ProtectedRoute>` y `<PublicRoute>`
- Roles de usuario (Admin, Publisher, etc.) con redirección personalizada
- Contextos para tema (`ThemeContext`) y autenticación (`AuthContext`)
- Panel de Dashboard con lógica encapsulada
- Buenas prácticas en hooks, context, rutas y llamadas a API

---

## 🛠️ Tecnologías

- **React 18** + **TypeScript**
- **React Router v6**
- **Tailwind CSS**
- **Axios**
- **Context API** (`AuthContext`, `ThemeContext`)
- API REST con ASP.NET (para revalidar token, login, logout)

---

## 🚀 Instalación

Clona el repositorio y ejecuta:

```bash
git clone https://github.com/entity18326/PIA-LPW.git

# Para el backend, preferiblemente iniciarlo desde el Visual Studio 2022
cd back-end
cd OdinBackend
dotnet run

# Para el Frontend, instalar axios tambien en caso de ser necesario
cd front-end
npm install
npm run dev
# o npm run start (según tu configuración)
```

Esto iniciará tu app en `http://localhost:3000`.

---

## 🔐 Configuración de autenticación

La app espera un backend con estos endpoints:

- `POST /Auth/login` debe devolver un token JWT y datos del usuario.
- `GET /Auth/me` revalida el token y obtiene el usuario actual.

**Credenciales de ejemplo** (en base a la API creada):
```json
{
  "iD_Usuario": "123",
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "role": "Admin",
  "roleId": 1
}
```

---

## 🧩 Estructura

```
src/
├── axios/              # configuración de axios (headers, baseURL)
├── components/
│   ├── layout/         # Header / Footer
│   └── ui/             # componentes UI compartidos
├── contexts/
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── ReviewsPage.tsx
│   ├── ReviewDetail.tsx
│   ├── NewsPage.tsx
│   ├── NewsDetail.tsx
│   ├── ComparePage.tsx
│   ├── SearchPage.tsx
│   └── BrandPage.tsx
├── App.tsx             # rutas principales
└── index.tsx           # punto de arranque
```

---

## 📌 Uso

1. Ve a `/login`, ingresa usuario y contraseña.
2. Al autenticarse, se guarda token y usuario.
3. Se configura `axios` para incluir el token en cada petición.
4. Rutas protegidas requieren token válido, o redirigen a `/login`.
5. Al recargar, se revalida el token desde `AuthProvider`.
6. Cierre de sesión y redirige al login.

---

## ✅ To‑Do / Mejoras

- Validar mejor los datos parseados desde `localStorage`
- Manejar expiración/tipo de error al revalidar token
- Agregar rutas protegidas para otros roles (p.e. editor, publisher)
- Refactorizar estructuras como `roleId` para mayor claridad
- Mejorar estilos con componentes personalizados (Tailwind + React component library)

---

## 📄 Licencia

MIT © Miguel Lazarin

---

**Gracias por visitar OdínMobile!** Si te gustó el proyecto, deja una estrella ⭐️ y siéntete libre de dejar feedback o sugerencias.
