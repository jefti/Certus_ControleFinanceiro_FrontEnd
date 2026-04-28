import { Route, Routes } from 'react-router-dom'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { PublicLayout } from '../layouts/PublicLayout'
import { PrivateLayout } from '../layouts/PrivateLayout'
import { HomePage } from '../pages/HomePage/HomePage'
import { LoginPage } from '../pages/LoginPage/LoginPage'
import { RegisterPage } from '../pages/RegisterPage/RegisterPage'
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage/ForgotPasswordPage'
import { AuthenticatedLandingPage } from '../pages/AuthenticatedLandingPage/AuthenticatedLandingPage'
import { DashboardPage } from '../pages/DashboardPage/DashboardPage'
import { CostCenterPausedPage } from '../pages/CostCenterPausedPage/CostCenterPausedPage'
import { TitlesPage } from '../pages/TitlesPage/TitlesPage'
import { UserPage } from '../pages/UserPage/UserPage'
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage'
import { NotFoundLayout } from '../layouts/NotFoundLayout'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/recuperar-senha" element={<ForgotPasswordPage />} />
        </Route>
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<PrivateLayout />}>
          <Route path="/inicio" element={<AuthenticatedLandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/centro-de-custos" element={<CostCenterPausedPage />} />
          <Route path="/titulos" element={<TitlesPage />} />
          <Route path="/usuario" element={<UserPage />} />
        </Route>
      </Route>

      <Route element={<NotFoundLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
