import Route from '@ioc:Adonis/Core/Route'

// sign in
Route.get('/login', 'AuthController.create')
Route.post('/login', 'AuthController.login')

// sign up
Route.get('/signup', 'AuthController.signupForm')
Route.post('/signup', 'AuthController.signup')

Route.get('/logout', async ({ auth, response }) => {
  await auth.use('web').logout()
  response.redirect('/login')
})