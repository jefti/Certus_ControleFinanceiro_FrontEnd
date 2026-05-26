import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateRequired,
} from './rules'

export interface SignInFormData {
  email: string
  senha: string
}

export interface RegisterFormData {
  nome: string
  email: string
  celular: string
  senha: string
  confirmarSenha: string
}

export interface ForgotPasswordFormData {
  email: string
}

export interface ResetPasswordFormData {
  email: string
  codigo: string
  novaSenha: string
  confirmarSenha: string
}

export type ValidationErrors<T extends string> = Partial<Record<T, string>>

export function validateSignInForm(
  data: SignInFormData,
): ValidationErrors<keyof SignInFormData> {
  const errors: ValidationErrors<keyof SignInFormData> = {}

  const email = validateEmail(data.email)
  const senha = validateRequired(data.senha, 'Senha')

  if (!email.isValid && email.message) {
    errors.email = email.message
  }

  if (!senha.isValid && senha.message) {
    errors.senha = senha.message
  }

  return errors
}

export function validateRegisterForm(
  data: RegisterFormData,
): ValidationErrors<keyof RegisterFormData> {
  const errors: ValidationErrors<keyof RegisterFormData> = {}

  const nome = validateName(data.nome)
  const email = validateEmail(data.email)
  const celular = validatePhone(data.celular)
  const senha = validatePassword(data.senha)
  const confirmarSenha = validateRequired(data.confirmarSenha, 'Confirmacao de senha')

  if (!nome.isValid && nome.message) {
    errors.nome = nome.message
  }

  if (!email.isValid && email.message) {
    errors.email = email.message
  }

  if (!celular.isValid && celular.message) {
    errors.celular = celular.message
  }

  if (!senha.isValid && senha.message) {
    errors.senha = senha.message
  }

  if (!confirmarSenha.isValid && confirmarSenha.message) {
    errors.confirmarSenha = confirmarSenha.message
  }

  if (data.senha && data.confirmarSenha && data.senha !== data.confirmarSenha) {
    errors.confirmarSenha = 'As senhas devem ser iguais.'
  }

  return errors
}

export function validateForgotPasswordForm(
  data: ForgotPasswordFormData,
): ValidationErrors<keyof ForgotPasswordFormData> {
  const errors: ValidationErrors<keyof ForgotPasswordFormData> = {}
  const email = validateEmail(data.email)

  if (!email.isValid && email.message) {
    errors.email = email.message
  }

  return errors
}

export function validateResetPasswordForm(
  data: ResetPasswordFormData,
): ValidationErrors<keyof ResetPasswordFormData> {
  const errors: ValidationErrors<keyof ResetPasswordFormData> = {}

  const email = validateEmail(data.email)
  const codigo = validateRequired(data.codigo, 'Codigo')
  const novaSenha = validatePassword(data.novaSenha)
  const confirmarSenha = validateRequired(data.confirmarSenha, 'Confirmacao de senha')

  if (!email.isValid && email.message) {
    errors.email = email.message
  }

  if (!codigo.isValid && codigo.message) {
    errors.codigo = codigo.message
  }

  if (!novaSenha.isValid && novaSenha.message) {
    errors.novaSenha = novaSenha.message
  }

  if (!confirmarSenha.isValid && confirmarSenha.message) {
    errors.confirmarSenha = confirmarSenha.message
  }

  if (data.novaSenha && data.confirmarSenha && data.novaSenha !== data.confirmarSenha) {
    errors.confirmarSenha = 'As senhas devem ser iguais.'
  }

  return errors
}
