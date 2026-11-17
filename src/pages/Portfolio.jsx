import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import ScrollReveal from '../components/ScrollReveal'
import { remote } from '../assets/images/remote'
import { useBrand, withBrandPath } from '../brand'

const categories = ['All', 'Residential', 'Commercial', 'Hospitality', 'Retail']

const projects = [
  { img: remote.photo_1600607687939_ce8a6c25118c, title: 'Modern Luxury Villa', cat: 'Residential', location: 'Mumbai', description: 'A contemporary villa where warm materials, layered lighting and sweeping views come together. We reworked the layout to open up the living spaces, then finished each room with bespoke joinery and a calm, neutral palette that lets the architecture breathe.' },
  { img: remote.photo_1618220179428_22790b461013, title: 'Executive Office Suite', cat: 'Commercial', location: 'Delhi', description: 'A refined workspace designed for focus and collaboration in equal measure. Acoustic zoning, ergonomic furniture and a muted green-and-oak palette create an executive suite that feels both professional and quietly welcoming.' },
  { img: remote.photo_1616486338812_3dadae4b4ace, title: 'Minimalist Penthouse', cat: 'Residential', location: 'Bangalore', description: 'An exercise in restraint. Clean lines, uncluttered surfaces and a monochrome base are lifted by tactile fabrics and sculptural pieces, giving this penthouse a sense of space far bigger than its footprint.' },
  { img: remote.photo_1616594039964_ae9021a400a0, title: 'Boutique Hotel Lobby', cat: 'Hospitality', location: 'Goa', description: 'A lobby that sets the tone from the moment guests arrive. We paired locally sourced stone and rattan with soft ambient lighting to create a relaxed, coastal elegance that reflects the spirit of Goa.' },
  { img: remote.photo_1586023492125_27b2c045efd7, title: 'Luxury Retail Store', cat: 'Retail', location: 'Delhi', description: 'A retail environment built around the product. Precise display lighting, a restrained material palette and an intuitive circulation path guide shoppers naturally through the space while keeping the brand front and centre.' },
  { img: remote.photo_1616486338812_3dadae4b4ace, title: 'Contemporary Apartment', cat: 'Residential', location: 'Pune', description: 'A compact apartment transformed through smart planning. Multi-functional storage, a seamless living-dining zone and a soft, layered colour scheme make the home feel open, practical and personal.' },
  { img: remote.photo_1600585154340_be6161a56a0c, title: 'Farmhouse Retreat', cat: 'Residential', location: 'Jaipur', description: 'A weekend escape rooted in its surroundings. Earthy textures, handcrafted details and generous indoor-outdoor transitions bring the garden into everyday living, creating a home that slows you down the moment you enter.' },
  { img: remote.photo_1600573472550_8090b5e0745e, title: 'Corporate Headquarters', cat: 'Commercial', location: 'Hyderabad', description: 'A headquarters designed to bring people together. Flexible work points, informal collaboration nooks and biophilic touches support a range of working styles while expressing the company’s confident, forward-looking identity.' },
  { img: remote.photo_1600585154084_4e5fe7c39198, title: 'Beachfront Villa', cat: 'Residential', location: 'Goa', description: 'Light, air and horizon define this beachfront home. We kept the interiors deliberately understated — lime-washed walls, natural fibres and open sightlines — so the ever-changing sea remains the true centrepiece.' },
  { img: remote.photo_1566073771259_6a8506099945, title: 'Seaside Resort Lounge', cat: 'Hospitality', location: 'Udaipur', description: 'A lounge that balances indulgence with ease. Deep seating, textured surfaces and carefully composed lighting create intimate pockets within a generous space, ideal for long conversations and quiet evenings.' },
  { img: remote.photo_1441986300917_64674bd600d8, title: 'Flagship Fashion Boutique', cat: 'Retail', location: 'Mumbai', description: 'A flagship that reads like a gallery. Minimal plinths, dramatic accent lighting and a precise material palette give the collections room to speak while delivering a memorable, high-end shopping experience.' },
  { img: remote.photo_1497366216548_37526070297c, title: 'Modern Creative Studio', cat: 'Commercial', location: 'Bangalore', description: 'An energetic studio for a creative team. Open worktables, pin-up walls and a flexible meeting corner encourage ideas to move freely, with playful colour used deliberately against a raw, industrial shell.' },
]

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const [filtered, setFiltered] = useState(projects)
  const [activeProject, setActiveProject] = useState(null)
  const { path: brandPath } = useBrand()
  const to = (route) => withBrandPath(brandPath, route)

  useEffect(() => {
    if (!activeProject) return
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveProject(null)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeProject])

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
                <button
                  type="button"
                  className="portfolio-arrow"
                  aria-label={`View ${project.title} details`}
                  onClick={() => setActiveProject(project)}
                >
                  <i className="fas fa-external-link-alt"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      <div className={`project-modal ${activeProject ? 'active' : ''}`} onClick={() => setActiveProject(null)}>
        {activeProject && (
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="project-modal-close" aria-label="Close project details" onClick={() => setActiveProject(null)}>
              <i className="fas fa-times"></i>
            </button>
            <div className="project-modal-image">
              <img src={activeProject.img} alt={activeProject.title} />
            </div>
            <div className="project-modal-body">
              <span className="section-tag">{activeProject.cat} Project</span>
              <h2>{activeProject.title}</h2>
              <div className="project-modal-meta">
                <span><i className="fas fa-map-marker-alt"></i> {activeProject.location}</span>
                <span><i className="fas fa-layer-group"></i> {activeProject.cat}</span>
              </div>
              <p>{activeProject.description}</p>
              <Link to={to('/book-consultation')} className="btn btn-primary">Discuss a Similar Project <i className="fas fa-arrow-right"></i></Link>
            </div>
          </div>
        )}
      </div>

      <CtaSection />
    </>
  )
}
