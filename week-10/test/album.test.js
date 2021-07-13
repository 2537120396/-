const axios = require('axios').default
const { describe, it } = require('mocha')
const { expect } = require('chai')

const { host } = require('./util')

describe('GET /api/album', () => {
  it('默认列表', async () => {
    let res = await axios.get(`${host}/api/album`)
    expect(res.data.stat).eq('OK')
  })
})

describe('GET /api/album/:_id', () => {
  it('根据_id查询album', async () => {
    let res = await axios.get(`${host}/api/album`)
    let first = res.data.rows[0]
    let result = await axios.get(`${host}/api/album/${first._id}`)
    expect(result.data.stat).eq('OK')
    expect(result.data.result.name).eq(first.name)
  })
})

describe('GET /api/album/:_id/albums', () => {
  it('查询指定area下面的所有album', async () => {
    let res = await axios.get(`${host}/api/album`)
    let second = res.data.rows[1]
    let result = await axios.get(`${host}/api/area/${second._id}/albums`)
    expect(result.data.stat).eq('OK')
    let rows = result.data.rows
    let success = true
    for (let row of rows) {
      if (row.areaId.toString() !== second._id.toString()) success = false
    }
    expect(success).eq(true)
  })
})
//添加album
let _id = ''
describe('POST /api/album', () => {
  it('添加album', async () => {
    let res = await axios.post(`${host}/api/album`, {
      name: '奇妙能力歌',
      singer: '陈粒',
      release_time: '2015-02-02',
      cover:'https://y.qq.com/music/photo_new/T002R300x300M000004GArUe26PXvZ_1.jpg?max_age=2592000',
      areaId:'60e6620a8e6df92f4045f132'
    })
    expect(res.data.stat).eq('OK')
    _id = res.data.result._id
    res = await axios.post(`${host}/api/album`, {
        name: '奇妙能力歌',
        singer: '陈粒',
        release_time: '2015-02-02',
        cover:'https://y.qq.com/music/photo_new/T002R300x300M000004GArUe26PXvZ_1.jpg?max_age=2592000',
        areaId:'60e6620a8e6df92f4045f132'
    })
    expect(res.data.stat).eq('ERR_EXISTS')
  })
})

describe('PUT /api/album/:_id', () => {
  it('更新album', async () => {
    let res = await axios.put(`${host}/api/album/${_id}`, {
        name: '历历万乡',
        singer: '陈粒',
        release_time: '2014-02-01',
        cover:'https://y.qq.com/music/photo_new/T002R300x300M0000032YJyg2yF6Dd_1.jpg?max_age=2592000',
        areaId:'60e6620a8e6df92f4045f132'
    })
    expect(res.data.stat).eq('OK')
  })
})

describe('DELETE /api/album/:_id', () => {
  it('删除album', async () => {
    let res = await axios.delete(`${host}/api/album/${_id}`)
    expect(res.data.stat).eq('OK')
    let result = await axios.get(`${host}/api/album/${_id}`)
    expect(result.data.stat).eq('ERR_NOT_FOUND')
  })
})