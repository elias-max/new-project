import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from "@ioc:Adonis/Core/View";

export default class CurrentEntity {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    const currentAdmin = auth.use('web').user!
    View.global('currentAdmin', currentAdmin)
    await next()
  }
}