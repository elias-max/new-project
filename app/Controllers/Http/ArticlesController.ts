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

  //console.log(params)

    const currentAdmin= auth.use('web').user!
    try{
      await Article.create({
        title: params.title,
        author: params.author,
        adminId: currentAdmin.id,
        content: params.content,
        publishDate: params.publishDate,
        categories: params.categories
  
      })  
      
    }catch(e){
      console.log(e)
       
      response.redirect().back() // NEED TO DO MORE HERE
    }
    response.redirect().toRoute('ArticlesController.index')
  }
  

  public async show({view,request}) {
    const article = await Article.findOrFail(request.param('id') )
    return view.render('articles/show', { article: article })
  }

  public async edit({view,params}) {
    const article = await Article.findOrFail(params.id )
    return view.render('articles/edit', { 
      articles: article})
  }

  public async update({response,request}) {
    await request.validate(ArticleValidator)
    const params = request.body()
    const article = await Article.findOrFail(request.param('id'))

    try{
      await article.merge({
        title: params.title,
        author: params.author,
        content: params.content,
        publishDate: params.publishDate
          }).save()
        }catch  (error) {
          console.log(error)
          response.redirect().back() // NEED TO DO MORE HERE
        }
        response.redirect().toRoute('ArticlesController.index')     
  }

  public async destroy({response,session,params}){
    const article = await Article.find(params.id)
    await article?.delete()

    session.flash({ message: 'Service has been removed' })
    return response.redirect('/articles')
  }
}

