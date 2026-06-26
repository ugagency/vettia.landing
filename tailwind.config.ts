import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-base': '#080808',
        'brand-accent': '#7B5FEF',
        'brand-accent-dim': '#5B3FD4',
        'text-primary': '#F0F0F0',
        'text-secondary': '#666666',
        'text-on-accent': '#FAFAF8',
        'surface-base': '#111111',
        'surface-elevated': '#1A1A1A',
        'border-subtle': '#1E1E1E',
        'light-bg': '#F3F2EE',
        'light-text': '#0A0A0A',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
