import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import WhyUs from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
