# 🏥 CÓDIGO VITAL - Banco de Cartas Clínicas Digitalizado

Aplicación de escritorio para digitalizar y practicar con las cartas clínicas del Banco de Cartas Clínicas "Código Vital". Incluye 40 cartas azules (riesgo leve) y 40 cartas rojas (riesgo crítico) con preguntas educativas sobre seguridad clínica.

## ✨ Características

- **Modo Quiz**: Responde preguntas y recibe retroalimentación inmediata
- **Ver Cartas**: Explora todas las cartas y sus contenidos en detalle
- **Estadísticas**: Seguimiento completo de tu desempeño
  - Precisión general
  - Preguntas respondidas y correctas
  - Análisis separado por tipo de carta (Azul/Roja)
  - Cartas con más intentos
- **Filtros**: Selecciona entre todas las cartas, solo azules o solo rojas
- **Progreso Guardado**: Tu avance se guarda automáticamente
- **Interfaz Moderna**: Diseño limpio e intuitivo con gradientes y animaciones

## 🚀 Instalación

### Requisitos
- Node.js 14+ y npm/yarn
- Git

### Pasos

1. **Clonar o descargar el proyecto**
```bash
cd /home/fabian/Proyectos/Cartas
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Instalar dependencia faltante para Electron**
```bash
npm install electron-is-dev --save-dev
npm install wait-on --save-dev
```

## 🎯 Uso

### Desarrollo (con hot-reload)
```bash
npm start
```

Este comando inicia automáticamente:
- React dev server en http://localhost:3000
- Aplicación Electron conectada al servidor

### Construir para producción
```bash
npm run build
```

### Empaquetar la aplicación (crear instalador)
```bash
npm run build
```

## 📁 Estructura del Proyecto

```
Cartas/
├── public/
│   ├── main.js              # Proceso principal de Electron
│   ├── preload.js           # Puente de seguridad entre procesos
│   ├── index.html           # HTML base
│   └── app-icon.png         # Icono de la aplicación
├── src/
│   ├── components/          # Componentes React
│   │   ├── Menu.js          # Menú principal
│   │   ├── QuizMode.js      # Modo quiz
│   │   ├── ViewMode.js      # Modo ver cartas
│   │   ├── CartaQuiz.js     # Componente individual de carta en quiz
│   │   ├── CartaView.js     # Componente individual de carta en vista
│   │   └── Statistics.js    # Estadísticas
│   ├── App.js               # Componente principal
│   ├── App.css              # Estilos del App
│   ├── index.js             # Punto de entrada React
│   ├── index.css            # Estilos globales
│   └── cartas.json          # Base de datos de cartas
├── package.json
└── README.md
```

## 🎮 Modo de Uso

### Menú Principal
- **Modo Quiz**: Practica respondiendo preguntas
- **Ver Cartas**: Explora todas las cartas en detalle
- **Estadísticas**: Revisa tu desempeño

### Quiz
1. Se presenta una carta con una pregunta clínica
2. Selecciona una opción (A, B o C)
3. Recibe retroalimentación inmediata indicando si es correcta
4. Se muestra la consecuencia según tu respuesta
5. Navega entre cartas con los botones anterior/siguiente
6. Filtra por tipo de carta (Azul/Roja)

### Estadísticas
- **Precisión General**: Porcentaje de aciertos
- **Respondidas**: Cartas respondidas de un total
- **Estadísticas por Tipo**: Análisis separado para cartas azules y rojas
- **Cartas Difíciles**: Muestra las cartas con más intentos
- **Reiniciar**: Opción para limpiar todo el progreso

## 📊 Estructura de Datos de Cartas

Cada carta contiene:
```json
{
  "id": 1,
  "numero": 1,
  "tipo": "azul",
  "categoria": "Riesgo Leve",
  "situacion": "Descripción de la situación clínica",
  "pregunta": "¿Qué debe hacerse?",
  "opciones": {
    "A": "Opción A",
    "B": "Opción B",
    "C": "Opción C"
  },
  "respuestaCorrecta": "B",
  "consecuenciaCorrecta": "Avanza 1 casilla extra.",
  "consecuenciaIncorrecta": "Retrocede 1 casilla."
}
```

## 🎨 Temas de Color

- **Azul**: #3b82f6 - Cartas de riesgo leve
- **Rojo**: #ef4444 - Cartas de riesgo crítico
- **Gradiente Primario**: #667eea → #764ba2
- **Verde**: #10b981 - Respuestas correctas
- **Gris**: #e5e7eb - Elementos neutrales

## 💾 Almacenamiento

El progreso se guarda automáticamente en:
- **Windows**: `C:\Users\[Usuario]\AppData\Roaming\Código Vital\quiz-progress.json`
- **macOS**: `~/Library/Application Support/Código Vital/quiz-progress.json`
- **Linux**: `~/.config/Código Vital/quiz-progress.json`

## 🔧 Tecnologías Utilizadas

- **React** 18.2.0 - Interfaz de usuario
- **Electron** 27.0.0 - Aplicación de escritorio
- **CSS3** - Estilos modernos
- **Node.js** - Runtime

## 📝 Contenido de Cartas

- **80 cartas totales**:
  - 40 Cartas Azules (Riesgo Leve)
  - 40 Cartas Rojas (Riesgo Crítico)

### Temas Cubiertos

- Identificación de pacientes
- Seguridad en medicamentos
- Equipos médicos
- Bioseguridad
- Procedimientos clínicos
- Comunicación sanitaria
- Y muchos más...

## 🐛 Troubleshooting

### La aplicación no inicia

1. Asegúrate de tener Node.js 14+ instalado: `node --version`
2. Reinstala las dependencias: `rm -rf node_modules && npm install`
3. Limpia la caché de npm: `npm cache clean --force`

### Puerto 3000 ocupado

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Errores de permisos en Linux

```bash
chmod +x /home/fabian/Proyectos/Cartas/public/main.js
```

## 📞 Soporte

Para reportar problemas o sugerencias, contacta con el equipo de desarrollo.

## 📄 Licencia

Todos los contenidos de las cartas clínicas son propiedad intelectual de sus autores originales.

---

**Versión**: 1.0.0  
**Última actualización**: Mayo 2026  
**Autor**: Sistema de Digitalización de Cartas Clínicas
