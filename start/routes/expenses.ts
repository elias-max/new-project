import Route from '@ioc:Adonis/Core/Route'

Route.resource('expenses', 'ExpensesController').middleware({ '*': ['auth', 'currentEntity'] })
