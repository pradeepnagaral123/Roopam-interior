import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import ScrollReveal from '../components/ScrollReveal'

const services = [
  { icon: 'fa-solid fa-house-chimney', title: 'Residential Design', desc: 'Full-service residential interior design for apartments, villas, and homes. We create personalized spaces that reflect your lifestyle and taste, from concept development to final installation.' },
  { icon: 'fa-solid fa-building', title: 'Commercial Design', desc: 'Strategic commercial interiors for offices, retail spaces, restaurants, and hospitality venues. Our designs enhance brand identity and create memorable experiences for your clients.' },
  { icon: 'fa-solid fa-pen-ruler', title: 'Space Planning', desc: 'Optimized spatial layouts that maximize functionality, flow, and efficiency. Our space planning service ensures every square foot serves a purpose.' },
  { icon: 'fa-solid fa-couch', title: 'Custom Furniture', desc: 'Bespoke furniture design and manufacturing. We create unique pieces that perfectly fit your space and style, crafted by skilled artisans using premium materials.' },
  { icon: 'fa-solid fa-lightbulb', title: 'Lighting Design', desc: 'Comprehensive lighting solutions that set the perfect mood. From ambient to accent lighting, we design layered schemes that transform your space.' },
  { icon: 'fa-solid fa-palette', title: 'Color Consultation', desc: 'Expert color selection and palette development. We help you choose the perfect colors to create the desired atmosphere and emotional response in your space.' },
  { icon: 'fa-solid fa-tree', title: 'Interior Landscaping', desc: 'Biophilic design integration with indoor plants and green walls. We bring nature indoors to improve air quality and create calming environments.' },
  { icon: 'fa-solid fa-layer-group', title: 'Renovation & Styling', desc: 'Complete renovation services and home styling. We breathe new life into existing spaces with modern updates and thoughtful design interventions.' },
  { icon: 'fa-solid fa-drafting-compass', title: 'Consultation Services', desc: 'Expert design consultation for specific project needs. Get professional advice on materials, layouts, color schemes, and design direction.' },
]

const steps = [
  { number: '01', title: 'Discovery', desc: 'We understand your vision, needs, and lifestyle through in-depth consultation.' },
  { number: '02', title: 'Concept', desc: 'We develop design concepts, mood boards, and preliminary layouts for your approval.' },
  { number: '03', title: 'Design', desc: 'Detailed design development including 3D renderings, material selection, and budgeting.' },
  { number: '04', title: 'Execution', desc: 'Seamless project management from procurement to installation and final styling.' },
]

export default function Services() {
  return (
    <>
      <PageHero title="Our Services" />
      
      <ScrollReveal>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What We Offer</span>
            <h2 className="section-title">Comprehensive Design Solutions</h2>
            <p className="section-subtitle">From residential to commercial, we offer end-to-end interior design services tailored to your unique requirements.</p>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <div key={i} className="service-card">
                <div className="icon"><i className={s.icon}></i></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section className="section process-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Process</span>
            <h2 className="section-title">How We Work</h2>
            <p className="section-subtitle">A streamlined process designed to bring your vision to life with precision and care.</p>
          </div>
          <div className="process-steps">
            {steps.map((step, i) => (
              <div key={i} className="process-step">
                <div className="step-number">{step.number}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
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
