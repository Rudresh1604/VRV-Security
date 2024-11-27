import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy `/users` requests to your backend
      "/users": {
        target: "http://localhost:5000", // Your backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users/, "/users"),
      },
    },
  },
});
