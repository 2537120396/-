import * as request from './request'
import { ISku, IUser } from '../types'

interface BaseRes {
  stat: string
  message?: string
}

interface LoginRes extends BaseRes {
  token: string
  user: IUser
}

interface UserRes extends BaseRes {
  data: IUser
}

interface ListRes extends BaseRes {
  rows: ISku[]
}

/**
 * 管理员登录
 * @param username 用户名
 * @param password 密码
 * @returns 
 */
export function login(username: string, password: string) {
  return request.post<LoginRes>('/api/console/user/login', {
    username,
    password
  })
}

/**
 * 注销登录
 * @returns 
 */
export function logout() {
  return request.post<BaseRes>('/api/user/logout')
}

/**
 * 获取用户信息
 * @returns 
 */
export function userInfo() {
  return request.post<UserRes>('/api/user/info')
}

/**
 * 添加商品
 * @param record 商品对象
 * @returns 
 */
export function addSku(record: ISku) {
  return request.post<BaseRes>('/api/admin/sku/add', record)
}

/**
 * 商品列表
 * @param keyword 关键词
 * @returns 
 */
export function listSku(keyword: string = '') {
  return request.post<ListRes>('/api/admin/sku/list', { keyword })
}

/**
 * 删除商品
 * @param id 商品ID
 * @returns 
 */
export function removeSku(id: string) {
  return request.post<BaseRes>('/api/admin/sku/remove', { id })
}

/**
 * 更新商品
 * @param record 商品对象
 * @returns 
 */
export function updateSku(record: ISku) {
  return request.post<BaseRes>('/api/admin/sku/update', record)
}