# 任务说明

基于本工程增加几个功能模块

## 补全 album.router.ts 

参考 `area.router.ts` ，补全增删改的API，要求使用Joi进行参数验证

## 新增一个 `user` 功能模块

参考数据结构

```ts
interface IUser {
  // 用户名，不可重复
  username: string
  // 昵称
  nickname: string
  // 密码，需要使用sha1加密
  password: string
}
```

需要实现的API

### 用户注册

用户通过POST传递 `username`、`nickname`、`password` 到该接口，完成用户的注册，需要检查 `username` 的合法性、唯一性，然后对密码明文做加密处理，密码应该有一定的复杂度要求

### 用户登录

用户通过POST传递 `username`、`password` 到该接口，校验是否与数据库中的记录匹配，`password` 应该经过hash之后再与数据库中的密文作比较，如果用户被禁用则不允许登录，登录成功之后生成一个token，在mongodb中和用户_id关联起来，并且将token set-cookie给浏览器

### 获取用户信息

服务端通过cookie获取token，然后从数据库中获取关联的用户_id，进一步查询得到user对象，需要利用mongodb的API将password属性过滤掉，如果未登录应该返回错误状态

### 修改用户密码

用户通过PUT传递原密码、新密码到该接口，校验是否已登录，获取用户信息判断原密码是否正确，新密码是否满足复杂度要求，然后对新密码加密之后更新到数据库

## 技术要求

- 修改README，记录自己的问题和思路
- 可以参考 `sku-server` 中的一些实现思路
- 需要尽可能考虑各种异常调用
- 关键请求参数需要使用Joi进行校验
- 数据使用MongoDB进行存储
- API需要编写测试用例
- 代码推送至 `week-09/koa-demo`

## 常见问题

- ObjectId长度是12个字节，用16进制表示就是24个字符长度，通过http传递过来的是字符串类型，需要在查询或写入数据库的时候转为ObjectId，如果长度不正确会构造ObjectId失败
- 对于update操作，需要支持部分属性更新，比如修改密码，只会涉及到password属性的更新
- 学会尽可能利用Joi进行数据的校验
- 学会使用VSCode进行debug调试
- MongoDB查询可以使用projection进行字段过滤
- Node.js环境下面进行网络请求需要自己进行cookie的管理
- 可以利用MongoDB的TTL索引实现过期清理机制