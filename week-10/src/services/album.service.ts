import { ObjectId } from 'mongodb'
import * as db from '../db'
import { IAlbum } from '../types'
import { stats } from '../stats'

// 查询所有记录
export function list() {
  return db.albumCollection.find().toArray()
}

// 根据_id查找一条记录
export async function findOne(_id: string) {
  let result = await db.albumCollection.findOne({
    _id: new ObjectId(_id)
  })
  if (result === null) throw stats.ERR_NOT_FOUND
  return result
}

// 添加一条记录
export async function add(record: IAlbum) {
  let area = await db.albumCollection.findOne({
    name: record.name
  })
  if (area !== null) throw stats.ERR_EXISTS
  let result = await db.albumCollection.insertOne(record)
  return result.ops[0]//返回的name以及_id
}

// 更新一条记录
export async function update(_id: string, record: IAlbum) {
  // 先判断是否有同名记录存在
  let count = await db.albumCollection.countDocuments({
    name: record.name,
    _id: {
      $ne: new ObjectId(_id)
    }
  })
  if (count > 0) throw { stat: 'ERR_EXISTS', message: '没有找到该记录，请输入正确的name' }
  let result = await db.albumCollection.findOneAndUpdate({
    _id: new ObjectId(_id)
  }, {
    $set: record
  })
  if (result === null) throw stats.ERR_NOT_FOUND
}

// 删除一条记录
export async function remove(_id: string) {
  let result = await db.albumCollection.findOneAndDelete({
    _id: new ObjectId(_id)
  })
  if (result === null) throw stats.ERR_NOT_FOUND
  return result.value
}