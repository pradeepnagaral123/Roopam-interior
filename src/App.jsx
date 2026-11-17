import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import LoadingScreen from './components/LoadingScreen'
import BrandProvider from './BrandProvider'
import { getBrand } from './brand'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Gallery from './pages/Gallery'
import Testimonials from './pages/Testimonials'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import BookConsultation from './pages/BookConsultation'

const routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/services', element: <Services /> },
  { path: '/portfolio', element: <Portfolio /> },
  { path: '/gallery', element: <Gallery /> },
  { path: '/testimonials', element: <Testimonials /> },
  { path: '/faq', element: <Faq /> },
  { path: '/contact', element: <Contact /> },
  { path: '/book-consultation', element: <BookConsultation /> },
]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const brand = getBrand(pathname)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.title = brand.title
  }, [brand.title])

  return (
    <BrandProvider brand={brand}>
      {loading && <LoadingScreen />}
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          {routes.map((route) => (
            <Route
              key={`${brand.path}${route.path}`}
              path={`${brand.path}${route.path === '/' ? '' : route.path}` || '/'}
              element={route.element}
            />
          ))}
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </BrandProvider>
  )
}
