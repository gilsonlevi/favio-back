// ROTAS
import Route from '@ioc:Adonis/Core/Route'

// Array de favoritos
const favoritos = [
  { id: 1, nome: 'IFRN', url: 'http://www.ifrn.com.br', importante: true },
  { id: 2, nome: 'GOOGLE', url: 'http://www.google.com.br', importante: true },
  { id: 3, nome: 'UOL', url: 'http://www.uol.com.br', importante: true },
]

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
  }
  return found
})

// Metodo GET para buscar favoritos pelo nome
Route.get('/favoritos/:nome', async ({ params }) => {
  return { id: 1, nome: params.nome, url: 'http://www.google.com', importante: true }
})

// Metodo POST para criar favorito
Route.post('/favoritos', async ({ request, response }) => {
  const { nome, url, importante } = request.body()
  const newFavorito = { id: favoritos.length + 1, nome, url, importante }
  
  if (newFavorito.nome == null || newFavorito.url == null) {
    return response.status(400).send(newFavorito)
  }else{
    favoritos.push(newFavorito)
    return response.status(201).send(newFavorito)
  }
})

Route.delete('/favoritos', async ({ request, response }) => {
  const { nome } = request.body()

  favoritos.forEach(element => {
    if (element.nome == nome) {
      let found = favoritos.indexOf(element)
      favoritos.splice(found, 0)
      response.status(204)
    } else {
      response.status(404)
    }
  });
})

Route.put('/favoritos/:id', async ({ params, request, response }) => {
  const { nome, url, importante } = request.body()

  const found = favoritos.find((favorito) => favorito.id == params.id)
  if(found == undefined) {
    response.status(404)
  }else {
    if(nome !== undefined){
      favoritos[found.id - 1].nome = nome
    }
    if (url !== undefined) {
      favoritos[found.id - 1].url = url
    }
    if (importante !== undefined){
      favoritos[found.id - 1].importante = importante
    }
    response.status(201).send(favoritos[found.id - 1])
  }

})


