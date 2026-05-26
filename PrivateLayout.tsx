import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './PrimaryButton.css'

interface PrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  footer?: ReactNode
  fullWidth?: boolean
}

export function PrimaryButton({
  children,
  footer,
  fullWidth = false,
  ...props
}: PrimaryButtonProps) {
  return (
    <div className="primary-button-wrapper">
      <button
        className={`primary-button ${fullWidth ? 'primary-button--full' : ''}`}
        {...props}
      >
        {children}
      </button>

      {footer && <div className="primary-button__footer">{footer}</div>}
    </div>
  )
}
