import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function copyImages() {
  try {
    const sourceDir = join(__dirname, '../images');
    const destDir = join(__dirname, '../public/images');
    
    // Crear directorio de destino si no existe
    await fs.ensureDir(destDir);
    
    // Copiar imágenes
    await fs.copy(sourceDir, destDir);
    
    console.log('✅ Imágenes copiadas correctamente a la carpeta pública');
  } catch (error) {
    console.error('❌ Error al copiar las imágenes:', error);
    process.exit(1);
  }
}

copyImages();
