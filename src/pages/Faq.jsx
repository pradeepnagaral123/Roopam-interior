import { useState } from 'react'
import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import ScrollReveal from '../components/ScrollReveal'

const faqs = [
  { q: 'What is the typical process for an interior design project?', a: 'Our process begins with an initial consultation to understand your vision and requirements. We then develop concept designs, followed by detailed planning and material selection. Once approved, we manage the entire execution phase, including procurement, construction coordination, and final styling. The timeline varies based on project scope.' },
  { q: 'How much does interior design services cost?', a: 'Our pricing is customized based on the scope and complexity of each project. We offer flexible fee structures including fixed project fees, hourly consultations, and per-square-foot rates. During your complimentary initial consultation, we\'ll provide a detailed proposal tailored to your specific needs and budget.' },
  { q: 'How long does a typical project take?', a: 'Project timelines depend on the scope and scale. A single room redesign typically takes 4-6 weeks, while a full home renovation can take 3-6 months. Commercial projects vary based on size and complexity. We provide a detailed timeline during the proposal stage.' },
  { q: 'Do you work with existing furniture and decor?', a: 'Absolutely! We love incorporating existing pieces that hold sentimental value or have design merit. Our approach is to blend your cherished items with new elements to create a cohesive, personalized space that feels uniquely yours.' },
  { q: 'What areas do you serve?', a: 'We serve clients throughout major metropolitan areas including Mumbai, Delhi, Bangalore, Pune, Hyderabad, and Goa. For premium projects, we also offer pan-India services. Contact us to discuss your location.' },
  { q: 'Can you work within my budget?', a: 'Yes, we pride ourselves on creating beautiful spaces for a range of budgets. During our consultation, we\'ll discuss your budget openly and design a plan that maximizes value without compromising on quality or aesthetics.' },
  { q: 'Do you offer virtual design services?', a: 'Yes, we offer comprehensive virtual design services for clients who prefer remote collaboration. Through video consultations, digital mood boards, and detailed design packages, we can transform your space from anywhere in the world.' },
  { q: 'What style of design do you specialize in?', a: 'Our team is versatile and experienced in a wide range of styles — from contemporary and minimalist to classic, eclectic, and maximalist. We tailor our approach to match your personal taste and the architectural character of your space.' },
]

export default function Faq() {
  const [open, setOpen] = useState(null)

  const toggle = (i) => setOpen(open === i ? null : i)

  return (
    <>
      <PageHero title="FAQ" />
      
      <ScrollReveal>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Got Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Find answers to common questions about our services and process.</p>
          </div>
          <div className="faq-section">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${open === i ? 'active' : ''}`}>
                <button className="faq-question" onClick={() => toggle(i)}>
                  {faq.q}
                  <div className="icon"><i className="fas fa-plus"></i></div>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
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
