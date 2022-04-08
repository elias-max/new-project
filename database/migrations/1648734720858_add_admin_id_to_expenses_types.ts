import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddAdminIdToExpensesTypes extends BaseSchema {
  protected tableName = 'expenses_types'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('admin_id').references('admins.id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
    })
  }
  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('admin_id')
    })
  }
}
