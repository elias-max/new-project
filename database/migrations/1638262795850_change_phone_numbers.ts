import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ChangePhoneNumbers extends BaseSchema {
  protected tableName = 'members'

  public async up () {
    // ALTER
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('phone_number', 'phonenumber')
      
    })
  }

  public async down () {
    // ALTER
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('phonenumber', 'phone_number')
      
    })
  }
}
