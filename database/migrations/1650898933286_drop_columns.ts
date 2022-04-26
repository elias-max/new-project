import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DropColumns extends BaseSchema {
  protected tableName = 'drop_columns'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
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
