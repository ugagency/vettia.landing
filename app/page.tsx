import IntroScreen from '@/components/IntroScreen'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Vetores from '@/components/Vetores'
import Diferenciais from '@/components/Diferenciais'
import Fundador from '@/components/Fundador'
import CtaFinal from '@/components/CtaFinal'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <IntroScreen />
      <Navbar />
      <main>
        <Hero />
        <Vetores />
        <Diferenciais />
        <Fundador />
        <CtaFinal />
      </main>
      <Footer />
    </>
  )
}
