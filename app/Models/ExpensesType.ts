import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  BelongsTo,
  belongsTo,
  computed,
  hasMany,
  HasMany,

} from '@ioc:Adonis/Lucid/Orm'
import Admin from './Admin'
import Expense from './Expense'
export default class ExpensesType extends BaseModel {
  @belongsTo(() => Admin)
  public admin: BelongsTo<typeof Admin>

  @hasMany(() => Expense)
  public Expense: HasMany<typeof Expense>

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public adminId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
