
// <reference types="node" />
import virtual from "@rollup/plugin-virtual";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from "vite";
import checker from "vite-plugin-checker";
import compression from "vite-plugin-compression";
import Inspect from "vite-plugin-inspect";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

const buildInfoCode = `export const buildTime = "${new Date().toISOString()}";`;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ""); // читаємо .env*
  const adsOn = env.VITE_ADS_ENABLED === "true";

  return {
    plugins: [
      react(),
      tailwindcss(),
      tsconfigPaths(),
      svgr(),
      checker({ typescript: true }),
      Inspect(),
      virtual({ "virtual:build-info": buildInfoCode }), //віртуальний модуль build-info
      { ...compression({ algorithm: "brotliCompress" }), apply: "build" },
    ],
    resolve: {
      alias: {
        // перемикач реклами через env
        "virtual:ads": adsOn ? "/src/ads/real.ts" : "/src/ads/stub.ts",
      },
    },
    build: {
      minify: "terser",
      terserOptions: { compress: { drop_console: mode === "production" } },
      rollupOptions: {
        plugins: [
          visualizer({
            filename: "dist/bundle-stats.html",
            gzipSize: true,
            brotliSize: true,
          }),
        ],
      },
    },
  };
});
