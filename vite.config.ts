// import tailwindcss from "@tailwindcss/vite";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";
//
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// });

// import tailwindcss from "@tailwindcss/vite";
// import { defineConfig, loadEnv } from "vite"
// import react from "@vitejs/plugin-react"
// import tsconfigPaths from "vite-tsconfig-paths"
// import svgr from "vite-plugin-svgr"
// import checker from "vite-plugin-checker"
// import Inspect from "vite-plugin-inspect"
// // import compression from "vite-plugin-compression"
// import { visualizer } from "rollup-plugin-visualizer"
// import virtual from "vite-plugin-virtual"
//
// const buildInfo = `export const buildTime = "${new Date().toISOString()}"`
//
// export default defineConfig(({ mode }) => ({
//
//     const env = loadEnv(mode, process.cwd(), "");
//     const adsOn = env.VITE_ADS_ENABLED === "true";
//
//     plugins: [
//         react(),
//         tailwindcss(),
//         tsconfigPaths(),
//         svgr(),
//         checker({ typescript: true }),
//         Inspect(),
//         virtual({ "virtual:build-info": buildInfo }),
//         {
//             ...viteCompression({algorithm: "brotliCompress"}),
//             apply: "build",
//             // compression({ algorithm: "brotliCompress", apply: "build" }),
//         },
//     ],
//     build: {
//         minify: "terser",
//         terserOptions: { compress: { drop_console: mode === "production" } },
//         rollupOptions: {
//             plugins: [
//                 visualizer({
//                     filename: "dist/bundle-stats.html",
//                     gzipSize: true,
//                     brotliSize: true,
//                 }),
//             ],
//         },
//     },
// }))



/// <reference types="node" />
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import checker from "vite-plugin-checker";
import Inspect from "vite-plugin-inspect";
import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression";
import virtual from "@rollup/plugin-virtual";

const buildInfoCode = `export const buildTime = "${new Date().toISOString()}";`;

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");         // читаємо .env*
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

