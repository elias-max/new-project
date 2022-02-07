import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateMemberValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstName: schema.string(),
    lastName: schema.string(),
  })

  public messages = {
    'firstName.required': 'Please enter First Name',
    'lastName.required': 'Please enter last Name',
  }
}
