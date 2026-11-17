import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useBrand, withBrandPath } from '../brand'
import heroBg from '../assets/images/Minimalist Green Wall Living Room.webp'

export default function PageHero({ title, bgImage }) {
  const imgRef = useRef(null)
  const { path: brandPath } = useBrand()
  const to = (route) => withBrandPath(brandPath, route)

  useEffect(() => {
    const img = imgRef.current
    if (!img) return
    const onScroll = () => {
      const speed = 0.3
      const y = window.scrollY * speed
      img.style.transform = `translateY(${y}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="page-hero">
      <div className="page-hero-bg">
        <img ref={imgRef} src={bgImage || heroBg} alt={title} style={{ objectPosition: 'left center' }} />
      </div>
      <div className="container">
        <h1 className="page-hero-title">{title}</h1>
        <div className="page-hero-breadcrumb">
          <Link to={to('/')}>Home</Link>
          <span className="separator">/</span>
          <span>{title}</span>
        </div>
      </div>
    </section>
  )
}
