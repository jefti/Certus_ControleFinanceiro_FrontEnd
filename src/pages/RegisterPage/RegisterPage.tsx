import { useState } from "react";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";
import { TextField } from "../../components/TextField/TextField";
import "./RegisterPage.css";


export function RegisterPage() {

  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
   
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
      console.log("Nome:", nome);
      console.log("Email:", email);
      console.log("Senha:", senha);
      console.log("Confirmar Senha:", confirmarSenha);
  }

  const registerComponent = (
    <span className="login-register-text">
      Já possui uma conta?{" "}
      <a className="login-register-link" href="/login">
        Fazer login
      </a>
    </span>
  );

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <img className="loginPage-Img" src="/logo-certus.png" alt="Certus" />
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            label="Nome Completo:"
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
          <TextField
            label="Seu Email:"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            label="Sua Senha:"
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />
          <TextField
            label="Confirmar Senha:"
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={confirmarSenha}
            onChange={(event) => setConfirmarSenha(event.target.value)}
          />


          <div className="login-footer">
            <PrimaryButton type="submit" footer={registerComponent}>
              Cadastrar
            </PrimaryButton >

          </div>
        </form>
      </div>
    </section>
  );
}

