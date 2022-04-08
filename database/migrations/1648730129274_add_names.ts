import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddName extends BaseSchema {
  protected tableName = 'expenses_types'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('name')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('name')
    })
  }
}
