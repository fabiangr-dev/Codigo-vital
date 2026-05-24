# Solución de Problemas - Arch Linux

## Problema: npm install falla

### Solución 1: Usar script de instalación optimizado (Recomendado)

```bash
cd /home/fabian/Proyectos/Cartas
chmod +x install-arch.sh
./install-arch.sh
```

### Solución 2: Instalación manual paso a paso

1. **Limpiar caché de npm:**
```bash
npm cache clean --force
```

2. **Configurar npm para Arch Linux:**
```bash
npm config set legacy-peer-deps true
npm config set strict-ssl false
```

3. **Instalar con flags específicos:**
```bash
npm install --no-audit --no-fund --verbose
```

## Alternativa: Usar yarn (si npm sigue fallando)

```bash
# Instalar yarn en Arch
sudo pacman -S yarn

# Instalar dependencias con yarn
cd /home/fabian/Proyectos/Cartas
yarn install
```

## Si siguen habiendo problemas con Electron:

```bash
# Instalar dependencias de Electron para Arch Linux
sudo pacman -S libxss gconf libnotify libappindicator-gtk3

# Luego reintentar instalación
npm install
```

## Verificar instalación

```bash
npm --version
node --version
ls node_modules | grep electron
```

## Ejecutar la aplicación

Una vez instalado:
```bash
npm start
```

---

Si npm install sigue presentando errores después de esto, ejecuta:
```bash
npm install --force --legacy-peer-deps
```
