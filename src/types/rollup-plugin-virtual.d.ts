// src/types/rollup-plugin-virtual.d.ts
declare module "@rollup/plugin-virtual" {
  import type { Plugin } from "rollup";
  const virtual: (modules: Record<string, string>) => Plugin;
  export default virtual;
}
