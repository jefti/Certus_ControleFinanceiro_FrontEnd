import {
  validateForgotPasswordForm,
  validateRegisterForm,
  validateResetPasswordForm,
  validateSignInForm,
} from './auth'

describe('validacoes de autenticacao', () => {
  it('aceita um cadastro valido', () => {
    expect(validateRegisterForm({
      nome: 'Maria Silva',
      email: 'maria@email.com',
      celular: '(85) 99999-9999',
      senha: '123456',
      confirmarSenha: '123456',
    })).toEqual({})
  })

  it('rejeita cadastro com campos invalidos e senhas diferentes', () => {
    const errors = validateRegisterForm({
      nome: 'Ma',
      email: 'email-invalido',
      celular: '123',
      senha: '123456',
      confirmarSenha: '654321',
    })

    expect(errors).toMatchObject({
      nome: 'O nome deve ter pelo menos 3 caracteres.',
      email: 'Informe um email valido.',
      celular: 'Informe um celular valido.',
      confirmarSenha: 'As senhas devem ser iguais.',
    })
  })

  it('exige credenciais no login', () => {
    expect(validateSignInForm({ email: '', senha: '' })).toEqual({
      email: 'Email e obrigatorio.',
      senha: 'Senha e obrigatorio.',
    })
  })

  it('valida solicitacao e redefinicao de senha', () => {
    expect(validateForgotPasswordForm({ email: 'teste@email.com' })).toEqual({})
    expect(validateResetPasswordForm({
      email: 'teste@email.com',
      codigo: '123456',
      novaSenha: 'abcdef',
      confirmarSenha: 'abcdef',
    })).toEqual({})
  })
})
