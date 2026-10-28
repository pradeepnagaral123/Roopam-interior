import { useState, useRef, useEffect } from 'react'
import PageHero from '../components/PageHero'
import ScrollReveal from '../components/ScrollReveal'

export default function BookConsultation() {
  const [selectedDate, setSelectedDate] = useState('')
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const calendarRef = useRef(null)
  const [projectType, setProjectType] = useState('')
  const [showProjectType, setShowProjectType] = useState(false)
  const projectTypeRef = useRef(null)
  const [projectBudget, setProjectBudget] = useState('')
  const [showProjectBudget, setShowProjectBudget] = useState(false)
  const projectBudgetRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for booking a consultation! We will contact you within 24 hours to confirm your appointment.')
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false)
      }
      if (projectTypeRef.current && !projectTypeRef.current.contains(event.target)) {
        setShowProjectType(false)
      }
      if (projectBudgetRef.current && !projectBudgetRef.current.contains(event.target)) {
        setShowProjectBudget(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const projectTypes = [
    { value: 'residential', label: 'Residential Design' },
    { value: 'commercial', label: 'Commercial Design' },
    { value: 'renovation', label: 'Renovation' },
    { value: 'consultation', label: 'Design Consultation' },
    { value: 'other', label: 'Other' },
  ]

  const projectBudgets = [
    { value: 'under-5l', label: 'Under ₹5,00,000' },
    { value: '5-10l', label: '₹5,00,000 — ₹10,00,000' },
    { value: '10-25l', label: '₹10,00,000 — ₹25,00,000' },
    { value: '25-50l', label: '₹25,00,000 — ₹50,00,000' },
    { value: 'above-50l', label: 'Above ₹50,00,000' },
  ]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${day}-${month}-${year}`
  }

  const handleDateSelect = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const year = newDate.getFullYear()
    const month = String(newDate.getMonth() + 1).padStart(2, '0')
    const d = String(day).padStart(2, '0')
    setSelectedDate(`${d}-${month}-${year}`)
    setShowCalendar(false)
  }

  const changeMonth = (offset) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1))
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

              <div className="why-choose-consult" style={{ marginTop: '40px', padding: '28px', background: 'var(--accent)', borderRadius: 'var(--radius)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '16px', color: 'var(--primary)' }}>Why Choose Us</h3>
                <p style={{ color: 'var(--text-light)', marginBottom: '18px' }}>With 15+ years of experience, we've transformed 500+ spaces across residential and commercial projects with timeless designs.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className="fas fa-award" style={{ color: 'var(--secondary)' }}></i>
                    <span style={{ color: 'var(--text)' }}>Award-winning design studio</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className="fas fa-project-diagram" style={{ color: 'var(--secondary)' }}></i>
                    <span style={{ color: 'var(--text)' }}>End-to-end project management</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className="fas fa-hand-holding-heart" style={{ color: 'var(--secondary)' }}></i>
                    <span style={{ color: 'var(--text)' }}>Personalized approach</span>
                  </div>
                </div>
              </div>

              <div className="contact-details" style={{ marginTop: '40px' }}>
                <div className="contact-detail-item">
                  <div className="icon"><i className="fas fa-phone-alt"></i></div>
                  <div>
                    <h4>Prefer to call?</h4>
                    <p>90354 99777</p>
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
                <div className="form-group" style={{ position: 'relative' }} ref={calendarRef}>
                  <label>Preferred Date</label>
                  <div style={{ position: 'relative' }}>
                    <input type="text" readOnly value={selectedDate} onClick={() => setShowCalendar(!showCalendar)} placeholder="Select date" style={{ cursor: 'pointer', paddingRight: '40px' }} />
                    <i className="fas fa-calendar-alt" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)', pointerEvents: 'none' }}></i>
                  </div>
                  {showCalendar && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '8px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-hover)', zIndex: 1000, width: '280px', padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <button type="button" onClick={() => changeMonth(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--secondary)', fontSize: '1rem' }}><i className="fas fa-chevron-left"></i></button>
                        <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
                        <button type="button" onClick={() => changeMonth(1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--secondary)', fontSize: '1rem' }}><i className="fas fa-chevron-right"></i></button>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-light)', padding: '4px' }}>{d}</div>)}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                        {Array(getFirstDayOfMonth(currentMonth)).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
                        {Array(getDaysInMonth(currentMonth)).fill(null).map((_, i) => {
                          const day = i + 1
                          const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                          const dateStr = `${String(day).padStart(2, '0')}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${dateObj.getFullYear()}`
                          const isSelected = selectedDate === dateStr
                          const today = new Date()
                          const isToday = today.getDate() === day && today.getMonth() === currentMonth.getMonth() && today.getFullYear() === currentMonth.getFullYear()
                          return (
                            <button type="button" key={day} onClick={() => handleDateSelect(day)} style={{ padding: '8px', border: isToday && !isSelected ? '1px solid var(--secondary)' : 'none', background: isSelected ? 'var(--secondary)' : 'none', color: isSelected ? '#fff' : isToday ? 'var(--secondary)' : 'var(--text)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem', transition: 'all 0.2s', fontWeight: isToday ? '600' : '400' }} onMouseEnter={(e) => { if (!isSelected) e.target.style.background = 'var(--accent)' }} onMouseLeave={(e) => { if (!isSelected) e.target.style.background = isToday ? 'none' : 'none' }}>{day}</button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group" style={{ position: 'relative' }} ref={projectTypeRef}>
                <label>Project Type *</label>
                <div style={{ position: 'relative' }}>
                  <input type="text" readOnly value={projectTypes.find(p => p.value === projectType)?.label || ''} onClick={() => setShowProjectType(!showProjectType)} placeholder="Select project type" required style={{ cursor: 'pointer', paddingRight: '40px' }} />
                  <i className="fas fa-chevron-down" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)', pointerEvents: 'none', fontSize: '0.8rem' }}></i>
                </div>
                {showProjectType && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '8px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-hover)', zIndex: 1000, width: '100%', overflow: 'hidden' }}>
                    {projectTypes.map(pt => (
                      <div key={pt.value} onClick={() => { setProjectType(pt.value); setShowProjectType(false) }} style={{ padding: '12px 16px', cursor: 'pointer', color: 'var(--text)', borderBottom: pt.value === 'other' ? 'none' : '1px solid var(--border)', transition: 'all 0.2s' }} onMouseEnter={(e) => e.target.style.background = 'var(--accent)'} onMouseLeave={(e) => e.target.style.background = 'transparent'}>{pt.label}</div>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group" style={{ position: 'relative' }} ref={projectBudgetRef}>
                <label>Project Budget</label>
                <div style={{ position: 'relative' }}>
                  <input type="text" readOnly value={projectBudgets.find(p => p.value === projectBudget)?.label || ''} onClick={() => setShowProjectBudget(!showProjectBudget)} placeholder="Select budget range" style={{ cursor: 'pointer', paddingRight: '40px' }} />
                  <i className="fas fa-chevron-down" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)', pointerEvents: 'none', fontSize: '0.8rem' }}></i>
                </div>
                {showProjectBudget && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '8px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-hover)', zIndex: 1000, width: '100%', overflow: 'hidden' }}>
                    {projectBudgets.map(pb => (
                      <div key={pb.value} onClick={() => { setProjectBudget(pb.value); setShowProjectBudget(false) }} style={{ padding: '12px 16px', cursor: 'pointer', color: 'var(--text)', borderBottom: pb.value === 'above-50l' ? 'none' : '1px solid var(--border)', transition: 'all 0.2s' }} onMouseEnter={(e) => e.target.style.background = 'var(--accent)'} onMouseLeave={(e) => e.target.style.background = 'transparent'}>{pb.label}</div>
                    ))}
                  </div>
                )}
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
