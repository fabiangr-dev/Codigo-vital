#!/bin/bash

# Script para instalar y ejecutar Código Vital

echo "🏥 Bienvenido a CÓDIGO VITAL"
echo "===================================="
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo "Por favor, descarga Node.js desde https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js instalado: $(node --version)"
echo "✓ npm instalado: $(npm --version)"
echo ""

# Ir al directorio del proyecto
cd "$(dirname "$0")"

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias"
    exit 1
fi

echo ""
echo "✓ ¡Todo listo!"
echo ""
echo "Ejecuta los siguientes comandos:"
echo ""
echo "  Modo desarrollo (con recarga automática):"
echo "  $ npm start"
echo ""
echo "  Compilar para producción:"
echo "  $ npm run build"
echo ""
