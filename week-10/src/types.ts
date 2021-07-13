import { ObjectId } from 'mongodb'

export interface IArea {
  name: string
}

export interface IAlbum {
  areaId: ObjectId
  name: string
  singer: string
  release_time: string
  cover: string
}

export interface IUser {
  username: string   //用户名，不可重复
  nickname: string   //昵称
  password: string   //使用sha1加密
}