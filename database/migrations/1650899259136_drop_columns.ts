import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DropColumns extends BaseSchema {
  protected tableName = 'expenses'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('expensetype_id').references('expenses_types.id')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('expense_type_id')
    })
  }
}
