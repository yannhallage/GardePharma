// vite-env.d.ts

interface ImportMetaEnv {
    readonly VITE_API_URL_AUTH: string;
    readonly VITE_API_URL_PHARMA: string;
    readonly VITE_API_URL_ADMIN: string;
    readonly VITE_API_URL_USER: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
