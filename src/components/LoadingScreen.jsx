import { useBrand } from '../brand'

export default function LoadingScreen() {
  const { name, accent } = useBrand()

  return (
    <div className="loading-screen">
      <div className="logo">{name} <span>{accent}</span></div>
      <div className="loading-bar">
        <div className="loading-bar-inner"></div>
      </div>
    </div>
  )
}
