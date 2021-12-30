import Article from "App/Models/Article"
import ArticleValidator from "App/Validators/ArticleValidator"

export default class ArticlesController {
  public async index({view}) {
    const articles = await Article.query().preload('admin')
    return view.render('articles/index', { articles: articles })
  }

  public async create({view}){
    return view.render('articles/create')
  }

  public async store({ response, request, auth}) {
    await request.validate(ArticleValidator)
    const params = request.body()

    const currentAdmin= auth.use('web').user!
    try{
      await Article.create({
        title: params.title,
        author: params.author,
        adminId: currentAdmin.id,
        content: params.content,
        publishDate: params. publishDate,
        categories: params.categories
  
      })  
      //console.log(params)
    }catch {
       
      response.redirect().back() // NEED TO DO MORE HERE
    }
    response.redirect().toRoute('ArticlesController.index')
  }
  

  public async show({view,request}) {
    const article = await Article.findOrFail(request.param('id') )
    return view.render('articles/show', { article: article })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
