import { useState } from 'react'
import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import ScrollReveal from '../components/ScrollReveal'

const categories = ['All', 'Residential', 'Commercial', 'Hospitality', 'Retail']

const projects = [
  { img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', title: 'Modern Luxury Villa', cat: 'Residential', location: 'Mumbai' },
  { img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80', title: 'Executive Office Suite', cat: 'Commercial', location: 'Delhi' },
  { img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', title: 'Minimalist Penthouse', cat: 'Residential', location: 'Bangalore' },
  { img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80', title: 'Boutique Hotel Lobby', cat: 'Hospitality', location: 'Goa' },
  { img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', title: 'Luxury Retail Store', cat: 'Retail', location: 'Delhi' },
  { img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', title: 'Contemporary Apartment', cat: 'Residential', location: 'Pune' },
  { img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', title: 'Farmhouse Retreat', cat: 'Residential', location: 'Jaipur' },
  { img: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80', title: 'Corporate Headquarters', cat: 'Commercial', location: 'Hyderabad' },
  { img: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=800&q=80', title: 'Beachfront Villa', cat: 'Residential', location: 'Goa' },
]

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const [filtered, setFiltered] = useState(projects)

  const filter = (cat) => {
    setActive(cat)
    setFiltered(cat === 'All' ? projects : projects.filter(p => p.cat === cat))
  }

  return (
    <>
      <PageHero title="Portfolio" />
      
      <ScrollReveal>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Work</span>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">A showcase of our finest work, spanning residential, commercial, and hospitality projects.</p>
          </div>
          <div className="portfolio-filter">
            {categories.map((cat) => (
              <button
                key={cat}
                className={active === cat ? 'active' : ''}
                onClick={() => filter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="portfolio-grid">
            {filtered.map((project, i) => (
              <div key={i} className={`portfolio-item ${i === 0 ? 'tall' : ''}`}>
                <img src={project.img} alt={project.title} />
                <div className="overlay">
                  <p>{project.cat} — {project.location}</p>
                  <h3>{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      <CtaSection />
    </>
  )
}
