import * as React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import Product from '../Product'
import Detail from '../Detail'
import Mine from '../Mine'
import Shopcar from '../Shopcar'
import Login from '../Login'

export default class App extends React.Component {

  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <Switch>
            <Route path="/product" component={Product} />
            <Route path="/shopcar" component={Shopcar} />
            <Route path="/mine" component={Mine} />
            <Route path="/detail/:id" component={Detail} />
            <Route path="/login" component={Login} />
            <Redirect from="/" to="/product" exact />
          </Switch>
        </BrowserRouter>
      </ConfigProvider>
    )
  }

}