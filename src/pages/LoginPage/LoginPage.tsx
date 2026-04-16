import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export function LoginPage() {
  
  const { signIn } = useAuth()
  const navigate = useNavigate()

  async function handleDevLogin() {
    await signIn({
      email: 'teste@email.com',
      senha: '123456',
    })

    navigate('/inicio')
  }
  
  return (
    <main>
      <h1>Login</h1>

      <button onClick={handleDevLogin}>
        Entrar automaticamente
      </button>
    </main>
  )
}
