import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: 'admins', column: 'email' }),
    ]),
    password: schema.string({}, [
      rules.minLength(6),
      rules.confirmed('passwordConfirmation')
    ])
  })

  public messages = {
    'email.required': 'Please enter a valid email',
    'password.required': 'Minimum Length is 6 and Must Confirm',
  }
}
