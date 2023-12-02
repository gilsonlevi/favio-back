import { test } from '@japa/runner'

test.group('Excluir favorito', () => {
  test('deletar pelo nome', async ({ client }) => {
    const respota = await client.delete('/favoritos/').json({ nome: 'IFRN' })
    respota.assertStatus(204)
  })
})
