import * as React from 'react'
import { RouteComponentProps, Switch, Route, Redirect } from 'react-router-dom'
import { Menu, Layout, Avatar, Dropdown, message } from 'antd'
import { GiftOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react'

import style from './style.less'
import Sku from '../Sku'
import store from '../../store'
import * as api from '../../services/api'

@observer
export default class Home extends React.Component<RouteComponentProps> {
  async userInfo() {
    let result = await api.userInfo()
    if (result.stat === 'OK') {
      store.setUser(result.data)
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
    if (!store.user) return null
    let prefix = this.props.match.url
    return (
      <Layout className={style.layout}>
        <Layout.Header className={style.header}>
          <div className={style.brand}>商城管理系统</div>
          <span className={style.username}>{store.user?.username}</span>
          <Dropdown
            arrow
            placement="bottomCenter"
            overlay={
              <Menu>
                <Menu.Item key="logout" onClick={this.logout.bind(this)}>
                  退出登录
                </Menu.Item>
              </Menu>
            }
          >
            <Avatar src={store.user?.avatar} className={style.avatar} />
          </Dropdown>
        </Layout.Header>
        <Layout>
          <Layout.Sider width={150}>
            <Menu
              theme="dark"
              onSelect={item => {
                this.props.history.push(item.key)
              }}
              selectedKeys={[this.props.location.pathname]}
            >
              <Menu.Item icon={<GiftOutlined />} key={`${prefix}/sku`}>
                商品管理
              </Menu.Item>
            </Menu>
          </Layout.Sider>
          <Layout.Content className={style.content}>
            <Switch>
              <Route path={`${prefix}/sku`} exact component={Sku} />
              <Redirect from={`${prefix}`} to={`${prefix}/sku`} exact />
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}
