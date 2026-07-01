import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import GsapProvider from '@/components/GsapProvider'
import { GA_MEASUREMENT_ID } from '@/lib/gtag'

export const metadata: Metadata = {
  title: 'Vettia — Software B2B para nichos específicos | Gestão de frotas, automação e desenvolvimento sob medida',
  description:
    'A Vettia constrói sistemas B2B para segmentos que o mercado genérico ignora. Frota360 para transportadoras, AutoQuote para fornecedores Vale e desenvolvimento com IA para PMEs locais em Betim e região.',
  openGraph: {
    title: 'Vettia — Software B2B para nichos específicos',
    description:
      'Sistemas para transportadoras, fornecedores Vale/Coupa e PMEs que precisam de tecnologia de verdade.',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vettia — Software B2B para nichos específicos',
    description:
      'Sistemas para transportadoras, fornecedores Vale/Coupa e PMEs que precisam de tecnologia de verdade.',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vettia Soluções em Tecnologia',
  foundingLocation: 'Betim, MG, Brasil',
  description:
    'Empresa brasileira de software B2B para segmentos específicos — transportadoras, fornecedores industriais e PMEs locais.',
  founder: {
    '@type': 'Person',
    name: 'Ulisses Gonçalves',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        {/* Google Analytics 4 */}
        <Script
          id="ga4-src"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        <GsapProvider />
        {children}
      </body>
    </html>
  )
}
