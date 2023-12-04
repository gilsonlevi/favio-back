import { test } from '@japa/runner'

test.group('Atualizar favorito', () => {
  test('atualizar favorito', async ({client}) => {
    const respota = await client.put('/favoritos/1').json({nome: 'SGA', url: 'sga.com.br', importante: true})
    respota.assertStatus(201)
  })

  test('atualizando favorito inexistente', async ({client}) => {
    const resposta = await client.put('favoritos/idnaoexiste').json({nome: 'SGA', url: 'sga.com.br', importante: true})
    resposta.assertStatus(404)
  })

  test('atualizando favorito com campo faltante', async ({client}) => {
    const resposta = await client.put('favoritos/1').json({nome: 'SGA', importante: true})
    resposta.assertStatus(201)
    resposta.assertBodyContains({id: 1, nome: 'SGA', url: 'http://www.ifrn.com.br', importante: true })
  })
})
