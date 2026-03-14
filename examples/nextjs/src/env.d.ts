// CSS module declarations
declare module '*.css' {
  const content: Record<string, string>
  export default content
}

// Global CSS side-effect import
declare module '*.css'
