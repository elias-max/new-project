import ExpensesType from 'App/Models/ExpensesType'
import CreateexpensetypeValidator from 'App/Validators/CreateexpensetypeValidator'
export default class ExpenseTypesController {
  public async index({ view }) {
    const expenseTypes = await ExpensesType.query().preload('admin')

    return view.render('expensetypes/index', { expenseTypes: expenseTypes })
  }
  public async create({ view }) {
    return view.render('expensetypes/create')
  }

  public async store({ response, request, auth }) {
    await request.validate(CreateexpensetypeValidator)
    const params = request.body()

    const currentAdmin = auth.use('web').user!

    try {
      await ExpensesType.create({
        name: params.name,
        adminId: currentAdmin.id,
      })
    } catch (error) {
      console.log()
      response.redirect().back() // NEED TO DO MORE HERE
    }

    response.redirect().toRoute('ExpenseTypesController.index')
  }
  public async show({ view, request }) {
    const expenseType = await ExpensesType.findOrFail(request.param('id'))
    return view.render('expensetypes/show', { expenseType: expenseType })
  }

  public async edit({ request, view }) {
    const expenseType = await ExpensesType.findOrFail(request.param('id'))
    return view.render('expensetypes/edit', { expenseType: expenseType })
  }

  public async update({ response, request, session }) {
    await request.validate(CreateexpensetypeValidator)
    const params = request.body()
    const expenseType = await ExpensesType.findOrFail(request.param('id'))

    try {
      await expenseType
        .merge({
          name: params.name,
        })
        .save()
    } catch (error) {
      response.redirect().back() // NEED TO DO MORE HERE
    }
    session.flash({ notification: 'Successfully update!' })
    response.redirect().toRoute('ExpenseTypesController.index')
  }

  public async destroy({ response, session, params }) {
    const expenseType = await ExpensesType.find(params.id)
    await expenseType?.delete()

    session.flash({ message: 'Expenses Type has been removed' })
    return response.redirect('/expensetypes')
  }
}
