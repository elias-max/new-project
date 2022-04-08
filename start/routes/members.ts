import Route from '@ioc:Adonis/Core/Route'

Route.resource('members', 'MembersController').middleware({ '*': ['auth', 'currentEntity'] })
