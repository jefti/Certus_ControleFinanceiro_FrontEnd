import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPasswordPage.css";
import { TextField } from "../../components/TextField/TextField";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";

export function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.com$/.test(email);
  }

  useEffect(() => {
    if (!codeSent || secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [codeSent, secondsLeft]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError("Digite um email válido (ex: usuario@email.com)");
      return;
    }

    setError("");
    setCodeSent(true);
    setSecondsLeft(60);

    console.log("Código enviado para:", email);
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

  function handleResendCode() {
    setSecondsLeft(60);
    setCode(["", "", "", "", "", ""]);
    console.log("Código reenviado para:", email);
  }

  const backToLoginComponent = (
    <span className="forgot-password-register-text">
      Lembrou sua senha?{" "}
      <a
        className="forgot-password-register-link"
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        Voltar para login
      </a>
    </span>
  );

  return (
    <section className="forgot-password-page">
      <div className="forgot-password-card">
        <div className="forgot-password-logo">
          <img
            className="forgotPasswordPage-Img"
            src="/logo-certus.png"
            alt="Certus"
          />
        </div>

        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <h2 className="forgot-password-title">Recuperação de Senha</h2>

          <p className="forgot-password-description">
            Informe seu e-mail para receber as instruções de recuperação.
          </p>

          <TextField
            label="Seu Email:"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          {error && <p className="error-message">{error}</p>}

          <div className="forgot-password-footer">
            <PrimaryButton type="submit" footer={backToLoginComponent}>
              Resetar Senha
            </PrimaryButton>
          </div>

          {codeSent && (
            <div className="forgot-password-code-box">
              <p className="forgot-password-success-message">
                Código enviado com sucesso.
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
                    onChange={(e) =>
                      handleCodeChange(e.target.value, index)
                    }
                  />
                ))}
              </div>

              <p className="forgot-password-timer">
                {secondsLeft > 0
                  ? `Reenviar código em ${secondsLeft}s`
                  : "Você já pode reenviar o código."}
              </p>

              <button
                type="button"
                className="forgot-password-resend-button"
                onClick={handleResendCode}
                disabled={secondsLeft > 0}
              >
                Reenviar código
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}