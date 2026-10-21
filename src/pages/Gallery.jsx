import { useState } from 'react'
import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import ScrollReveal from '../components/ScrollReveal'
import { remote } from '../assets/images/remote'

const images = [
  { img: remote.photo_1600607687939_ce8a6c25118c, title: 'Living Room Design' },
  { img: remote.photo_1618220179428_22790b461013, title: 'Modern Kitchen' },
  { img: remote.photo_1616486338812_3dadae4b4ace, title: 'Bedroom Interior' },
  { img: remote.photo_1616594039964_ae9021a400a0, title: 'Dining Space' },
  { img: remote.photo_1586023492125_27b2c045efd7, title: 'Bathroom Luxury' },
  { img: remote.photo_1616486338812_3dadae4b4ace, title: 'Home Office' },
  { img: remote.photo_1600585154340_be6161a56a0c, title: 'Garden View' },
  { img: remote.photo_1600573472550_8090b5e0745e, title: 'Staircase Design' },
  { img: remote.photo_1600585154084_4e5fe7c39198, title: 'Open Plan Living' },
  { img: remote.photo_1600047509807_ba8f99d2cdde, title: 'Minimalist Decor' },
  { img: remote.photo_1600210492486_724fe5c67fb0, title: 'Luxury Bedroom' },
  { img: remote.photo_1600121848594_d8644e57abab, title: 'Modern Bathroom' },
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
