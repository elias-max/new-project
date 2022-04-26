import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Expenses extends BaseSchema {
  protected tableName = 'expenses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('expensestype_id').references('expenses_types.id')
      table.string('description').notNullable()
      table.decimal('amount').notNullable()
      table.date('date')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
