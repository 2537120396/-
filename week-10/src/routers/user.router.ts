import * as Joi from 'joi'
import * as Router from 'koa-router'
import { badParams } from '../stats'
import * as IUserService from '../services/user.service'

const router = new Router({
  prefix: '/api/user'
})
//注册
router.post('/test', async ctx => {
  let schema = Joi.object({
    username: Joi.string().required(),
    nickname: Joi.string(),
    //匹配“大写字母，小写字母，数字，特殊字符”四项中的至少三项，且长度大于6小于30
    password: Joi.string().required().pattern(/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]{8,30}$/).min(6).max(30)
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  let result = await IUserService.add(value)
  ctx.body = {
    stat: 'OK',
    message: '注册成功',
    result
  }
})
//登录
router.post('/login', async ctx =>{
  let schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.any().required()
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error){
    return ctx.body = {
      stat: 'ERR_EXISTS',
      message: '用户名或密码不正确'
    }
  }else{
    try{
      let {token,id}= await IUserService.login(ctx.params._id,value)
      ctx.set('set-cookie', `token=${token}; path=/; httpOnly`)//设置cookie
      ctx.body = {
        stat: 'OK',
        id
      }
    }catch (error) {
      ctx.body = error
   }
  }
})
//获取用户信息
router.get('/info', async ctx => {
  let token = ctx.cookies.get('token')
  let result = await IUserService.info(token)
  if (result) {
    ctx.body = {
      stat: 'OK',
      id: result._id,
      username :result.username,
      nickname :result.nickname
    }
  } else {
    ctx.body = {
      stat: 'ERR_NOT_LOGIN',
      message: '用户未登录'
    }
  }
})
//修改用户密码
router.put('/update', async ctx => {
  let token = ctx.cookies.get('token')
  let result = await IUserService.info(token)
    if(result){//已经登录，有token值
      let schema = Joi.object({
        password: Joi.string().required().pattern(/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]{8,30}$/).min(6).max(30)
      })
      let { value, error } = schema.validate(ctx.request.body)
      console.log(value)
      if (error) throw badParams(error.message)
      await IUserService.update(token, value)
      ctx.body = {
        stat: 'OK',
        message:'密码已经更改'
      }
    } else {
      ctx.body = {
        stat: 'ERR_NOT_LOGIN',
        message: '用户未登录'
      }
    }
})
export default router