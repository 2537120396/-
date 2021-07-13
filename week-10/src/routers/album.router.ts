import * as Joi from 'joi'
import * as Router from 'koa-router'

import { badParams } from '../stats'
import * as albumService from '../services/album.service'
import { ObjectId } from 'mongodb';

const router = new Router({
  prefix: '/api/album'
})

// 读取所有的Album
router.get('/', async ctx => {
  let rows = await albumService.list()
  ctx.body = {
    stat: 'OK',
    rows
  }
})

// 查找某一个Album
router.get('/:_id', async ctx => {
  let result = await albumService.findOne(ctx.params._id)
  ctx.body = {
    stat: 'OK',
    result
  }
})

// 创建album
router.post('/', async ctx => {
  let schema = Joi.object({
    name: Joi.string().required(),
    singer: Joi.string().required(),
    release_time: Joi.string().required(),
    cover:Joi.string().required(),
    areaId:Joi.string().required()
  })
  let { value, error } = schema.validate(ctx.request.body)
  value.areaId = new ObjectId(value.areaId)
  if (error) throw badParams(error.message)
  let result = await albumService.add(value)
  ctx.body = {
    stat: 'OK',
    result
  }
})

// 修改area
router.put('/:_id', async ctx => {
  let schema = Joi.object({
    //修改时查找到记录后不一定式全部修改，故都不是必须的
    name: Joi.string(),
    singer: Joi.string(),
    release_time: Joi.string(),
    cover:Joi.string(),
    areaId:Joi.string()
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  await albumService.update(ctx.params._id, value)
  ctx.body = {
    stat: 'OK'
  }
})

// 删除Album
router.delete('/:_id', async ctx => {
  let result = await albumService.remove(ctx.params._id)
  ctx.body = {
    stat: 'OK',
    result
  }
})

export default router