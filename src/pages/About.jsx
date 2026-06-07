import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import ScrollReveal from '../components/ScrollReveal'

const team = [
  { img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', name: 'Priya Sharma', role: 'Founder & Principal Designer', desc: 'Visionary designer with 20+ years of experience in luxury interiors.' },
  { img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80', name: 'Arjun Mehta', role: 'Senior Architect', desc: 'Award-winning architect specializing in spatial design and planning.' },
  { img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80', name: 'Ananya Patel', role: 'Interior Stylist', desc: 'Expert in color theory, textiles, and decorative arts.' },
  { img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80', name: 'Vikram Singh', role: 'Project Manager', desc: 'Ensures seamless execution of every project from concept to completion.' },
]

export default function About() {
  return (
    <>
      <PageHero title="About Us" />
      
      <ScrollReveal>
      <section className="section">
        <div className="container">
          <div className="about-intro">
            <div className="about-intro-image">
              <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80" alt="Our Studio" />
              <div className="experience-badge">
                <div className="number">15+</div>
                <div className="label">Years Experience</div>
              </div>
            </div>
            <div className="about-intro-text">
              <span className="section-tag">Our Story</span>
              <h2>Passion Meets Precision in Every Space</h2>
              <p>Founded in 2009, Roopam Interiors has grown from a small design studio into one of the most respected interior design firms in the country. Our journey has been defined by a relentless pursuit of excellence and an unwavering commitment to our clients' vision.</p>
              <p>We believe that great design is not just about aesthetics—it's about creating spaces that enhance the way people live, work, and connect. Every project we undertake is a collaboration, a dialogue between our expertise and your dreams.</p>
              <p>Our team of talented designers, architects, and craftsmen brings together diverse perspectives and specialized skills to deliver interiors that are both beautiful and functional.</p>
              <div className="about-features" style={{ marginTop: '32px' }}>
                <div className="about-feature-item">
                  <div className="icon"><i className="fas fa-check-circle"></i></div>
                  <h4>500+</h4>
                  <p>Projects Completed</p>
                </div>
                <div className="about-feature-item">
                  <div className="icon"><i className="fas fa-award"></i></div>
                  <h4>25+</h4>
                  <p>Design Awards</p>
                </div>
                <div className="about-feature-item">
                  <div className="icon"><i className="fas fa-users"></i></div>
                  <h4>50+</h4>
                  <p>Expert Designers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section className="section team-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Team</span>
            <h2 className="section-title">Meet the Experts</h2>
            <p className="section-subtitle">A passionate team of designers, architects, and visionaries dedicated to transforming spaces.</p>
          </div>
          <div className="team-grid">
            {team.map((member, i) => (
              <div key={i} className="team-card">
                <div className="team-card-image">
                  <img src={member.img} alt={member.name} />
                </div>
                <div className="team-card-body">
                  <h4>{member.name}</h4>
                  <div className="role">{member.role}</div>
                  <p>{member.desc}</p>
                  <div className="team-social">
                    <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                    <a href="#" aria-label="Email"><i className="fas fa-envelope"></i></a>
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
