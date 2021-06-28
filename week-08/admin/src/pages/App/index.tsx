import * as React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import Login from '../Login'
import Home from '../Home'


export default class App extends React.Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <Switch>
            {/* <Route path="/" component={Sku} /> */}
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Redirect from="/" to="/login" exact />
          </Switch>
        </BrowserRouter>
      </ConfigProvider>
    )
  }
}
