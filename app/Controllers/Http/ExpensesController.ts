import Expense from 'App/Models/Expense'
import CreateExpenseValidator from 'App/Validators/CreateExpenseValidator'

export default class ExpensesController {
  public async index({ view }) {
    const expenses = await Expense.query().preload('admin')
    return view.render('expenses/index', { expenses: expenses })
  }

  public async create({ view }) {
    return view.render('expenses/create')
  }

  public async store({ response, request, auth }) {
    await request.validate(CreateExpenseValidator)
    const params = request.body()

    const currentAdmin = auth.use('web').user!

    try {
      await Expense.create({
        expenseType: params.expenseType,
        description: params.description,
        amount: params.amount,
        adminId: currentAdmin.id,
        date: params.date,
      })
    } catch {
      response.redirect().back() // NEED TO DO MORE HERE
    }

    response.redirect().toRoute('MembersController.index')
  }
  public async show({ view, request }) {
    const expense = await Expense.findOrFail(request.param('id'))
    return view.render('members/show', { expense: expense })
  }

  public async edit({ view, request }) {
    const expense = await Expense.findOrFail(request.param('id'))
    return view.render('expense/edit', {
      expense: expense,
    })
  }

  public async update({ response, request }) {
    await request.validate(CreateExpenseValidator)
    const params = request.body()
    const expense = await Expense.findOrFail(request.param('id'))

    try {
      await expense
        .merge({
          expenseType: params.expenseType,
          description: params.description,
          amount: params.amount,
          adminId: currentAdmin.id,
          date: params.date,
        })
        .save()
    } catch (error) {
      response.redirect().back() // NEED TO DO MORE HERE
    }

    response.redirect().toRoute('ExpensesController.index')
  }

  public async destroy({ response, session, params }) {
    const expense = await Expense.find(params.id)
    await expense?.delete()

    session.flash({ message: 'Expense has been removed' })
    return response.redirect('/expenses')
  }
}
