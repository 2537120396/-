import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import News from '../News'
import Posts from '../Posts'
import Detail from '../Detail'
export default class App extends React.Component {

  componentDidMount() {
    var docEl = document.documentElement;
    docEl.style.fontSize = 5 * (docEl.clientWidth / 375) + 'px';
  }
  
  render() {
    return (
      
      <BrowserRouter>
          {/* 根据URL路径匹配路由组件，渲染到该位置 */}
          <Switch>
            <Route path="/" exact component={Posts} />
            <Route path="/News" exact component={News} />
            <Route path="/Detail/:id" component={Detail} />
          </Switch>
      </BrowserRouter>
    )
  }

}