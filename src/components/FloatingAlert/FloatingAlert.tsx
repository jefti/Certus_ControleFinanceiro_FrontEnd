import "./FloatingAlert.css";

interface FloatingAlertProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  actionLabel?: string;
}

export function FloatingAlert({
  isOpen,
  title,
  message,
  onClose,
  actionLabel = "Ok",
}: FloatingAlertProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="floating-alert__backdrop"
      role="presentation"
      onClick={onClose}
    >
      <section
        className="floating-alert"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="floating-alert-title"
        aria-describedby="floating-alert-message"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="floating-alert__eyebrow">Aviso do sistema</span>
        <h2 id="floating-alert-title" className="floating-alert__title">
          {title}
        </h2>
        <p id="floating-alert-message" className="floating-alert__message">
          {message}
        </p>

        <button
          type="button"
          className="floating-alert__button"
          onClick={onClose}
        >
          {actionLabel}
        </button>
      </section>
    </div>
  );
}
