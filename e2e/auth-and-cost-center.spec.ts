import { expect, test, type Page } from '@playwright/test'

const usuario = {
  id: 1,
  nome: 'Maria Silva',
  email: 'maria@email.com',
  celular: '85999999999',
}

async function mockLogin(page: Page) {
  await page.route('http://api.test/api/auth/login', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ token: 'jwt-e2e', usuario }),
    })
  })
}

test('visitante e redirecionado para login e consegue entrar', async ({ page }) => {
  await mockLogin(page)

  await page.goto('/dashboard')
  await expect(page).toHaveURL(/\/login$/)

  await page.getByPlaceholder('seu@email.com').fill('MARIA@EMAIL.COM ')
  await page.getByPlaceholder('********').fill('123456')
  await page.getByRole('button', { name: 'Entrar' }).click()

  await expect(page).toHaveURL(/\/inicio$/)
  await expect(page.getByRole('heading', { name: 'Olá, Maria.' })).toBeVisible()

  const session = await page.evaluate(() => localStorage.getItem('@certus:auth'))
  expect(session).toContain('jwt-e2e')
})

test('usuario autenticado cadastra centro de custo e encerra sessao', async ({ page }) => {
  await mockLogin(page)
  await page.route('http://api.test/api/centros-de-custo/obter', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
  })
  await page.route('http://api.test/api/centros-de-custo/cadastrar', async (route) => {
    expect(route.request().headers().authorization).toBe('Bearer jwt-e2e')
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ id: 10, descricao: 'Moradia', observacao: 'Despesas da casa' }),
    })
  })

  await page.goto('/login')
  await page.getByPlaceholder('seu@email.com').fill('maria@email.com')
  await page.getByPlaceholder('********').fill('123456')
  await page.getByRole('button', { name: 'Entrar' }).click()
  await page.goto('/centro-de-custos')

  await page.getByPlaceholder('Ex: Alimentacao, Transporte, Salario').fill('Moradia')
  await page.getByPlaceholder('Ex: Centro usado para classificar despesas mensais de transporte.').fill('Despesas da casa')
  await page.getByRole('button', { name: 'Cadastrar centro de custo' }).click()

  await expect(page.getByText('Centro de custo cadastrado com sucesso.')).toBeVisible()
  await expect(page.getByText('Moradia').first()).toBeVisible()

  await page.getByText('Usuario conectado').click()
  await page.getByRole('button', { name: 'Sair' }).click()
  await expect(page).toHaveURL(/\/login$/)
  expect(await page.evaluate(() => localStorage.getItem('@certus:auth'))).toBeNull()
})
