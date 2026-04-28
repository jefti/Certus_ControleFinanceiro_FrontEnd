export interface ValidationResult {
  isValid: boolean
  message?: string
}

function success(): ValidationResult {
  return { isValid: true }
}

function failure(message: string): ValidationResult {
  return { isValid: false, message }
}

export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (!value.trim()) {
    return failure(`${fieldName} e obrigatorio.`)
  }

  return success()
}

export function validateEmail(email: string): ValidationResult {
  const required = validateRequired(email, 'Email')

  if (!required.isValid) {
    return required
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email.trim())) {
    return failure('Informe um email valido.')
  }

  return success()
}

export function validatePassword(password: string): ValidationResult {
  const required = validateRequired(password, 'Senha')

  if (!required.isValid) {
    return required
  }

  if (password.length < 6) {
    return failure('A senha deve ter pelo menos 6 caracteres.')
  }

  return success()
}

export function validateName(name: string): ValidationResult {
  const required = validateRequired(name, 'Nome')

  if (!required.isValid) {
    return required
  }

  if (name.trim().length < 3) {
    return failure('O nome deve ter pelo menos 3 caracteres.')
  }

  return success()
}

export function validatePhone(phone: string): ValidationResult {
  const digits = phone.replace(/\D/g, '')

  if (!digits) {
    return failure('Celular e obrigatorio.')
  }

  if (digits.length < 10 || digits.length > 11) {
    return failure('Informe um celular valido.')
  }

  return success()
}
