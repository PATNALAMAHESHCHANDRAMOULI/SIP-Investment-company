import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Calculator from './components/Calculator'
import StatsBar from './components/StatsBar'
import ContentSection from './components/ContentSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <Hero />
      <Calculator />
      <StatsBar />
      <ContentSection />
      <Footer />
    </div>
  )
}
