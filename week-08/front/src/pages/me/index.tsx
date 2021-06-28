import * as React from 'react'
import { RouteComponentProps} from 'react-router-dom'
import { Button, message } from 'antd'
import { observer } from 'mobx-react'
import Footer from '../../components/footer'
import style from './style.less'
import loginme from '../../logime'
import * as api from '../../services/api'

@observer
export default class me extends React.Component<RouteComponentProps> {
  async userInfo() {
    let result = await api.userInfo()
    if (result.stat === 'OK') {
        loginme.setUser(result.data)
    } else {
      message.warning('请先登录')
      this.props.history.push('/login')
    }
  }

  async logout() {
    await api.logout()
    message.success('已退出登录')
    this.props.history.push('/login')
  }

  componentDidMount() {
    this.userInfo()
  }

  render() {
    if (!loginme.user) return null
    let prefix = this.props.match.url
    return (
      <div className={style.page}>
        <div className={style.main}>
          <img className={style.brand}  src={loginme.user?.avatar} />
          <span className={style.username}>{loginme.user?.nickname}</span>
              <Button block type="primary" htmlType="submit" className={style.primary} 
                  onClick={this.logout.bind(this)}>退出登录</Button>
        </div>
        <Footer />
      </div>
    )
  }
}
