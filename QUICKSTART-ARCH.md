# 🚀 INICIO RÁPIDO - Arch Linux

## ✅ Instalación Completada

La aplicación **Código Vital** ya está instalada y lista para usar.

## 🎯 Ejecutar la Aplicación

### Opción 1: Script de inicio (Recomendado)

```bash
cd /home/fabian/Proyectos/Cartas
chmod +x run.sh
./run.sh
```

### Opción 2: Comando directo

```bash
cd /home/fabian/Proyectos/Cartas
npm start
```

## ⏳ Primera Ejecución

- La primera vez tardará ~30 segundos en compilar React
- Se abrirá una ventana de Electron con la aplicación
- Las próximas ejecuciones serán más rápidas

## 🎮 Funcionalidades

✓ **Modo Quiz**: Practica respondiendo preguntas sobre seguridad clínica
✓ **Ver Cartas**: Explora todas las 80 cartas (40 azules + 40 rojas)
✓ **Estadísticas**: Sigue tu progreso en tiempo real
✓ **Progreso Guardado**: Tu puntuación se guarda automáticamente

## 🛠️ Otros Comandos

```bash
# Solo compilar React (sin ejecutar)
npm run react-build

# Limpiar compilación
rm -rf build node_modules

# Reinstalar dependencias
npm install
```

## ⚠️ Si Tienes Problemas

1. **La aplicación no inicia**:
   ```bash
   npm install
   npm start
   ```

2. **Puerto 3000 ya en uso**:
   ```bash
   # Encuentra y mata el proceso
   lsof -ti:3000 | xargs kill -9
   npm start
   ```

3. **Errores de módulos**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## 📧 Verifica que todo está correcto

```bash
cd /home/fabian/Proyectos/Cartas
npm list electron
npm list react
```

---

**¡Disfruta practicando con Código Vital! 🏥**
