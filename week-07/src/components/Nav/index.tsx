// 排行榜头部导航组件
import * as React from 'react'
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom'
import './style.css'
import article from '../../assets/imgs/icon_article.webp'
import hot from '../../assets/imgs/icon_hot.webp'

class Nav extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div className="page">
         <header className="top">
           <div className="top-title">排行榜</div>
            <nav className="tabs">
              <ul>
                <NavLink to="/"  className="nav-item" exact activeClassName="nav-active">
                  <div className="tab-item">
                    <img src={article}  className="article"/>
                    <span>好文精选</span>
                  </div>
                </NavLink>
                <NavLink to="/News" className="nav-item" exact activeClassName="nav-active">
                  <div className="tab-item">
                    <img src={hot} className="article"/>
                    <span>热门资讯</span>
                  </div>
                </NavLink>
              </ul>
            </nav>
        </header>
      </div>
    )
  }
}

export default withRouter(Nav)
