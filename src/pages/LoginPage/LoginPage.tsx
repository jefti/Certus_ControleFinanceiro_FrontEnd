import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./LoginPage.css";
import { useState } from "react";
import { TextField } from "../../components/TextField/TextField";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";

export function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await signIn({
      email: "teste@email.com",
      senha: "123456",
    });

    navigate("/inicio");
  }

  const rememberPasswordComponent = () => {
    return (
      <label className="login-helper-text">
        <input
          type="checkbox"
          checked={lembrar}
          onChange={(event) => setLembrar(event.target.checked)}
        />{" "}
        Lembrar-me
      </label>
    );
  };

  const forgotPasswordComponent = () => {
    return (
      <a className="login-helper-link" href="/recuperar-senha">
        Esqueceu Sua Senha?
      </a>
    );
  };

  const registerComponent = () => {
    return (
      <span className="login-register-text">
        Ainda não é cliente?{" "}
        <a className="login-register-link" href="/cadastro">
          Cadastre-se
        </a>
      </span>
    );
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <img className="loginPage-Img" src="/logo-certus.png" alt="Certus" />
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            label="Seu Email:"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <TextField
            label="Sua Senha:"
            type="password"
            placeholder="********"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            leftContent={rememberPasswordComponent()}
            rightContent={forgotPasswordComponent()}
          />

          <div className="login-footer">
            <PrimaryButton type="submit" footer={registerComponent()}>
              Entrar
            </PrimaryButton>
          </div>
        </form>
      </div>
    </section>
  );
}
