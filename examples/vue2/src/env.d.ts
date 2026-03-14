/// <reference types="vite/client" />

declare module '*.vue' {
  import type { VueConstructor } from 'vue'

  const component: VueConstructor<unknown>

  export default component
}
