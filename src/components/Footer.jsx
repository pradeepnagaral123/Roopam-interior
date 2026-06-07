import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <h3>Roopam <span>Interiors</span></h3>
            <p>Transforming spaces into timeless works of art. We create bespoke interior designs that reflect your personality and elevate your lifestyle.</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="Pinterest"><i className="fab fa-pinterest-p"></i></a>
              <a href="#" aria-label="Houzz"><i className="fab fa-houzz"></i></a>
            </div>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4>Services</h4>
            <ul className="footer-links">
              <li><Link to="/services">Residential Design</Link></li>
              <li><Link to="/services">Commercial Design</Link></li>
              <li><Link to="/services">Space Planning</Link></li>
              <li><Link to="/services">Furniture Design</Link></li>
              <li><Link to="/services">Lighting Design</Link></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4>Newsletter</h4>
            <p>Subscribe for design inspiration and updates.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button type="submit"><i className="fas fa-arrow-right"></i></button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Roopam Interiors. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
