#!/bin/bash

# Script de instalación optimizado para Arch Linux

set -e

echo "🐧 Instalación optimizada para Arch Linux"
echo "=========================================="
echo ""

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm no encontrado"
    echo "Instala Node.js: sudo pacman -S nodejs npm"
    exit 1
fi

echo "✓ npm: $(npm --version)"
echo "✓ node: $(node --version)"
echo ""

# Ir al directorio
cd "$(dirname "$0")"

# Limpiar instalación anterior
echo "🧹 Limpiando instalación anterior..."
rm -rf node_modules package-lock.json

# Configurar npm para Arch Linux
echo "⚙️  Configurando npm..."
npm config set legacy-peer-deps true

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install --no-audit --no-fund

echo ""
echo "✅ ¡Instalación completada!"
echo ""
echo "Para iniciar en modo desarrollo:"
echo "  npm start"
echo ""
echo "Para compilar para producción:"
echo "  npm run build"
echo ""
