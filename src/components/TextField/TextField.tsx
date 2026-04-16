import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'
import './TextField.css'

export interface TextFieldHandle {
  focus: () => void
  clear: () => void
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  leftContent?: ReactNode
  rightContent?: ReactNode
  error?: string
}

export const TextField = forwardRef<TextFieldHandle, TextFieldProps>(
  ({ label, leftContent, rightContent, error, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
      focus() {
        inputRef.current?.focus()
      },
      clear() {
        if (inputRef.current) {
          inputRef.current.value = ''
        }
      },
    }))

    return (
      <div className="text-field">
        <label className="text-field__label">{label}</label>

        <input ref={inputRef} className="text-field__input" {...props} />

        {(leftContent || rightContent) && (
          <div className="text-field__footer">
            <div className="text-field__footer-left">{leftContent}</div>
            <div className="text-field__footer-right">{rightContent}</div>
          </div>
        )}

        {error && <span className="text-field__error">{error}</span>}
      </div>
    )
  },
)

TextField.displayName = 'TextField'
