// Tipagem global para o gtag.js do Google Analytics 4.
export {}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}
