import { useState } from 'react'
import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import ScrollReveal from '../components/ScrollReveal'
import { remote } from '../assets/images/remote'

const categories = ['All', 'Residential', 'Commercial', 'Hospitality', 'Retail']

const projects = [
  { img: remote.photo_1600607687939_ce8a6c25118c, title: 'Modern Luxury Villa', cat: 'Residential', location: 'Mumbai' },
  { img: remote.photo_1618220179428_22790b461013, title: 'Executive Office Suite', cat: 'Commercial', location: 'Delhi' },
  { img: remote.photo_1616486338812_3dadae4b4ace, title: 'Minimalist Penthouse', cat: 'Residential', location: 'Bangalore' },
  { img: remote.photo_1616594039964_ae9021a400a0, title: 'Boutique Hotel Lobby', cat: 'Hospitality', location: 'Goa' },
  { img: remote.photo_1586023492125_27b2c045efd7, title: 'Luxury Retail Store', cat: 'Retail', location: 'Delhi' },
  { img: remote.photo_1616486338812_3dadae4b4ace, title: 'Contemporary Apartment', cat: 'Residential', location: 'Pune' },
  { img: remote.photo_1600585154340_be6161a56a0c, title: 'Farmhouse Retreat', cat: 'Residential', location: 'Jaipur' },
  { img: remote.photo_1600573472550_8090b5e0745e, title: 'Corporate Headquarters', cat: 'Commercial', location: 'Hyderabad' },
  { img: remote.photo_1600585154084_4e5fe7c39198, title: 'Beachfront Villa', cat: 'Residential', location: 'Goa' },
  { img: remote.photo_1566073771259_6a8506099945, title: 'Seaside Resort Lounge', cat: 'Hospitality', location: 'Udaipur' },
  { img: remote.photo_1441986300917_64674bd600d8, title: 'Flagship Fashion Boutique', cat: 'Retail', location: 'Mumbai' },
  { img: remote.photo_1497366216548_37526070297c, title: 'Modern Creative Studio', cat: 'Commercial', location: 'Bangalore' },
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
              <div key={i} className="portfolio-item">
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
