import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/admins', async ({ view }) => {
    return view.render('admins/index')
  })
}).middleware('auth')
