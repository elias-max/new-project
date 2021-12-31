import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddCategoriesToArticles extends BaseSchema {
  protected tableName = 'articles'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('categories').references('categories')


    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('categories')
    })
  }
}
