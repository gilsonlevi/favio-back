import { test } from '@japa/runner'

// Testando metodo GET
test.group('Cinco operacoes', () => {
  test('buscar favorito com id', async ({ client }) => {
    const resposta = await client.get('/favoritos/1')
    resposta.assertStatus(200)
    resposta.assertBodyContains({ id: 1 })
  })

  // Testando metodo POST
  test('criar favorito', async ({ client }) => {
    const respota = await client
      .post('/favoritos')
      .json({ nome: 'IFRN', url: 'www.ifrn.edu.br', importante: false })
    respota.assertStatus(201)
    respota.assertBodyContains({ nome: 'IFRN' })
  })

  test('deletar pelo nome', async ({ client }) => {
    const respota = await client.delete('/favoritos/').json({ nome: 'IFRN' })
    respota.assertStatus(204)
  })
})
