import Member from 'App/Models/Member'
import CreateMemberValidator from 'App/Validators/CreateMemberValidator'

export default class MembersController {
  public async index({ view }) {
    const members = await Member.query().preload('admin')
    return view.render('members/index', { members: members })
  }

  public async create({ view }) {
    return view.render('members/create')
  }
  public async store({ response, request, auth }) {
    await request.validate(CreateMemberValidator)
    const params = request.body()

    const currentAdmin = auth.use('web').user!

    try {
      await Member.create({
        firstName: params.firstName,
        lastName: params.lastName,
        adminId: currentAdmin.id,
        phonenumber: params.phonenumber,
      })
    } catch {
      response.redirect().back() // NEED TO DO MORE HERE
    }

    response.redirect().toRoute('MembersController.index')
  }

  public async show({ view, request }) {
    const member = await Member.findOrFail(request.param('id'))
    return view.render('members/show', { member: member })
  }

  public async edit({ view, request }) {
    const member = await Member.findOrFail(request.param('id'))
    return view.render('members/edit', {
      member: member,
    })
  }

  public async update({ response, request }) {
    await request.validate(CreateMemberValidator)
    const params = request.body()
    const member = await Member.findOrFail(request.param('id'))

    try {
      await member
        .merge({
          firstName: params.firstName,
          lastName: params.lastName,
          phonenumber: params.phonenumber,
        })
        .save()
    } catch (error) {
      response.redirect().back() // NEED TO DO MORE HERE
    }

    response.redirect().toRoute('MembersController.index')
  }
  public async destroy({ response, session, params }) {
    const member = await Member.find(params.id)
    await member?.delete()

    session.flash({ message: 'Member has been removed' })
    return response.redirect('/members')
  }
}
