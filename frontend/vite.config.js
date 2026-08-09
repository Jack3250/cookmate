import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // .env 파일의 환경 변수 로드
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_PROXY_TARGET || 'http://localhost:8080'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/files/': {
          target: proxyTarget,
          changeOrigin: true,
        },
        '/recipe/': {
          target: proxyTarget,
          changeOrigin: true,
        },
        '/users/': {
          target: proxyTarget,
          changeOrigin: true,
        },
        '/common/': {
          target: proxyTarget,
          changeOrigin: true,
        },
        '/menu/': {
          target: proxyTarget,
          changeOrigin: true,
        }
      }
    }
  }
})
