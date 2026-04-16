import { Outlet } from 'react-router-dom'
import { PublicHeader } from '../components/Header/PublicHeader'

export function PublicLayout() {
  return (
    <>
      <PublicHeader />
      <main>
        <Outlet />
      </main>
    </>
  )
}
