import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddAuthorToArticles extends BaseSchema {
  protected tableName = 'articles'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('author').references('author')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('author')
    })
  }
}

