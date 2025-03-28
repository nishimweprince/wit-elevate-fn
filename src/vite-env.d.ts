/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_URL_SERVER_URL: string
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 