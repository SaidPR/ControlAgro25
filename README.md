# 🌱 ControlAgro 2025

**ControlAgro 2025** es una aplicación móvil multiplataforma diseñada para facilitar la gestión de operaciones agrícolas a gran escala, desde el control de asistencia de los trabajadores hasta el seguimiento detallado de la producción. El proyecto está desarrollado con React Native y organizado bajo el patrón **MVVM**, permitiendo escalabilidad y mantenibilidad.

🔗 **Descarga la última versión (APK) desde [GitHub Releases](https://github.com/SaidPR/ControlAgro25/releases)**  
🌐 **Visita la [Landing Page en Vercel](https://control-agro.vercel.app)**

---

## 📲 Funcionalidades Clave

- **Gestión de trabajadores** con contacto directo por llamada o WhatsApp.
- **Registro de producción agrícola diaria** (cubetas, cajas).
- **Historial de operaciones** y vistas por sección.
- **Roles de usuario** (admin actual, roles extendibles).
- **Autenticación segura** con Firebase.
- **Recuperación de contraseña** por email, WhatsApp o fecha de nacimiento.
- **Interfaz optimizada y adaptable** a dispositivos móviles y tablets.

---

## 🧠 Arquitectura del Proyecto

Organizado bajo el patrón **MVVM**:

```
CONTROLAGRO25/
│
├── assets/             # Recursos visuales (imágenes, íconos)
├── components/         # Componentes reutilizables (UI general)
├── models/             # Definición de modelos de datos
├── navigation/         # Configuración de rutas y navegación
├── services/           # Lógica de negocio y conexión con Firebase
├── viewmodels/         # Lógica de presentación dividida por módulo
│   ├── general/
│   ├── prod/
│   ├── reports/
│   ├── users/
│   └── workers/
├── views/              # Pantallas principales de la app
│   ├── general/
│   ├── prod/
│   ├── reports/
│   ├── users/
│   └── workers/
│
├── App.js              # Punto de entrada principal
├── index.js            # Inicialización de la app
├── package.json        # Dependencias y scripts
└── README.md           # Este archivo
```

---

## 🚀 Instalación y Ejecución

### 🔧 Requisitos

- Node.js y npm
- Expo CLI (`npm install -g expo-cli`)
- Emulador Android o dispositivo físico

### 🧪 Pasos para correr localmente

```bash
git clone https://github.com/SaidPR/ControlAgro25.git
cd ControlAgro25
npm install
expo start
```

Luego escanea el QR con la app de Expo Go en Android o ejecuta en emulador.

---

## 🛠️ Tecnologías Utilizadas

- **React Native** + **Expo**
- **Firebase** (auth + firestore)
- **React Navigation** (stack + drawer)
- **React Hooks** para control de estado
- **WhatsApp Linking**, **Camera**, **Image Picker**
- **MVVM** como patrón estructural

---

## 📦 Distribución

- 📦 **Releases:** El APK actualizado está disponible en la sección [GitHub Releases](https://github.com/SaidPR/ControlAgro25/releases).
- 🌐 **Landing Page:** Accesible en [https://control-agro.vercel.app](https://control-agro.vercel.app), permite descarga rápida y muestra capturas de pantalla.

---

## ✏️ Pendientes y Mejoras Futuras

- Implementación final del escaneo QR funcional.
- Sistema de reportes avanzados exportables (PDF/Excel).
- CRUD extendido para distintos roles de usuario.
- Panel web administrativo (futuro).

---

## 🤝 Colaboradores

- **Ramírez Rodríguez Manuel** – Coordinación general del proyecto.
- **Piñones Ramos Said Rafael** – Desarrollo y estructura web/móvil.

---

## 📬 Contacto

📧 ramoszaid5@gmail.com  
🔗 [GitHub @SaidPR](https://github.com/SaidPR)
