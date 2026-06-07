import PageHero from '../components/PageHero'
import ScrollReveal from '../components/ScrollReveal'

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you shortly.')
  }

  return (
    <>
      <PageHero title="Contact Us" />
      
      <ScrollReveal>
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Let's Start a Conversation</h2>
              <p>Have a project in mind? We'd love to hear from you. Reach out and let's discuss how we can transform your space.</p>
              
              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="icon"><i className="fas fa-map-marker-alt"></i></div>
                  <div>
                    <h4>Our Studio</h4>
                    <p>42, Design District, Andheri West<br />Mumbai — 400053, India</p>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <div className="icon"><i className="fas fa-phone-alt"></i></div>
                  <div>
                    <h4>Phone</h4>
                    <p>+91 98765 43210</p>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <div className="icon"><i className="fas fa-envelope"></i></div>
                  <div>
                    <h4>Email</h4>
                    <p>hello@roopaminteriors.com</p>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <div className="icon"><i className="fas fa-clock"></i></div>
                  <div>
                    <h4>Working Hours</h4>
                    <p>Mon — Sat: 10:00 AM — 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Send Us a Message</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" placeholder="Your email" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="Your phone" />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select>
                    <option value="">Select a subject</option>
                    <option value="residential">Residential Design</option>
                    <option value="commercial">Commercial Design</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea placeholder="Tell us about your project..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Send Message <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
      </ScrollReveal>
    </>
  )
}
