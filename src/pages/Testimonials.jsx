import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import ScrollReveal from '../components/ScrollReveal'

const testimonials = [
  { stars: 5, quote: 'Roopam Interiors completely transformed our home. Their attention to detail and ability to understand our vision was remarkable. Every room feels like a work of art.', name: 'Sarah & Amit Kapoor', role: 'Homeowners, Mumbai', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80' },
  { stars: 5, quote: 'Working with Roopam Interiors on our office project was a game-changer. The new design boosted employee morale and productivity. Truly exceptional work!', name: 'Rajesh Mehta', role: 'CEO, TechVision Corp', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80' },
  { stars: 5, quote: 'From consultation to completion, the team was professional, creative, and responsive. Our boutique hotel lobby has received countless compliments from guests.', name: 'Anita Desai', role: 'Hotel Owner, Goa', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80' },
  { stars: 5, quote: 'We hired Roopam Interiors for our retail space and the result exceeded our expectations. The design perfectly captures our brand essence and has increased footfall.', name: 'Vikram Joshi', role: 'Retail Entrepreneur', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
  { stars: 5, quote: 'The team designed our dream home from scratch. Their innovative use of space and light is incredible. We wake up every morning loving our home even more.', name: 'Priyanka & Rohan', role: 'Homeowners, Pune', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80' },
  { stars: 5, quote: 'Exceptional service and unmatched creativity. Roopam Interiors turned our dated office into a modern, inspiring workspace. Highly recommended!', name: 'Neha Gupta', role: 'Managing Director', img: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=150&q=80' },
]

export default function Testimonials() {
  return (
    <>
      <PageHero title="Testimonials" />
      
      <ScrollReveal>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Client Feedback</span>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">Hear from our clients about their experience working with Roopam Interiors.</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="stars">{'★'.repeat(t.stars)}</div>
                <p className="quote">"{t.quote}"</p>
                <div className="client">
                  <img src={t.img} alt={t.name} />
                  <div className="client-info">
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
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
