export type HomeShortcut = {
  title: string
  description: string
  path: string
  status: string
  buttonLabel: string
  disabled?: boolean
}

export const shortcuts: HomeShortcut[] = [
  {
    title: 'Dashboard',
    description:
      'Veja o resumo financeiro principal e acompanhe a evolução da operação.',
    path: '/dashboard',
    status: 'Disponível agora',
    buttonLabel: 'Abrir painel',
  },
  {
    title: 'Centro de Custos',
    description: 'Veja os centros de custos criados para organizar suas finanças.',
    path: '/centro-de-custos',
    status: 'Disponível agora',
    buttonLabel: 'Abrir cadastro',
  },
  {
    title: 'Títulos',
    description:
      'A área de títulos concentra os registros financeiros do projeto.',
    path: '/titulos',
    status: 'Disponível agora',
    buttonLabel: 'Abrir cadastro',
  },
  {
    title: 'Usuário',
    description:
      'Consulte seus dados atuais e acompanhe a evolução da área de perfil da conta.',
    path: '/usuario',
    status: 'Disponível agora',
    buttonLabel: 'Acessar perfil',
  },
]
