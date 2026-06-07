import { useRef, useEffect } from 'react'

export default function Parallax({ children, speed = 0.15, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let rafId = null

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const viewportCenter = window.innerHeight / 2
        const elementCenter = rect.top + rect.height / 2
        const offset = (elementCenter - viewportCenter) * speed
        el.style.transform = `translateY(${offset}px)`
        rafId = null
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [speed])

  return (
    <div ref={ref} className={`parallax ${className}`}>
      {children}
    </div>
  )
}
