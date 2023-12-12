// import { test } from '@japa/runner'

// test.group('Atualizar favorito', () => {
//   test('atualizar favorito', async ({client}) => {
//     const respota = await client.put('/favoritos/6').json({nome: 'SGA', url: 'sga.com.br', importante: true})
//     respota.assertStatus(201)
//   })

//   test('atualizando favorito inexistente', async ({client}) => {
//     const resposta = await client.put('favoritos/idnaoexiste').json({nome: 'SGA', url: 'sga.com.br', importante: true})
//     resposta.assertStatus(404)
//   })

//   test('atualizando favorito com campo faltante', async ({client}) => {
//     const resposta = await client.put('favoritos/3').json({nome: 'SGA', importante: true})
//     resposta.assertStatus(201)
//     resposta.assertBodyContains({id: 3, nome: 'SGA', url: 'http://www.uol.com.br', importante: true })
//   })
// })
