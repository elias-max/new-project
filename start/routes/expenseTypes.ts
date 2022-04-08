import Route from '@ioc:Adonis/Core/Route'
Route.resource('expensetypes', 'ExpenseTypesController').middleware({
  '*': ['auth', 'currentEntity'],
})
