import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // Proxy API requests starting with '/api' to the external server
//       '/api': {
//         target: 'https://timingspray.pk', // The external API URL
//         changeOrigin: true, // Needed for virtual hosted sites
//         rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix before forwarding the request
//       },
//     },
//   },
// });
