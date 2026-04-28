import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FloatingAlert } from "../../components/FloatingAlert/FloatingAlert";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";
import { TextField } from "../../components/TextField/TextField";
import { getApiErrorMessage } from "../../services/httpError";
import { registerUserRequest } from "../../services/userService";
import { getFirstValidationMessage } from "../../utils/formFeedback";
import { validateRegisterForm, type ValidationErrors } from "../../validations";
import type { RegisterFormData } from "../../validations";
import "./RegisterPage.css";

export function RegisterPage() {
  const navigate = useNavigate();
  const redirectTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        window.clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  function normalizeEmail(value: string) {
    return value.trim().toLowerCase();
  }

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors<keyof RegisterFormData>>({});
  const [alertMessage, setAlertMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData: RegisterFormData = {
      nome,
      email: normalizeEmail(email),
      celular,
      senha,
      confirmarSenha,
    };

    const validationErrors = validateRegisterForm(formData);
    setFieldErrors(validationErrors);
    setSuccessMessage("");

    if (Object.keys(validationErrors).length > 0) {
      const validationMessage = getFirstValidationMessage(validationErrors);

      if (validationMessage) {
        setAlertMessage(validationMessage);
      }

      return;
    }

    try {
      setIsSubmitting(true);
      await registerUserRequest({
        nome: nome.trim(),
        email: formData.email,
        senha,
        celular: celular.trim(),
      });

      setSuccessMessage("Cadastro realizado com sucesso. Voce ja pode fazer login.");

      redirectTimeoutRef.current = window.setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      const errorMessage = getApiErrorMessage(error, "Nao foi possivel concluir o cadastro.");
      setAlertMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  const registerComponent = (
    <span className="login-register-text">
      Ja possui uma conta?{" "}
      <Link className="login-register-link" to="/login">
        Fazer login
      </Link>
    </span>
  );

  return (
    <section className="login-page">
      <FloatingAlert
        isOpen={Boolean(alertMessage)}
        title="Nao foi possivel concluir o cadastro"
        message={alertMessage}
        onClose={() => setAlertMessage("")}
      />

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
            error={fieldErrors.nome}
            onChange={(event) => setNome(event.target.value)}
          />
          <TextField
            label="Seu Email:"
            type="email"
            placeholder="seu@email.com"
            value={email}
            error={fieldErrors.email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            label="Seu Telefone:"
            type="tel"
            placeholder="(00) 00000-0000"
            value={celular}
            error={fieldErrors.celular}
            onChange={(event) => setCelular(event.target.value)}
          />
          <TextField
            label="Sua Senha:"
            type="password"
            placeholder="Minimo 6 caracteres"
            value={senha}
            error={fieldErrors.senha}
            onChange={(event) => setSenha(event.target.value)}
          />
          <TextField
            label="Confirmar Senha:"
            type="password"
            placeholder="Repita sua senha"
            value={confirmarSenha}
            error={fieldErrors.confirmarSenha}
            onChange={(event) => setConfirmarSenha(event.target.value)}
          />

          {successMessage && (
            <p className="login-form-message login-form-message--success">{successMessage}</p>
          )}

          <div className="login-footer">
            <PrimaryButton type="submit" disabled={isSubmitting} footer={registerComponent}>
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </section>
  );
}
