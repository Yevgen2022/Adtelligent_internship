// src/types/rollup-plugin-virtual.d.ts
declare module "@rollup/plugin-virtual" {
  import type { Plugin } from "rollup";
  // key: module id (e.g. "virtual:ads"), value: module source code
  const virtual: (modules: Record<string, string>) => Plugin;
  export default virtual;
}
