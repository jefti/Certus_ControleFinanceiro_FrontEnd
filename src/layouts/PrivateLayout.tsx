import { Outlet } from 'react-router-dom'
import { PrivateHeader } from '../components/Header/PrivateHeader'

export function PrivateLayout() {
  return (
    <>
      <PrivateHeader />
      <main>
        <Outlet />
      </main>
    </>
  )
}
