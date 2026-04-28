import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FloatingAlert } from "../../components/FloatingAlert/FloatingAlert";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";
import { TextField } from "../../components/TextField/TextField";
import { getApiErrorMessage } from "../../services/httpError";
import {
  forgotPasswordRequest,
  resetPasswordRequest,
} from "../../services/passwordRecoveryService";
import { getFirstValidationMessage } from "../../utils/formFeedback";
import {
  validateForgotPasswordForm,
  validateResetPasswordForm,
  type ValidationErrors,
} from "../../validations";
import type {
  ForgotPasswordFormData,
  ResetPasswordFormData,
} from "../../validations";
import "./ForgotPasswordPage.css";

export function ForgotPasswordPage() {
  const navigate = useNavigate();

  function normalizeEmail(value: string) {
    return value.trim().toLowerCase();
  }

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [sendCodeErrors, setSendCodeErrors] =
    useState<ValidationErrors<keyof ForgotPasswordFormData>>({});
  const [resetErrors, setResetErrors] =
    useState<ValidationErrors<keyof ResetPasswordFormData>>({});
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (!codeSent || secondsLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [codeSent, secondsLeft]);

  async function handleSendCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData: ForgotPasswordFormData = { email: normalizeEmail(email) };
    const validationErrors = validateForgotPasswordForm(formData);

    setSendCodeErrors(validationErrors);
    setSuccessMessage("");

    if (Object.keys(validationErrors).length > 0) {
      const validationMessage = getFirstValidationMessage(validationErrors);

      if (validationMessage) {
        setAlertMessage(validationMessage);
      }

      return;
    }

    try {
      setIsSendingCode(true);
      const response = await forgotPasswordRequest({ email: formData.email });
      setCodeSent(true);
      setSecondsLeft(60);
      setSuccessMessage(response.message);
    } catch (error) {
      const errorMessage = getApiErrorMessage(
        error,
        "Nao foi possivel enviar o codigo de recuperacao.",
      );
      setAlertMessage(errorMessage);
    } finally {
      setIsSendingCode(false);
    }
  }

  async function handleResetPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData: ResetPasswordFormData = {
      email: normalizeEmail(email),
      codigo: code.join(""),
      novaSenha: senha,
      confirmarSenha,
    };

    const validationErrors = validateResetPasswordForm(formData);

    setResetErrors(validationErrors);
    setSuccessMessage("");

    if (Object.keys(validationErrors).length > 0) {
      const validationMessage = getFirstValidationMessage(validationErrors);

      if (validationMessage) {
        setAlertMessage(validationMessage);
      }

      return;
    }

    try {
      setIsResettingPassword(true);
      const response = await resetPasswordRequest({
        email: formData.email,
        codigo: formData.codigo,
        novaSenha: senha,
      });

      setSuccessMessage(response.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      const errorMessage = getApiErrorMessage(error, "Nao foi possivel redefinir a senha.");
      setAlertMessage(errorMessage);
    } finally {
      setIsResettingPassword(false);
    }
  }

  function handleCodeChange(value: string, index: number) {
    const onlyNumber = value.replace(/\D/g, "").slice(0, 1);
    const newCode = [...code];
    newCode[index] = onlyNumber;
    setCode(newCode);

    if (onlyNumber && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }
  }

  async function handleResendCode() {
    try {
      setSuccessMessage("");
      setIsSendingCode(true);
      const response = await forgotPasswordRequest({ email: normalizeEmail(email) });
      setSecondsLeft(60);
      setCode(["", "", "", "", "", ""]);
      setSuccessMessage(response.message);
    } catch (error) {
      const errorMessage = getApiErrorMessage(
        error,
        "Nao foi possivel reenviar o codigo de recuperacao.",
      );
      setAlertMessage(errorMessage);
    } finally {
      setIsSendingCode(false);
    }
  }

  const backToLoginComponent = (
    <span className="forgot-password-register-text">
      Lembrou sua senha?{" "}
      <Link className="forgot-password-register-link" to="/login">
        Voltar para login
      </Link>
    </span>
  );

  return (
    <section className="forgot-password-page">
      <FloatingAlert
        isOpen={Boolean(alertMessage)}
        title="Nao foi possivel continuar"
        message={alertMessage}
        onClose={() => setAlertMessage("")}
      />

      <div className="forgot-password-card">
        <div className="forgot-password-logo">
          <img
            className="forgotPasswordPage-Img"
            src="/logo-certus.png"
            alt="Certus"
          />
        </div>

        <form
          className="forgot-password-form"
          onSubmit={codeSent ? handleResetPassword : handleSendCode}
        >
          <TextField
            label="Seu Email:"
            type="email"
            placeholder="seu@email.com"
            disabled={codeSent}
            value={email}
            error={sendCodeErrors.email || resetErrors.email}
            onChange={(event) => setEmail(event.target.value)}
          />

          {codeSent && (
            <>
              <TextField
                label="Nova senha:"
                type="password"
                placeholder="Minimo 6 caracteres"
                value={senha}
                error={resetErrors.novaSenha}
                onChange={(event) => setSenha(event.target.value)}
              />
              <TextField
                label="Confirmar Senha:"
                type="password"
                placeholder="Repita sua nova senha"
                value={confirmarSenha}
                error={resetErrors.confirmarSenha}
                onChange={(event) => setConfirmarSenha(event.target.value)}
              />
            </>
          )}

          {successMessage && (
            <p className="forgot-password-form-message forgot-password-form-message--success">
              {successMessage}
            </p>
          )}

          <div className="forgot-password-footer">
            <PrimaryButton
              type="submit"
              disabled={isSendingCode || isResettingPassword}
              footer={backToLoginComponent}
            >
              {codeSent
                ? isResettingPassword
                  ? "Salvando..."
                  : "Resetar Senha"
                : isSendingCode
                ? "Enviando..."
                : "Enviar Codigo"}
            </PrimaryButton>
          </div>

          {codeSent && (
            <div className="forgot-password-code-box">
              <p className="forgot-password-success-message">
                Digite o codigo de 6 digitos enviado para o seu email.
              </p>

              <div className="forgot-password-code-inputs">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-input-${index}`}
                    className="forgot-password-code-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(event) => handleCodeChange(event.target.value, index)}
                  />
                ))}
              </div>

              {resetErrors.codigo && (
                <p className="forgot-password-form-message forgot-password-form-message--error">
                  {resetErrors.codigo}
                </p>
              )}

              <p className="forgot-password-timer">
                {secondsLeft > 0
                  ? `Reenviar codigo em ${secondsLeft}s`
                  : "Voce ja pode reenviar o codigo."}
              </p>

              <button
                type="button"
                className="forgot-password-resend-button"
                onClick={handleResendCode}
                disabled={secondsLeft > 0 || isSendingCode}
              >
                Reenviar codigo
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
