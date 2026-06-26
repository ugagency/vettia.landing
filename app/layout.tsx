import type { Metadata } from 'next'
import './globals.css'

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
