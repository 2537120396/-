import * as api from '../../services/api'
import style from './style.less'
import { Form, Input, Button, message, FormInstance } from 'antd'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface Values {
  username: string
  password: string
}

export default class Login extends React.Component<RouteComponentProps> {
  form: FormInstance<Values>
  
  async submit() {
    try {
      let values = await this.form.validateFields()
      let result = await api.login(values.username, values.password)
      if (result.stat === 'OK') {
        message.success('登录成功')
        this.props.history.push('/home')
      } else {
        message.error(result.message)
      }
    } catch (error) {}
  }

  render() {
    return (
      <div className={style.wrap}>
        <Form className={style.form} ref={el => (this.form = el)}>
          <div className={style.title}>登录系统</div>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder='用户名' />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
          <Input.Password placeholder='密码' />
          </Form.Item>
          <Button block type="primary" htmlType="submit" className={style.primary} 
          onClick={this.submit.bind(this)}>登录</Button>
        </Form>
      </div>

    )
  }
}