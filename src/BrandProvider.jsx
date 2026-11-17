import { BrandContext } from './brand'

export default function BrandProvider({ brand, children }) {
  return <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>
}
