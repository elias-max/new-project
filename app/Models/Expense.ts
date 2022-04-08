import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, computed } from '@ioc:Adonis/Lucid/Orm'
import Admin from './Admin'

export default class Expense extends BaseModel {
  @belongsTo(() => Admin)
  public admin: BelongsTo<typeof Admin>

  @column({ isPrimary: true })
  public id: number

  @column()
  public expenseType: string

  @column()
  public adminId: number

  @column()
  public description: string

  @column()
  public date: Date

  @column()
  public amount: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
