import { test } from '@japa/runner'

test.group('Criar favorito', () => {
  // Testes com o metodo POST para criar novos favoritos
  test('criar favorito', async ({ client }) => {
    const respota = await client
      .post('/favoritos')
      .json({ nome: 'GLOBO', url: 'www.g1.com.br', importante: false })
    respota.assertStatus(201)
    respota.assertBodyContains({ nome: 'GLOBO' })
  })
  test('criar favorito com campo faltante', async ({ client }) => {
    const resposta = await client
      .post('/favoritos')
      .json({ url: 'www.portal.edu.br', importante: false })
    resposta.assertStatus(400)
  })
  test('criar favorito que já existe', async ({ client }) => {
    const resposta = await client
      .post('/favoritos')
      .json({ nome: 'CNN', url: 'http://www.cnn.com.br', importante: true })
    resposta.assertStatus(400)
  })
})
