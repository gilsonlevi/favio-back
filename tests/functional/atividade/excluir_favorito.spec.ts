import { test } from '@japa/runner'

test.group('Excluir favorito', () => {
  test('deletar pelo nome', async ({ client }) => {
    const respota = await client.delete('/favoritos').json({ nome: 'FLAMENGO' })
    respota.assertStatus(204)
  })

  test('deletar favorito que não existe', async ({ client }) => {
    const respota = await client.delete('/favoritos').json({ nome: 'SBT' })
    respota.assertStatus(404)
  })
})
