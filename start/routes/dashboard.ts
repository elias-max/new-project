import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async ({ view }) => {
    return view.render('dashboard/index')
  })
}).middleware('auth')
