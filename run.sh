#!/bin/bash

# Script para ejecutar Código Vital en Arch Linux

echo "🚀 Iniciando CÓDIGO VITAL..."
echo ""

cd "$(dirname "$0")"

# Verificar que node_modules existe
if [ ! -d "node_modules" ]; then
    echo "❌ node_modules no encontrado"
    echo "Ejecuta primero: npm install"
    exit 1
fi

# Iniciar la aplicación
echo "⏳ Iniciando aplicación (primera vez puede tardar ~30 segundos)..."
echo ""
npm start
