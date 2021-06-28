import * as React from 'react'
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom'
import style from './style.less'

class Footer extends React.Component<RouteComponentProps> {
  render() {
    return (
        <div className={style.footer}>
          <NavLink  to="/home" className={style.btn} exact activeClassName={style.btu}>
            <i className="iconfont icon-goods"></i>
            <span>商品</span>
          </NavLink>
          <NavLink to="/cart" className={style.btn} exact activeClassName={style.btu}>
              <i className="iconfont icon-cart"></i>
              <span>购物车</span>
          </NavLink>
          <NavLink to="/me"   className={style.btn} exact activeClassName={style.btu}>
              <i className="iconfont icon-people"></i>
              <span>个人</span>
          </NavLink>
        </div>
    )
  }
}

export default withRouter(Footer)