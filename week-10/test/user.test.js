const axios = require('axios').default
const { describe, it } = require('mocha')
const { expect } = require('chai')
const { host } = require('./util')

//注册
describe('POST /api/user/test', () => {
  it('注册', async () => {
    let res = await axios.post(`${host}/api/user/test`, {
      username: "闻一多zzz",
      nickname: "花骨朵",
      password: "12212sdaZZZ"
    })
    expect(res.data.stat).eq('OK')
    _id = res.data.result._id
    res = await axios.post(`${host}/api/user/test`, {
      username: "闻一多zzz",
      nickname: "花骨朵",
      password: "12212sdaZZZ",
    })
    expect(res.data.stat).eq('ERR_EXISTS')
  })
})

//登录
describe('POST /api/user/login', () => {
  it('登录', async () => {
    let res = await axios.post(`${host}/api/user/login`, {
      username: "闻一多zzz",
      password: "12212sdaZZZ"
    })
    token = res.headers['set-cookie'][0].split(';')[0]
    expect(res.data.stat).eq('OK')
    res = await axios.post(`${host}/api/user/login`, {
      username: "闻一多zszz",
      password: "12212sda"
    })
    expect(res.data.stat).eq('ERR_LOGIN_FAILED')
  })
})
//获取当前用户信息
describe('GET /api/user/info', () => {
  it('获取当前用户信息', async () => {
    let res = await axios.get(`${host}/api/user/info`, {
      headers: {
        // 传入前面解析的token
        cookie: token
      }
    })
    expect(res.data.stat).eq('OK')
  })
})

//修改密码
describe('PUT /api/user/update', () => {
  it('修改密码', async () => {
    let res = await axios.put(`${host}/api/user/update`, {
        password: 'ZZZtest321'
    }, {
        headers: {
            cookie: token
        }
    })
    expect(res.data.stat).eq('OK')
  })
})