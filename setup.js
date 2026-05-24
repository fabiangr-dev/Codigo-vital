#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Configurando Código Vital...\n');

// Verificar Node.js
const nodeVersion = process.version;
console.log(`✓ Node.js detectado: ${nodeVersion}`);

// Crear directorio src si no existe
const srcDir = path.join(__dirname, 'src');
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir);
  console.log('✓ Directorio src creado');
}

// Crear directorio public si no existe
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
  console.log('✓ Directorio public creado');
}

console.log('\n📦 Instalando dependencias...');

try {
  execSync('npm install', { cwd: __dirname, stdio: 'inherit' });
  console.log('✓ Dependencias instaladas correctamente\n');
} catch (error) {
  console.error('✗ Error al instalar dependencias');
  process.exit(1);
}

console.log('✓ Configuración completada!\n');
console.log('Para iniciar la aplicación, ejecuta:');
console.log('  npm start\n');
console.log('Para construir para producción:');
console.log('  npm run build\n');
