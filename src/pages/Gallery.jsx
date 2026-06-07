import { useState } from 'react'
import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import ScrollReveal from '../components/ScrollReveal'

const images = [
  { img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', title: 'Living Room Design' },
  { img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80', title: 'Modern Kitchen' },
  { img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', title: 'Bedroom Interior' },
  { img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80', title: 'Dining Space' },
  { img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', title: 'Bathroom Luxury' },
  { img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', title: 'Home Office' },
  { img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', title: 'Garden View' },
  { img: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80', title: 'Staircase Design' },
  { img: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=800&q=80', title: 'Open Plan Living' },
  { img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80', title: 'Minimalist Decor' },
  { img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', title: 'Luxury Bedroom' },
  { img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80', title: 'Modern Bathroom' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <>
      <PageHero title="Gallery" />
      
      <ScrollReveal>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Inspiration</span>
            <h2 className="section-title">Photo Gallery</h2>
            <p className="section-subtitle">Browse through our collection of stunning interiors for inspiration.</p>
          </div>
          <div className="gallery-grid">
            {images.map((item, i) => (
              <div key={i} className="gallery-item" onClick={() => setLightbox(item.img)}>
                <img src={item.img} alt={item.title} />
                <div className="overlay">
                  <div className="icon"><i className="fas fa-expand"></i></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      <div className={`lightbox ${lightbox ? 'active' : ''}`} onClick={() => setLightbox(null)}>
        <button className="lightbox-close" onClick={() => setLightbox(null)}><i className="fas fa-times"></i></button>
        {lightbox && <img src={lightbox} alt="Gallery" />}
      </div>

      <CtaSection />
    </>
  )
}
