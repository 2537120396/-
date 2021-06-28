import * as api from '../../services/api'
import style from './login.less'
import { Form, Input, Button, message, FormInstance } from 'antd'
import * as React from 'react'
import { NavLink, RouteComponentProps } from 'react-router-dom'

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
        <NavLink  to="/home" className={style.btn}>
             <img  src="https://gw.alicdn.com/tfs/TB1puqzr6MZ7e4jSZFOXXX7epXa-160-160.png" className={style.title1} />
           </NavLink>
        <Form className={style.form} ref={el => (this.form = el)}>
          
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input className={style.input} placeholder='用户名' />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password className={style.input} placeholder='密码' />
          </Form.Item>
          <Button block type="primary" htmlType="submit" className={style.primary} 
          onClick={this.submit.bind(this)}>登录</Button>
        </Form>
      </div>

    )
  }
}