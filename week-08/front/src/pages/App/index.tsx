import * as React from 'react'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import Login from '../login/login'
import Detail from '../Detail/Detail'
import Cart from '../Cart/Cart'
import Home from '../Home/Home'
import me from '../me/index'
export default class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Route path="/home" component={Home} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/login" component={Login} />
        <Route path="/cart" component={Cart} />
        <Route path="/me" component={me} />
        <Redirect from="/" to="/login" exact />
      </BrowserRouter>
    )
  }

}