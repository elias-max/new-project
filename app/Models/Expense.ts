import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Database from '@ioc:Adonis/Lucid/Database'
import ExpensesType from './ExpensesType'

export default class Expense extends BaseModel {
  @belongsTo(() => ExpensesType)
  public expensesType: BelongsTo<typeof ExpensesType>

  @column({ isPrimary: true })
  public id: number

  @column()
  public expensestypeId: number

  @column()
  public description: string

  @column.dateTime({
    serialize: (value: DateTime) => value.toFormat('yyyy LLL dd'),
  })
  public date: DateTime

  @column()
  public amount: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public async expenseTypeName() {
    const xtype = await Database.from('expenses_types')
      .where('expenses_types.id', this.expensestypeId)
      .select('name')
      .first()
    return xtype.name
  }
}
