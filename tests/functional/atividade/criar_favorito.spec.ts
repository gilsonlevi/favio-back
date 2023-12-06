import { test } from '@japa/runner'

test.group('Criar favorito', () => {
  // Testes com o metodo POST para criar novos favoritos
  test('criar favorito', async ({ client }) => {
    const respota = await client
      .post('/favoritos')
      .json({ nome: 'IFRN', url: 'www.ifrn.edu.br', importante: false })
    respota.assertStatus(201)
    respota.assertBodyContains({ nome: 'IFRN' })
  })
  test('criar favorito com campo faltante', async ({ client }) => {
    const resposta = await client
      .post('/favoritos')
      .json({ url: 'www.ifrn.edu.br', importante: false })
    resposta.assertStatus(400)
  })
  test('criar favorito que já existe', async ({ client }) => {
    const resposta = await client
      .post('/favoritos')
      .json({ nome: 'IFRN', url: 'http://www.ifrn.com.br', importante: false })
    resposta.assertStatus(400)
  })
})
