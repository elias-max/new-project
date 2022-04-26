import Expense from 'App/Models/Expense'
import ExpensesType from 'App/Models/ExpensesType'
import CreateExpenseValidator from 'App/Validators/CreateExpenseValidator'

export default class ExpensesController {
  public async index({ view }) {
    const expenses = await Expense.all()
    return view.render('expenses/index', { expenses: expenses })
  }

  public async create({ view }) {
    const expensesTypes = await ExpensesType.query().preload('admin')
    /* console.log(expensesTypes)*/
    return view.render('expenses/create', { expensesTypes: expensesTypes })
  }

  public async store({ response, request }) {
    await request.validate(CreateExpenseValidator)
    const params = request.body()
    try {
      await Expense.create({
        expensestypeId: params.expensestypeId,
        description: params.description,
        amount: params.amount,
        date: params.date,
      })
    } catch (error) {
      console.log(error)
      response.redirect().back() // NEED TO DO MORE HERE
    }

    response.redirect().toRoute('ExpensesController.index')
  }
  public async show({ view, request }) {
    const expense = await Expense.findOrFail(request.param('id'))
    return view.render('expenses/show', { expense: expense })
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
          expensetype: params.expensetype,
          description: params.description,
          amount: params.amount,
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
