import { createContext, useContext } from 'react'

const contact = {
  phone: '90354 99777',
  addressLines: [
    '1526, Maruti Galli, opposite Sheetal Medicals',
    'Ravivar Peth, Belagavi, Karnataka 590001',
  ],
  hours: 'Mon — Sat: 10:00 AM — 7:00 PM',
}

export const BRANDS = {
  roopam: {
    path: '',
    name: 'Roopam',
    accent: 'Interiors',
    fullName: 'Roopam Interiors',
    title: 'Roopam Interiors — Premium Interior Design',
    email: 'hello@roopaminteriors.com',
    ...contact,
  },
  harista: {
    path: '/harista-interiors',
    name: 'Harista',
    accent: 'Interiors',
    fullName: 'Harista Interiors',
    title: 'Harista Interiors — Premium Interior Design',
    email: 'hello@haristainteriors.com',
    ...contact,
  },
}

export const BrandContext = createContext(BRANDS.roopam)

export function getBrand(pathname) {
  const { path } = BRANDS.harista
  return pathname === path || pathname.startsWith(`${path}/`) ? BRANDS.harista : BRANDS.roopam
}

export function withBrandPath(brandPath, to) {
  if (!brandPath || !to.startsWith('/')) return to
  return `${brandPath}${to === '/' ? '' : to}`
}

export function useBrand() {
  return useContext(BrandContext)
}
