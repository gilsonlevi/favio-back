import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const favoritos = [{ id: 1, nome: 'IFRN', url: 'http://www.google.com.br', importante: true }]

export default class FavoritosController {
  public async index({}: HttpContextContract) {
    return favoritos
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const { nome, url, importante } = request.body()
    const newFavorito = { id: favoritos.length + 1, nome, url, importante }

    const found = favoritos.find((favorito) => favorito.nome == nome && favorito.url == url)
    if (newFavorito.nome == null || newFavorito.url == null) {
      return response.status(400).send(newFavorito)
    } else if (found !== undefined) {
      return response.status(400)
    } else {
      favoritos.push(newFavorito)
      return response.status(201).send(newFavorito)
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const found = favoritos.find((favorito) => favorito.id == params.id)
    if (found == undefined) {
      return response.status(404).send({})
    } else {
      return response.status(200).send(found)
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { nome, url, importante } = request.body()

    const found = favoritos.find((favorito) => favorito.id == params.id)
    if (found == undefined) {
      response.status(404)
    } else {
      const encontrar = favoritos.find((favorito) => favorito.nome == nome && favorito.url == url)
      if (encontrar == undefined) {
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
      } else {
        response.status(404)
      }
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const found = favoritos.findIndex((favorito) => favorito.id == params.id)

    if (found !== -1) {
      favoritos.splice(found, 1)
      response.status(204)
    } else {
      response.status(404)
    }
  }
}
