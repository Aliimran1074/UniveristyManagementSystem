import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// No need for Node path or __dirname
export default defineConfig({
  plugins: [
    // React and Tailwind plugins required
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      "@": "/src",
    },
  },

  // Supported raw asset imports
  assetsInclude: ["**/*.svg", "**/*.csv"],
});