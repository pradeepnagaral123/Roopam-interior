import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CtaSection from '../components/CtaSection'
import ScrollReveal from '../components/ScrollReveal'
import Parallax from '../components/Parallax'
import heroBg from '../assets/images/hero-bg.png'

const services = [
  { icon: 'fa-solid fa-house-chimney', title: 'Residential Design', desc: 'Beautiful, functional homes tailored to your lifestyle and taste.' },
  { icon: 'fa-solid fa-building', title: 'Commercial Design', desc: 'Innovative commercial spaces that inspire productivity and brand identity.' },
  { icon: 'fa-solid fa-pen-ruler', title: 'Space Planning', desc: 'Optimized layouts that maximize functionality and flow.' },
  { icon: 'fa-solid fa-couch', title: 'Furniture Design', desc: 'Custom furniture pieces crafted to complement your space perfectly.' },
  { icon: 'fa-solid fa-lightbulb', title: 'Lighting Design', desc: 'Strategic lighting solutions that transform ambiance and mood.' },
  { icon: 'fa-solid fa-palette', title: 'Color Consultation', desc: 'Expert color palettes that define the character of your space.' },
]

const portfolioItems = [
  { img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', title: 'Modern Luxury Villa', cat: 'Residential' },
  { img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80', title: 'Executive Office Suite', cat: 'Commercial' },
  { img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', title: 'Minimalist Penthouse', cat: 'Residential' },
]

export default function Home() {
  const imgRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const img = imgRef.current
    const content = contentRef.current
    if (!img) return
    const heroSection = img.closest('.hero')
    const onScroll = () => {
      const speed = 0.3
      const y = window.scrollY * speed
      img.style.transform = `translateY(${y}px) scale(1.1)`
      if (content) {
        const contentY = window.scrollY * speed * 0.5
        content.style.transform = `translateY(${contentY}px)`
        content.style.opacity = Math.max(0, 1 - window.scrollY / 700)
      }
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        document.body.style.overscrollBehaviorBlock = rect.top >= 0 ? 'contain' : ''
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.body.style.overscrollBehaviorBlock = ''
    }
  }, [])

  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <img ref={imgRef} src={heroBg} alt="Premium Interior Design" />
        </div>
        <div className="container">
          <div ref={contentRef} className="hero-content">
            <span className="hero-tag">Premium Interior Design Studio</span>
            <h1 className="hero-title">Designing Spaces That <span>Inspire</span> & Elevate</h1>
            <p className="hero-desc">We craft bespoke interiors that blend timeless elegance with modern sophistication, transforming your vision into extraordinary living spaces.</p>
            <div className="hero-actions">
              <Link to="/portfolio" className="btn btn-primary">View Our Work <i className="fas fa-arrow-right"></i></Link>
              <Link to="/book-consultation" className="btn btn-outline-light">Book Consultation</Link>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      <ScrollReveal>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What We Do</span>
            <h2 className="section-title">Our Premium Services</h2>
            <p className="section-subtitle">From concept to completion, we offer comprehensive interior design services tailored to your unique vision.</p>
          </div>
          <div className="services-grid">
            {services.slice(0, 3).map((s, i) => (
              <Parallax key={i} speed={0.18}>
              <div className="service-card">
                <div className="icon"><i className={s.icon}></i></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <Link to="/services" className="service-link">Learn More <i className="fas fa-arrow-right"></i></Link>
              </div>
              </Parallax>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/services" className="btn btn-outline">View All Services <i className="fas fa-arrow-right"></i></Link>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section className="section" style={{ background: 'var(--accent)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Portfolio</span>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">Explore our curated selection of signature projects that showcase our design excellence.</p>
          </div>
          <div className="portfolio-grid">
            {portfolioItems.map((item, i) => (
              <Parallax key={i} speed={0.15}>
              <div className="portfolio-item">
                <img src={item.img} alt={item.title} />
                <div className="overlay">
                  <p>{item.cat}</p>
                  <h3>{item.title}</h3>
                </div>
              </div>
              </Parallax>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/portfolio" className="btn btn-outline">View Full Portfolio <i className="fas fa-arrow-right"></i></Link>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section className="section">
        <div className="container">
          <div className="about-intro">
            <Parallax speed={0.12}>
            <div className="about-intro-image">
              <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80" alt="About Roopam Interiors" />
              <div className="experience-badge">
                <div className="number">15+</div>
                <div className="label">Years Experience</div>
              </div>
            </div>
            </Parallax>
            <Parallax speed={0.1}>
            <div className="about-intro-text">
              <span className="section-tag">About Us</span>
              <h2>Creating Timeless Interiors Since 2009</h2>
              <p>Roopam Interiors is a premier design studio dedicated to creating extraordinary spaces that blend beauty with functionality. Our team of award-winning designers brings passion and precision to every project.</p>
              <p>We believe that great design has the power to transform lives. Every space we create tells a unique story, reflecting the personality and aspirations of our clients.</p>
              <div className="about-features">
                <div className="about-feature-item">
                  <div className="icon"><i className="fas fa-check-circle"></i></div>
                  <h4>500+</h4>
                  <p>Projects Completed</p>
                </div>
                <div className="about-feature-item">
                  <div className="icon"><i className="fas fa-award"></i></div>
                  <h4>25+</h4>
                  <p>Design Awards</p>
                </div>
                <div className="about-feature-item">
                  <div className="icon"><i className="fas fa-users"></i></div>
                  <h4>50+</h4>
                  <p>Expert Designers</p>
                </div>
              </div>
            </div>
            </Parallax>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <CtaSection />
    </>
  )
}
