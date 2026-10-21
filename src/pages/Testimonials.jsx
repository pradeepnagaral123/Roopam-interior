import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import ScrollReveal from '../components/ScrollReveal'
import { remote } from '../assets/images/remote'

const testimonials = [
  { stars: 5, quote: 'Roopam Interiors completely transformed our home. Their attention to detail and ability to understand our vision was remarkable. Every room feels like a work of art.', name: 'Sarah & Amit Kapoor', role: 'Homeowners, Mumbai', img: remote.photo_1580489944761_15a19d654956 },
  { stars: 5, quote: 'Working with Roopam Interiors on our office project was a game-changer. The new design boosted employee morale and productivity. Truly exceptional work!', name: 'Rajesh Mehta', role: 'CEO, TechVision Corp', img: remote.photo_1472099645785_5658abf4ff4e },
  { stars: 5, quote: 'From consultation to completion, the team was professional, creative, and responsive. Our boutique hotel lobby has received countless compliments from guests.', name: 'Anita Desai', role: 'Hotel Owner, Goa', img: remote.photo_1573496359142_b8d87734a5a2 },
  { stars: 5, quote: 'We hired Roopam Interiors for our retail space and the result exceeded our expectations. The design perfectly captures our brand essence and has increased footfall.', name: 'Vikram Joshi', role: 'Retail Entrepreneur', img: remote.photo_1507003211169_0a1dd7228f2d },
  { stars: 5, quote: 'The team designed our dream home from scratch. Their innovative use of space and light is incredible. We wake up every morning loving our home even more.', name: 'Priyanka & Rohan', role: 'Homeowners, Pune', img: remote.photo_1438761681033_6461ffad8d80 },
  { stars: 5, quote: 'Exceptional service and unmatched creativity. Roopam Interiors turned our dated office into a modern, inspiring workspace. Highly recommended!', name: 'Neha Gupta', role: 'Managing Director', img: remote.photo_1489424731084_a5d8b219a5bb },
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
