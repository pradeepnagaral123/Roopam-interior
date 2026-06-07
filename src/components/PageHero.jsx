import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import heroBg from '../assets/images/hero-bg.png'

export default function PageHero({ title, bgImage }) {
  const imgRef = useRef(null)

  useEffect(() => {
    const img = imgRef.current
    if (!img) return
    const onScroll = () => {
      const speed = 0.3
      const y = window.scrollY * speed
      img.style.transform = `translateY(${y}px) scale(1.1)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="page-hero">
      <div className="page-hero-bg">
        <img ref={imgRef} src={bgImage || heroBg} alt={title} />
      </div>
      <div className="container">
        <h1 className="page-hero-title">{title}</h1>
        <div className="page-hero-breadcrumb">
          <Link to="/">Home</Link>
          <span className="separator">/</span>
          <span>{title}</span>
        </div>
      </div>
    </section>
  )
}
