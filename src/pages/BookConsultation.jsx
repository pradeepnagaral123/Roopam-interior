import PageHero from '../components/PageHero'
import ScrollReveal from '../components/ScrollReveal'

export default function BookConsultation() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for booking a consultation! We will contact you within 24 hours to confirm your appointment.')
  }

  return (
    <>
      <PageHero title="Book a Consultation" />
      
      <ScrollReveal>
      <section className="section">
        <div className="container">
          <div className="consultation-grid">
            <div className="consultation-info">
              <h2>Let's Discuss Your <span>Dream Space</span></h2>
              <p>Schedule a complimentary consultation with our design team. We'll explore your vision, discuss possibilities, and outline the next steps to bring your dream space to life.</p>
              
              <div className="consultation-benefits">
                <div className="benefit-item">
                  <div className="icon"><i className="fas fa-check"></i></div>
                  <span>Free 1-hour consultation</span>
                </div>
                <div className="benefit-item">
                  <div className="icon"><i className="fas fa-check"></i></div>
                  <span>Expert design advice</span>
                </div>
                <div className="benefit-item">
                  <div className="icon"><i className="fas fa-check"></i></div>
                  <span>Preliminary budget estimate</span>
                </div>
                <div className="benefit-item">
                  <div className="icon"><i className="fas fa-check"></i></div>
                  <span>No obligation quote</span>
                </div>
              </div>

              <div className="contact-details" style={{ marginTop: '40px' }}>
                <div className="contact-detail-item">
                  <div className="icon"><i className="fas fa-phone-alt"></i></div>
                  <div>
                    <h4>Prefer to call?</h4>
                    <p>+91 98765 43210</p>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <div className="icon"><i className="fas fa-envelope"></i></div>
                  <div>
                    <h4>Prefer to email?</h4>
                    <p>hello@roopaminteriors.com</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="consultation-form" onSubmit={handleSubmit}>
              <h3>Schedule Your Consultation</h3>
              <p>Fill in your details and we'll get back to you within 24 hours.</p>

              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" placeholder="Your full name" required />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" placeholder="Your email" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" placeholder="Your phone number" required />
                </div>
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input type="date" />
                </div>
              </div>

              <div className="form-group">
                <label>Project Type *</label>
                <select required>
                  <option value="">Select project type</option>
                  <option value="residential">Residential Design</option>
                  <option value="commercial">Commercial Design</option>
                  <option value="renovation">Renovation</option>
                  <option value="consultation">Design Consultation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Project Budget</label>
                <select>
                  <option value="">Select budget range</option>
                  <option value="under-5l">Under ₹5,00,000</option>
                  <option value="5-10l">₹5,00,000 — ₹10,00,000</option>
                  <option value="10-25l">₹10,00,000 — ₹25,00,000</option>
                  <option value="25-50l">₹25,00,000 — ₹50,00,000</option>
                  <option value="above-50l">Above ₹50,00,000</option>
                </select>
              </div>

              <div className="form-group">
                <label>Project Location</label>
                <input type="text" placeholder="City / Area" />
              </div>

              <div className="form-group">
                <label>Tell Us About Your Project *</label>
                <textarea placeholder="Describe your vision, requirements, and any specific ideas you have..." required></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Book Consultation <i className="fas fa-calendar-check"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
      </ScrollReveal>
    </>
  )
}
