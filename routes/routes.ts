// ROTAS
import Route from '@ioc:Adonis/Core/Route'

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

Route.group(() => {
  // Rota padrão
  Route.get('/', async ({ view }) => {
    return view.render('home')
  })

  Route.resource('favoritao', 'FavoritosController').apiOnly()

  Route.resource('user', 'UsersController').apiOnly()
})
