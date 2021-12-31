import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Admin from './Admin'

export default class Article extends BaseModel {
 @belongsTo(() => Admin)
  public admin: BelongsTo<typeof Admin>

  @column({ isPrimary: true })
  public id: number

  @column()
 public title: string

 @column()
 public content: string

 @column()
  public adminId: number

  @column.date()
  public publishDate: DateTime
  
  @column()
 public author: string

  @column()
  public categories: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public async getAdmin(){
    const admin =  await Admin.findOrFail(this.adminId)
    return admin.name
  }
  @computed()
    public fullservice(){
      return `${this. title}  ${this. content} ${this.publishDate}`
    }
}
