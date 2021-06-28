import { ISku } from '../../types'
import style from './style.less'
import * as React from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'

interface Params {
  id: string
}
interface Props {
  goods: ISku
}

class Goods extends React.Component<Props & RouteComponentProps<Params>> {
  render() {
    //let { goods } = this.props
    let id = '/detail/' + this.props.goods.id
    return (
      <Link to={id} className={style.hot} >
        <img src={this.props.goods.cover} className={style.img}/>
        <div className={style.bot}>
          <div className={style.title}>{this.props.goods.title}</div>
          <div className={style.price} >{this.props.goods.price}</div>
        </div>
      </Link>
    )
  }
}
export default withRouter(Goods)