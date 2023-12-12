import { Test, test } from '@japa/runner'

test.group('Criar favoritos', () => {
  test('criar favorito', async ({ client }) => {
    const respota = await client
      .post('/favoritos')
      .json({ nome: 'OBMEP', url: 'www.obmep.com.br', importante: false })
    respota.assertStatus(201)
    respota.assertBodyContains({ nome: 'OBMEP' })
  })
  test('criar favorito com campo faltante', async ({ client }) => {
    const resposta = await client
      .post('/favoritos')
      .json({ url: 'www.ifrn.edu.br', importante: false })
    resposta.assertStatus(400)
  })
})
