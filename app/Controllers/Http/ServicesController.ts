import  Service from "App/Models/Service"
import ServiceValidator from "App/Validators/ServiceValidator"

export default class ServicesController {
  public async index({view}) {
      const services = await Service.query().preload('admin')
      return view.render('services/index', { services: services })
  }

  public async create({view}) {
    return view.render('services/create')
  }

  public async store({response,request,auth}) {
    await request.validate(ServiceValidator)
    const params = request.body()

    const currentAdmin = auth.use('web').user!
    
    try{
      await Service.create({
        serviceName: params.seviceName,
        serviceLocation: params.serviceLocation,
        serviceDuration: params.serviceDuration,
        adminId: currentAdmin.id
      })
    }catch  (error) {
      console.log(error)
      response.redirect().back() // NEED TO DO MORE HERE
    }

    response.redirect().toRoute('ServicesController.index')
  }

  public async show({ view,request}) {
    const service = await  Service.findOrFail(request.param('id') )
    return view.render('services/show', { service: service })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
