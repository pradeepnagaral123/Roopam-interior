import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CtaSection from '../components/CtaSection'
import ScrollReveal from '../components/ScrollReveal'
import Parallax from '../components/Parallax'
import heroBg from '../assets/images/Minimalist Green Wall Living Room.webp'
import { remote } from '../assets/images/remote'

const services = [
  { icon: 'fa-solid fa-house-chimney', title: 'Residential Design', desc: 'Beautiful, functional homes tailored to your lifestyle and taste.', img: remote.photo_1600607687939_ce8a6c25118c },
  { icon: 'fa-solid fa-building', title: 'Commercial Design', desc: 'Innovative commercial spaces that inspire productivity and brand identity.', img: remote.photo_1600573472550_8090b5e0745e },
  { icon: 'fa-solid fa-pen-ruler', title: 'Space Planning', desc: 'Optimized layouts that maximize functionality and flow.', img: remote.photo_1616486338812_3dadae4b4ace },
  { icon: 'fa-solid fa-couch', title: 'Furniture Design', desc: 'Custom furniture pieces crafted to complement your space perfectly.', img: remote.photo_1616594039964_ae9021a400a0 },
  { icon: 'fa-solid fa-lightbulb', title: 'Lighting Design', desc: 'Strategic lighting solutions that transform ambiance and mood.', img: remote.photo_1586023492125_27b2c045efd7 },
  { icon: 'fa-solid fa-palette', title: 'Color Consultation', desc: 'Expert color palettes that define the character of your space.', img: remote.photo_1600585154340_be6161a56a0c },
]

const portfolioItems = [
  { img: remote.photo_1600607687939_ce8a6c25118c, title: 'Modern Luxury Villa', cat: 'Residential' },
  { img: remote.photo_1600573472550_8090b5e0745e, title: 'Corporate Headquarters', cat: 'Commercial' },
  { img: remote.photo_1616486338812_3dadae4b4ace, title: 'Minimalist Penthouse', cat: 'Residential' },
  { img: remote.photo_1616594039964_ae9021a400a0, title: 'Boutique Hotel Lobby', cat: 'Hospitality' },
  { img: remote.photo_1586023492125_27b2c045efd7, title: 'Luxury Retail Store', cat: 'Retail' },
  { img: remote.photo_1600585154340_be6161a56a0c, title: 'Farmhouse Retreat', cat: 'Residential' },
]

const testimonials = [
  { text: '"Exceptional design and flawless execution. Our home has never looked better."', author: '— Priya Sharma, Mumbai', img: remote.photo_1580489944761_15a19d654956 },
  { text: '"Professional team, great attention to detail. Highly recommended for commercial projects."', author: '— Rahul Mehta, Delhi', img: remote.photo_1472099645785_5658abf4ff4e },
  { text: '"Transformed our space beyond expectations. Timeless elegance with modern functionality."', author: '— Anjali Verma, Bangalore', img: remote.photo_1438761681033_6461ffad8d80 },
]

export default function Home() {
  const imgRef = useRef(null)
  const contentRef = useRef(null)
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  useEffect(() => {
    const img = imgRef.current
    const content = contentRef.current
    if (!img) return
    const heroSection = img.closest('.hero')
    const onScroll = () => {
      const speed = 0.3
      const y = window.scrollY * speed
      img.style.transform = `translateY(${y}px)`
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
          <img ref={imgRef} src={heroBg} alt="Minimalist Green Wall Living Room" />
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
      <section className="section" style={{ overflow: 'visible' }}>
        <div className="container" style={{ overflow: 'visible', maxWidth: '1200px' }}>
          <div className="about-intro" style={{ direction: 'rtl', alignItems: 'stretch', overflow: 'visible', gap: '60px' }}>
            <Parallax speed={0.12}>
            <div className="about-intro-image" style={{ direction: 'ltr', height: '100%', position: 'relative', overflow: 'visible', borderRadius: '20px' }}>
              <img src={remote.photo_1616486338812_3dadae4b4ace} alt="About Roopam Interiors" style={{ height: '100%', objectFit: 'cover', borderRadius: '20px', display: 'block' }} />
              <div className="experience-badge" style={{ position: 'absolute', left: '-40px', bottom: '40px', zIndex: 10, background: '#6b9f81', color: '#ffffff', border: 'none', boxShadow: '0 4px 12px rgba(107, 159, 129, 0.4)', borderRadius: '14px', padding: '18px 26px' }}>
                <div className="number" style={{ color: '#ffffff' }}>15+</div>
                <div className="label" style={{ color: '#ffffff' }}>Years Experience</div>
              </div>
            </div>
            </Parallax>
            <Parallax speed={0.1}>
            <div className="about-intro-text" style={{ direction: 'ltr', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div>
                <span className="section-tag">About Us</span>
                <h2 style={{ lineHeight: '1.15', marginBottom: '16px' }}>Where Elegance<br />Meets Everyday Living</h2>
                <p>Roopam Interiors is a premier design studio dedicated to crafting extraordinary spaces that blend timeless elegance with modern functionality. Our award-winning team brings precision, creativity, and passion to every project—big or small.</p>
                <p>We believe great design transforms lives. From concept to completion, we work closely with clients to create interiors that reflect their style, enhance comfort, and stand the test of time.</p>
              </div>
              <div className="about-features" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div className="about-feature-item" style={{ aspectRatio: '1/1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '12px', gap: '4px' }}>
                  <div className="icon" style={{ margin: 0 }}><i className="fas fa-check-circle"></i></div>
                  <h4 style={{ margin: '2px 0' }}>500+</h4>
                  <p style={{ fontSize: '13px', margin: 0 }}>Projects Completed</p>
                </div>
                <div className="about-feature-item" style={{ aspectRatio: '1/1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '12px', gap: '4px' }}>
                  <div className="icon" style={{ margin: 0 }}><i className="fas fa-award"></i></div>
                  <h4 style={{ margin: '2px 0' }}>25+</h4>
                  <p style={{ fontSize: '13px', margin: 0 }}>Design Awards</p>
                </div>
                <div className="about-feature-item" style={{ aspectRatio: '1/1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '12px', gap: '4px' }}>
                  <div className="icon" style={{ margin: 0 }}><i className="fas fa-users"></i></div>
                  <h4 style={{ margin: '2px 0' }}>50+</h4>
                  <p style={{ fontSize: '13px', margin: 0 }}>Expert Designers</p>
                </div>
              </div>
            </div>
            </Parallax>
          </div>
        </div>
      </section>
      </ScrollReveal>

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
                <div className="service-card-bg" style={{ backgroundImage: `url(${s.img})` }}></div>
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
          <div className="portfolio-grid home-portfolio-grid">
            {portfolioItems.map((item, i) => (
              <div key={i} className="portfolio-item">
                <img src={item.img} alt={item.title} />
                <div className="overlay">
                  <p>{item.cat}</p>
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/portfolio" className="btn btn-outline">View Full Portfolio <i className="fas fa-arrow-right"></i></Link>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section className="section" style={{ background: 'var(--accent)', marginTop: '-40px', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container">
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '40px 60px', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.08)', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', alignItems: 'center' }} className="testimonial-strip">
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', color: 'var(--primary)', lineHeight: '1.25', marginBottom: '0' }}>
                Trusted by home owners<br />and businesses alike
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }} className="testimonial-row">
              <button onClick={() => setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))} style={{ background: '#D8C8B2', border: 'none', width: '46px', height: '46px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#557165', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', flexShrink: 0 }}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px', background: '#D8C8B2', padding: '28px 70px 28px 95px', borderRadius: '16px', boxShadow: '0 15px 40px rgba(216, 200, 178, 0.25)', flex: '0 0 auto', minWidth: '300px', maxWidth: '520px', height: '180px', position: 'relative', border: '1px solid rgba(255,255,255,0.4)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '10px', color: '#557165' }}>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p style={{ color: '#2d2d2d', fontSize: '1.05rem', marginBottom: '8px', fontStyle: 'italic', lineHeight: '1.7' }}>{testimonials[testimonialIndex].text}</p>
                  <p style={{ color: '#557165', fontSize: '0.95rem', fontWeight: '600' }}>{testimonials[testimonialIndex].author}</p>
                </div>
                <img src={testimonials[testimonialIndex].img} alt="User" style={{ width: '68px', height: '68px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #557165', flexShrink: 0, position: 'absolute', right: '20px' }} />
              </div>
              <button onClick={() => setTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))} style={{ background: '#D8C8B2', border: 'none', width: '46px', height: '46px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#557165', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', flexShrink: 0 }}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <CtaSection />
    </>
  )
}
