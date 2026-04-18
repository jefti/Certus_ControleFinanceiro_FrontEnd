import { Outlet } from "react-router-dom"
import { PrivateHeader } from "../components/Header/PrivateHeader"
import { PublicHeader } from "../components/Header/PublicHeader"
import { useAuth } from "../hooks/useAuth"

export function NotFoundLayout() {
  const { isAuthenticated } = useAuth()

  return (
    < >
      {isAuthenticated ? <PrivateHeader /> : <PublicHeader />}
      <main className="app-content">
        <Outlet />
      </main>
    </>
  )
}
