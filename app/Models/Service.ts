import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Admin from './Admin'

export default class Service extends BaseModel {
  @belongsTo(() => Admin)
  public admin: BelongsTo<typeof Admin>

  @column({ isPrimary: true })
  public id: number

  @column()
  public serviceName: string

  @column()
  public serviceDuration: string

  @column()
  public serviceLocation: string

  @column()
  public adminId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public async getAdmin() {
    const admin = await Admin.findOrFail(this.adminId)
    return admin.name
  }

  @computed()
  public fullservice() {
    return `${this.serviceName} ${this.serviceDuration}`
  }
}
