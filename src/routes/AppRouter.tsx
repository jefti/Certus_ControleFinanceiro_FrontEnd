import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { PublicLayout } from '../layouts/PublicLayout'
import { PrivateLayout } from '../layouts/PrivateLayout'
import { NotFoundLayout } from '../layouts/NotFoundLayout'

const HomePage = lazy(() => import('../pages/HomePage/HomePage').then((module) => ({ default: module.HomePage })))
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage').then((module) => ({ default: module.LoginPage })))
const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage').then((module) => ({ default: module.RegisterPage })))
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage/ForgotPasswordPage').then((module) => ({ default: module.ForgotPasswordPage })))
const AuthenticatedLandingPage = lazy(() => import('../pages/AuthenticatedLandingPage/AuthenticatedLandingPage').then((module) => ({ default: module.AuthenticatedLandingPage })))
const DashboardPage = lazy(() => import('../pages/DashboardPage/DashboardPage').then((module) => ({ default: module.DashboardPage })))
const TitlesPage = lazy(() => import('../pages/TitlesPage/TitlesPage').then((module) => ({ default: module.TitlesPage })))
const UserPage = lazy(() => import('../pages/UserPage/UserPage').then((module) => ({ default: module.UserPage })))
const CostCenterPage = lazy(() => import('../pages/CostCenterPage/CostCenterPage').then((module) => ({ default: module.CostCenterPage })))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage').then((module) => ({ default: module.NotFoundPage })))

export function AppRouter() {
  return (
    <Suspense fallback={<main aria-busy="true">Carregando...</main>}>
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
            <Route path="/centro-de-custos" element={<CostCenterPage />} />
            <Route path="/titulos" element={<TitlesPage />} />
            <Route path="/usuario" element={<UserPage />} />
          </Route>
        </Route>

        <Route element={<NotFoundLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
