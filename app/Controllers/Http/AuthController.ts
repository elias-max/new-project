import Env from '@ioc:Adonis/Core/Env'
import Admin from "App/Models/Admin"

export default class AuthController {
  public async create({ view }){
    await Admin.firstOrCreate({
      name: 'Facim Admin',
      email: 'support@facim.or.tz',
      password: Env.get('ADMIN_PASS')
    })
 
    return view.render('auth/create')
  }

  public async login({request, response, auth, view}){
    const email = request.input('email')
    const password = request.input('password')
    const rememberMe = request.input('rememberMe')
    let rememberMeToken = false

    if (rememberMe == 'on'){ rememberMeToken = true }

    try {
      await auth.use('web').attempt(email, password, rememberMeToken)
      response.redirect('/')
    } catch {
      return view.render('auth/create',
        {
          invalid: true,
          message: 'Password or Email invalid!'
        })
    }
  }
}
