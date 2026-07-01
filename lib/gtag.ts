// Google Analytics 4 — configuração e eventos customizados.
// Propriedade GA4 da Vettia. Para trocar, ajustar apenas esta constante.
export const GA_MEASUREMENT_ID = 'G-Z8Y15JXNBK'

/**
 * Dispara um evento genérico no GA4 de forma segura (no-op no servidor ou
 * antes do gtag carregar).
 */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params ?? {})
}

/**
 * Conversão principal: clique em um CTA de WhatsApp (wa.me).
 * `location` identifica a origem do clique (ex.: 'hero', 'cta_final').
 */
export function trackWhatsAppClick(location: string): void {
  trackEvent('whatsapp_click', { location })
}

/**
 * Clique em um link de produto na home (ex.: 'frota360', 'autoquote').
 */
export function trackProductClick(product: string): void {
  trackEvent('product_click', { product })
}
