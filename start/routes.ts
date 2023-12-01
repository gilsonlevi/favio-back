/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

const favoritos = [
  { id: 1, nome: 'google', url: 'http://www.google.com', importante: true },
  { id: 2, nome: 'google', url: 'http://www.google.com', importante: true },
]

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/favoritos', async () => {
  return [{ id: 1, nome: 'google', url: 'http://www.google.com', importante: true }]
})

Route.get('/favoritos/:id', async ({ params, response }) => {
  // console.log(array)
  // array.map((e)=>console.log(e.id))
  const found = favoritos.find((favorito) => favorito.id == params.id)
  if (found == undefined) {
    return response.status(404)
  }
  return found
})

Route.get('/favoritos/:nome', async ({ params }) => {
  return { id: 1, nome: params.nome, url: 'http://www.google.com', importante: true }
})
