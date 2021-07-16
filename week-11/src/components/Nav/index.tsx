import { NavLink} from 'react-router-dom'
import style from './style.module.css'

export default function Nav() {
  return (
    <nav className={style.nav}>
      <NavLink to="/product" className={style.item} exact activeClassName={style.active}>
        <i className="iconfont icon-goods"></i>
        <span>商品</span>
      </NavLink>
      <NavLink to="/shopcar" className={style.item} exact activeClassName={style.active}>
        <i className="iconfont icon-cart"></i>
        <span>购物车</span>
      </NavLink>
      <NavLink to="/mine" className={style.item} exact activeClassName={style.active}>
        <i className="iconfont icon-people"></i>
        <span>个人</span>
      </NavLink>
    </nav>
  )
}

