import Route from '@ioc:Adonis/Core/Route'

Route.get('/login', 'AuthController.create')
Route.post('/login', 'AuthController.login')
Route.get('/logout', async ({ auth, response }) => {
  await auth.use('web').logout()
  response.redirect('/login')
})