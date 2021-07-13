import { ObjectId } from 'mongodb'
import * as db from '../db'
import { IUser } from '../types'
import { stats } from '../stats'
import * as bcrypt from 'bcryptjs'
import * as Tool from '../middlewares/Tool'
import * as crypto from 'crypto'


let tokens = new Map<string, ObjectId>()
//注册
export async function add(record: IUser) {
    let area = await db.IUserCollection.findOne({
      username: record.username
    })
    if (area !== null){
      throw stats.ERR_EXISTS
    }else{
        record.password = await Tool.tools(record.password)
        let result = await db.IUserCollection.insertOne(record)
        return result.ops[0]
    }
}
//登录
export async function login(_id: string, record: IUser) {
  const find = await db.IUserCollection.findOne({
    username: record.username,
  });
  const password = record.password; //当前输入的密码
  if (find === null) {
    throw { stat: "ERR_LOGIN_FAILED", message: "用户名或密码不正确" };
  } else {
    var result = await bcrypt.compareSync(password, find.password);
    if (result) {
      console.log("验证通过");
      let token = crypto.randomBytes(12).toString("hex");
      let id = find._id;
      tokens.set(token, id);
      return {
        token,
        id,
      };
    }
  }
}

export async function info(token: string) {
  let _id = tokens.get(token)
  let result = await db.IUserCollection.findOne({
     _id: new ObjectId(_id)
  })
  if (result === null) {
      throw { stat: 'ERR_LOGIN_FAILED', message: '请登录' }
  }else{
    return result
  }
}
export async function update(token:string, record:IUser){
    let _id = tokens.get(token)
    //先根据id查找需要改动的user
    let result = await db.IUserCollection.findOne({
        _id: new ObjectId(_id),
     })
      if (result === null) {
         throw { stat: 'ERR_LOGIN_FAILED', message: '请登录' }
      }else{
        const newpassword = record.password;//当前输入的密码
        record.password = await Tool.tools(newpassword)
        
        let result = await db.IUserCollection.findOneAndUpdate({
            _id: new ObjectId(_id)
          }, {
            $set: record
          })
          if (result === null) throw stats.ERR_NOT_FOUND
      }
}