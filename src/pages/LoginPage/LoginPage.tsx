import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FloatingAlert } from "../../components/FloatingAlert/FloatingAlert";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";
import { TextField } from "../../components/TextField/TextField";
import { useAuth } from "../../hooks/useAuth";
import { getApiErrorMessage } from "../../services/httpError";
import { getFirstValidationMessage } from "../../utils/formFeedback";
import { validateSignInForm, type ValidationErrors } from "../../validations";
import type { SignInFormData } from "../../validations";
import "./LoginPage.css";

export function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors<keyof SignInFormData>>({});
  const [alertMessage, setAlertMessage] = useState("");

  function normalizeEmail(value: string) {
    return value.trim().toLowerCase();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData: SignInFormData = { email: normalizeEmail(email), senha };
    const validationErrors = validateSignInForm(formData);

    setFieldErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const validationMessage = getFirstValidationMessage(validationErrors);

      if (validationMessage) {
        setAlertMessage(validationMessage);
      }

      return;
    }

    try {
      setIsSubmitting(true);
      await signIn(formData);

      if (lembrar) {
        localStorage.setItem("@certus:remember-email", formData.email);
      } else {
        localStorage.removeItem("@certus:remember-email");
      }

      navigate("/inicio");
    } catch (error) {
      const errorMessage = getApiErrorMessage(error, "Nao foi possivel entrar agora.");
      setAlertMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  const rememberPasswordComponent = (
    <label className="login-helper-text">
      <input
        type="checkbox"
        checked={lembrar}
        onChange={(event) => setLembrar(event.target.checked)}
      />{" "}
      Lembrar-me
    </label>
  );

  const forgotPasswordComponent = (
    <Link className="login-helper-link" to="/recuperar-senha">
      Esqueceu sua senha?
    </Link>
  );

  const registerComponent = (
    <span className="login-register-text">
      Ainda nao e cliente?{" "}
      <Link className="login-register-link" to="/cadastro">
        Cadastre-se
      </Link>
    </span>
  );

  return (
    <section className="login-page">
      <FloatingAlert
        isOpen={Boolean(alertMessage)}
        title="Nao foi possivel continuar"
        message={alertMessage}
        onClose={() => setAlertMessage("")}
      />

      <div className="login-card">
        <div className="login-logo">
          <img className="loginPage-Img" src="/logo-certus.png" alt="Certus" />
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            label="Seu Email:"
            type="email"
            placeholder="seu@email.com"
            value={email}
            error={fieldErrors.email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <TextField
            label="Sua Senha:"
            type="password"
            placeholder="********"
            value={senha}
            error={fieldErrors.senha}
            onChange={(event) => setSenha(event.target.value)}
            leftContent={rememberPasswordComponent}
            rightContent={forgotPasswordComponent}
          />
          <div className="login-footer">
            <PrimaryButton type="submit" disabled={isSubmitting} footer={registerComponent}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </section>
  );
}
