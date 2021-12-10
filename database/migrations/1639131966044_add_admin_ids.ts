import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddAdminIds extends BaseSchema {
  protected tableName = 'services'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
     table.integer('admin_id').references('admins.id')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('admin_id')
    })
  }
}

