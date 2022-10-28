import Route from '@ioc:Adonis/Core/Route'

export default function productsRoute() {
  Route.post('products', 'ProductsController.store')
  Route.get('products/:id', 'ProductsController.show')
  Route.get('products', 'ProductsController.index')
  Route.put('products/:id', 'ProductsController.update')
  Route.delete('products/:id', 'ProductsController.destroy')
}
