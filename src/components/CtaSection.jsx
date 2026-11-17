import { Link } from 'react-router-dom'
import { useBrand, withBrandPath } from '../brand'

export default function CtaSection() {
  const { path: brandPath } = useBrand()
  const to = (route) => withBrandPath(brandPath, route)

  return (
    <section className="section cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>Let's Create Something Beautiful Together</h2>
          <p>Transform your space into a masterpiece. Schedule a consultation with our expert designers today.</p>
          <Link to={to('/book-consultation')} className="btn btn-primary">
            Book a Consultation <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}
