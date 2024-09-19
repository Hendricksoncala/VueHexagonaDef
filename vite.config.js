import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const apiUrl = env.VITE_USE_TUNNEL === 'true'
    ? env.VITE_TUNNEL_URL
    : `http://${env.VITE_HOST || 'localhost'}:${env.VITE_PORT_BACKEND || '3001'}`;

  console.log('API URL:', apiUrl);

  return {
    plugins: [vue()],
    server: {
      host: env.VITE_HOST || 'localhost',
      port: env.VITE_PORT_FRONTEND || 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',  // El servidor backend
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''), // Reemplaza '/api' al principio de la ruta
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('Proxying request to:', proxyReq.getHeader('host') + proxyReq.path);
            });
          },
        },
      },
    },
  };
});