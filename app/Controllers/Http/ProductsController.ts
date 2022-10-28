import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProdutosController {
  public async store({ response, request }: HttpContextContract) {
    try {
      const data = request.only([
        'name',
        'price',
        'inventory',
        'description'
      ])
      const products = await Product.create(data)
      return response.status(200).json(products)
    } catch (error) {
      console.log(error)
      return response.status(400).json(`Error ao cadastrar o produto, Tente novamente mais tarde`)
    }
  }
  public async show({ params: { id }, response }: HttpContextContract) {
    try {
      const products = await Product.query()
        .where('id', '=', id)
        response.status(200).json(products)
    } catch (error) {
      return response.status(404).send('Produto não encontrado na base da dados')
    }
  }

  public async index({ request, response }: HttpContextContract) {
    try {

      /*  Get keyword search */
      let keyword = request.input('keyword')
      /* Get Limit Per page */
      let limit = 15
      /* Get Request Page */
      let page: number = request.input('page')

      const query = Product.query().orderBy('id', 'asc')
      //TODO: Concertar antes de ir para o ar
      if (keyword) {
        keyword = `'%${decodeURIComponent(keyword)}%'`
        query.whereRaw(`name like ${keyword}`)
      }
      const queryProduct = await query.paginate(page, limit)
      return response.status(200).json(queryProduct)
    } catch (error) {
      return response.status(400).send('Ops! error ao trazer dados do banco de dados')
    }
  }

  public async update({ params: { id }, request, response}: HttpContextContract) {
    const product = await Product.findOrFail(id)
    try {
      const data = request.only([
        'name',
        'price',
        'inventory',
        'description'

      ])
      product.merge(data)
      await product.save()
      return response.status(200).json(`O produto ${data.name} foi atualizado com sucesso!`)
    } catch (error) {
      return response.status(400).json(`Ocorreu um error ao atualizar o produto`)
    }
  }

  public async destroy({params: { id }, response}: HttpContextContract) {

    try {
      const product = await Product.findOrFail(id)
      await product.delete()
      return response.status(200).json(`O produto ${product.name} foi deletado com sucesso!`)
    } catch (error) {
      return response.status(400).json(`Ocorreu um error ao deletar o produto`)
    }
  }
}


