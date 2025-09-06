import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        // Permite cualquier host (menos seguro)
        allowedHosts: true,
        // O para permitir solo hosts específicos (más seguro):
        // allowedHosts: ['50a57eb6321c.ngrok-free.app', 'tudominio.com'],
        hmr: {
          // Configuración adicional para HMR si es necesario
          host: 'localhost',
          protocol: 'ws'
        }
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
          '@images': path.resolve(__dirname, './images')
        }
      },
      plugins: [
        ViteImageOptimizer({
          png: {
            quality: 80,
          },
          jpeg: {
            quality: 80,
          },
          jpg: {
            quality: 80,
          },
          webp: {
            quality: 80,
          },
        }),
      ],
      build: {
        assetsInlineLimit: 0, // Esto asegura que las imágenes no se conviertan en base64
      }
    };
});
