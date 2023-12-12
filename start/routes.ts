// ROTAS
import Route from '@ioc:Adonis/Core/Route'
import { retrieveSourceMap } from 'source-map-support'

// Array de favoritos
let favoritos = [
  { id: 1, nome: 'IFRN', url: 'http://www.ifrn.com.br', importante: true },
  { id: 2, nome: 'GOOGLE', url: 'http://www.google.com.br', importante: true },
  { id: 3, nome: 'UOL', url: 'http://www.uol.com.br', importante: true },
  { id: 4, nome: 'CNN', url: 'http://www.cnn.com.br', importante: true },
  { id: 5, nome: 'UFRN', url: 'http://www.ufrn.com.br', importante: true },
  { id: 6, nome: 'FUNCERN', url: 'http://www.funcern.com.br', importante: true },
  { id: 7, nome: 'FLAMENGO', url: 'http://www.flamengo.com.br', importante: true },
]

console.log("Tamanho do array", favoritos.length)

// Rota padrão
Route.get('/', async () => {
  return { hello: 'world' }
})

// Rota para pegar todos os favoritos
Route.get('/favoritos', async () => {
  return favoritos
})

// Metodo GET para buscar favoritos pelo ID
Route.get('/favoritos/:id', async ({ params, response }) => {
  const found = favoritos.find((favorito) => favorito.id == params.id)
  if (found == undefined) {
    return response.status(404).send({})
  }else {
    return response.status(200).send(found)
  }
})

// Metodo POST para criar favorito
Route.post('/favoritos', async ({ request, response }) => {
  const { nome, url, importante } = request.body()
  const newFavorito = { id: favoritos.length + 1, nome, url, importante }

  const found = favoritos.find((favorito) => favorito.nome == nome && favorito.url == url)
  console.log('Favorito encontrado', found)

  if (newFavorito.nome == null || newFavorito.url == null) {
    return response.status(400).send(newFavorito)
  } else if (found !== undefined) {
    return response.status(400)
  } else {
    favoritos.push(newFavorito)
    return response.status(201).send(newFavorito)
  }
})

Route.delete('/favoritos', async ({ request, response }) => {
  const { nome } = request.body()

  favoritos.forEach((element) => {
    if (element.nome == nome) {
      console.log("Favorito encontrado", element)
      let found = favoritos.indexOf(element)
      console.log(found)
      console.log('Favorito antes de ser excluido',favoritos[found] ) 
      favoritos.splice(found, 1)
      console.log('Favorito depois de ser excluido',favoritos[found] ) 

      response.status(204)
    } else {
      response.status(404)
    }
  })
})

Route.put('/favoritos/:id', async ({ params, request, response }) => {
  const { nome, url, importante } = request.body()

  const found = favoritos.find((favorito) => favorito.id == params.id)
  if (found == undefined) {
    response.status(404)
  } else {
    if (nome !== undefined) {
      favoritos[found.id - 1].nome = nome
    }
    if (url !== undefined) {
      favoritos[found.id - 1].url = url
    }
    if (importante !== undefined) {
      favoritos[found.id - 1].importante = importante
    }
    response.status(201).send(favoritos[found.id - 1])
  }
})

Route.resource('favoritao', 'FavoritosController').apiOnly()
