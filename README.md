# 🎉 Gestor de Eventos con React + TypeScript

## 📋 Descripción

Aplicación para gestión de eventos que permite:
- Crear eventos con nombre, categoría, precio, fechas y opción pet-friendly
- Visualizar eventos en formato de tarjetas
- Filtrar por categoría y eventos pet-friendly
- Editar y eliminar eventos existentes
- Persistencia de datos en localStorage

## ✨ Características principales

- **Interfaz intuitiva** con formulario en modal
- **Validación en tiempo real** de formularios
- **Animaciones fluidas** con Framer Motion
- **Diseño responsive** para todos los dispositivos
- **Persistencia de datos** con localStorage
- **Tipado seguro** con TypeScript

## 🛠 Tecnologías utilizadas

- React 19
- TypeScript 4.9+
- Vite 4.0+
- React Date Picker 4.8+
- Framer Motion 10.0+
- CSS Modules

## 🚀 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/gestor-eventos.git
cd gestor-eventos
```

2. Instalacion
```bash
npm install
# o
yarn install
```

3. Iniciar Aplicacion
```bash
npm run dev
# o
yarn dev
```
## Estructura del proyecto

src/
├── components/
│   ├── EventCard.tsx      # Componente de tarjeta de evento
│   ├── EventForm.tsx      # Formulario de evento
│   ├── EventList.tsx      # Listado de eventos
│   ├── FilterBar.tsx      # Componente de filtros
│   └── Modal.tsx          # Modal reusable
├── hooks/
│   └── useEvents.ts       # Lógica de gestión de eventos
├── styles/
│   └── global.css         # Estilos globales
├── types/
│   └── event.ts           # Tipos de TypeScript
├── utils/
│   ├── storage.ts         # Funciones para localStorage
│   └── validation.ts      # Validaciones de formulario
├── App.tsx                # Componente principal
└── index.tsx               # Punto de entrada
