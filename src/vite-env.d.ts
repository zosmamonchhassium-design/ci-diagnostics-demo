/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_REPORT_LABEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
