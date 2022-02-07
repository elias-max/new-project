import Env from '@ioc:Adonis/Core/Env'
import Admin from "App/Models/Admin"
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {

  // render the form
  public async signupForm({ view }){
    return view.render('auth/signupForm')
  }

  // save the admin and sign in
  public async signup({ request, response, auth }){
    await request.validate(LoginValidator)
    const params = request.body()

    try{

      // create the admin/user
      await Admin.create({
        email: params.email,
        password: params.password
      })

      // sign in the user
      await auth.use('web').attempt(params.email, params.password)
      response.redirect('/')
    }catch(error){
      console.log(error)
      response.redirect().back()
    }

  }

  // Sign In Form
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
    } catch (error)  {
      console.log(error)           
      return view.render('auth/create',
        {
          invalid: true,
          message: 'Password or Email invalid!'
        })
    }
  }
}
