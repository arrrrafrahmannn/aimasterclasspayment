import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({mode})=>({
  plugins:[react()],
  base:mode==='pages'?'/aimasterclasspayment/':'/',
  build:{outDir:mode==='pages'?'docs':'dist/client'},
  ...(mode==='pages'?{define:{'import.meta.env.VITE_PAYMENTS_API':JSON.stringify('https://ektu-ai-payment.sunshinyjuice1.chatgpt.site/api/payments')}}:{})
}));
