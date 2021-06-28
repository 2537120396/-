import * as api from '../../services/api'
import style from './Item.less'
import "swiper/swiper-bundle.css";
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { ISku } from '../../types'
interface State {
  sku: ISku
  selected: boolean
}
interface Props {
  id: string
}

export default class Item extends React.Component<Props & State> {

  state: State = {
    sku: null,
    selected: true
  }

  async getsku() {
    let values = await api.getSku(this.props.id)
    if (values.stat === 'OK') {
      this.setState({
        sku: values.data
      })
    }
  }
  onclick() {
    this.setState({
      selected: !this.state.selected
    })
    console.log(this.state.selected)
  }

  componentDidMount() {
    this.getsku()
  }

  render() {
    return (
      <div className={style.list} >
        <div className={style.itemcard}>
          <div className={style.checkboxwrap}>
            <i className={`${style.aa} 
              ${this.state.selected ? 'iconfont icon-round' : "iconfont icon-roundcheckfill"} 
              ${this.state.selected ? style.yes : style.no}`}
              onClick={this.onclick.bind(this)}
            />
          </div>
          <img src={this.state.sku?.cover} className={style.img} />
          <div className={style.info}>
            <div className={style.title}>
              {this.state.sku?.title}
            </div>
            <div className={style.price}>
              ￥{this.state.sku?.price}
            </div>
          </div>
        </div>
      </div>
    )
  }
}