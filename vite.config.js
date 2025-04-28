import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default ({ mode, envDir, prefixes }) => {
  const env = loadEnv(mode, process.cwd());
  // console.log("env: ", env.VITE_PROXY_URL);

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_PROXY_URL,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
};