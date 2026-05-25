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
      'Veja o resumo financeiro principal e acompanhe a evolu\u00e7\u00e3o da opera\u00e7\u00e3o.',
    path: '/dashboard',
    status: 'Dispon\u00edvel agora',
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
    title: 'T\u00edtulos',
    description:
      'A \u00e1rea de t\u00edtulos est\u00e1 sendo preparada para concentrar os registros financeiros do projeto.',
    path: '/titulos',
    status: 'Em constru\u00e7\u00e3o',
    buttonLabel: 'Ver planejamento',
  },
  {
    title: 'Usu\u00e1rio',
    description:
      'Consulte seus dados atuais e acompanhe a evolu\u00e7\u00e3o da \u00e1rea de perfil da conta.',
    path: '/usuario',
    status: 'Conta',
    buttonLabel: 'Acessar perfil',
  },
]
