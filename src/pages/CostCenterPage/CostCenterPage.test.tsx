import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { CostCenterPage } from './CostCenterPage'
import {
  createCostCenter,
  deleteCostCenter,
  getCostCenters,
  updateCostCenter,
} from '../../services/costCenterService'

vi.mock('../../services/costCenterService', () => ({
  createCostCenter: vi.fn(),
  deleteCostCenter: vi.fn(),
  getCostCenters: vi.fn(),
  updateCostCenter: vi.fn(),
}))

describe('CostCenterPage - integracao da tela com o servico', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getCostCenters).mockResolvedValue([])
  })

  it('carrega e apresenta centros de custo existentes', async () => {
    vi.mocked(getCostCenters).mockResolvedValue([
      { id: 1, descricao: 'Moradia', observacao: 'Despesas da casa' },
    ])

    render(<CostCenterPage />)

    expect((await screen.findAllByText('Moradia')).length).toBeGreaterThan(0)
    expect(screen.getAllByText('Despesas da casa').length).toBeGreaterThan(0)
  })

  it('cadastra um centro de custo e atualiza a lista', async () => {
    vi.mocked(createCostCenter).mockResolvedValue({
      id: 2,
      descricao: 'Transporte',
      observacao: 'Deslocamentos',
    })

    render(<CostCenterPage />)
    await screen.findByText('Nenhum centro de custo cadastrado ainda.')

    fireEvent.change(screen.getByPlaceholderText('Ex: Alimentacao, Transporte, Salario'), {
      target: { value: 'Transporte' },
    })
    fireEvent.change(screen.getByPlaceholderText('Ex: Centro usado para classificar despesas mensais de transporte.'), {
      target: { value: 'Deslocamentos' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar centro de custo' }))

    await waitFor(() => expect(createCostCenter).toHaveBeenCalledWith({
      descricao: 'Transporte',
      observacao: 'Deslocamentos',
    }))
    expect((await screen.findAllByText('Transporte')).length).toBeGreaterThan(0)
  })

  it('nao envia descricao duplicada', async () => {
    vi.mocked(getCostCenters).mockResolvedValue([
      { id: 1, descricao: 'Moradia', observacao: '' },
    ])

    render(<CostCenterPage />)
    await screen.findAllByText('Moradia')

    fireEvent.change(screen.getByPlaceholderText('Ex: Alimentacao, Transporte, Salario'), {
      target: { value: 'moradia' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar centro de custo' }))

    expect(await screen.findByText('Já existe um centro de custo com essa descrição.')).toBeInTheDocument()
    expect(createCostCenter).not.toHaveBeenCalled()
    expect(updateCostCenter).not.toHaveBeenCalled()
    expect(deleteCostCenter).not.toHaveBeenCalled()
  })
})
