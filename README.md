# 🌍 Agendador de Viajes

Una aplicación web moderna para planificar viajes, construida con **Next.js**, **TypeScript**, **Prisma** y **PostgreSQL**, que permite a los usuarios registrar y visualizar sus viajes alrededor del mundo.

## ✨ Demo en Vivo

¡Experimenta la aplicación en vivo!
[**Visita Planificador de Viajes**](https://travel-planner-gamma-green.vercel.app/)

## 📸 Capturas de Pantalla

Aquí tienes algunas vistas previas de la aplicación en funcionamiento:

### Página de Inicio

Comienza planificando tu viaje perfecto.
![Página de Inicio del Planificador de Viajes](images/landing-page.png)

### Panel de Control

Tu panel personalizado mostrando viajes recientes.
![Panel de Control del Planificador de Viajes](images/home.png)

### Detalles del Viaje

Vista detallada de un viaje específico, incluyendo un mapa de destinos.
![Página de Detalles del Viaje](images/trip-detail.png)

### Vista Global

Visualiza todos los países que has visitado en un globo 3D interactivo.
![Página del Globo con Países Visitados](images/globe-page.png)

---

## 🚀 Funcionalidades

- 🌐 Globo 3D interactivo para mostrar países visitados
- 🗺️ Almacena y gestiona ubicaciones de viajes
- 🧠 Construido con herramientas modernas: Next.js App Router, Prisma, TailwindCSS, base de datos PostgreSQL alojada en Supabase
- 🔒 Autenticación segura
- ☁️ Gestión de viajes basada en API

## 🛠️ Stack 

- **Frontend**: Next.js 14, React, TypeScript, TailwindCSS
- **Backend**: Node.js, Prisma
- **Base de Datos**: PostgreSQL gestionada mediante Prisma ORM
- **Despliegue**: Vercel
- **Otras Herramientas**: react-globe.gl, Lucide icons

## 📦 Dev

```bash
git clone [https://github.com/stvdn/travel_planner.git](https://github.com/stvdn/travel_planner.git)
cd travel_planner
npm install
mv envexample.txt .env
#NOTA: actualiza los valores del archivo .env
npx prisma generate
npx prisma db push
npm run dev
