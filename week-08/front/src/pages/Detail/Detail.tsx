import * as api from '../../services/api'
import style from './Detail.less'
import "swiper/swiper-bundle.css";
import { Button } from 'antd'
import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { ISku } from '../../types'
import SwiperCore, { Pagination } from 'swiper';
import Toast from '../../components/Toast'
SwiperCore.use([Pagination]);
interface State {
  sku: ISku
}
interface Params {
  id: string
}
type Props = RouteComponentProps<Params>
export default class Detail extends React.Component<RouteComponentProps & State & Props> {
  state: State = {
    sku: null
  }

  async getsku() {
      //'734334efd02b'
    let values = await api.getSku(this.props.match.params.id)
    if (values.stat === 'OK') {
      this.setState({
        sku: values.data
      })
    }

  }
  back() {
    this.props.history.goBack()
  }
  async add(){
    await api.addCart(this.state.sku.id)
    Toast.show('已加入购物车')
  }
  componentDidMount() {
    this.getsku()
  }

  render() {
    return (
      <div className={style.page}>
        <main className={style.main}>
          <div className={style.icon} onClick={this.back.bind(this)}>
            <i className="iconfont icon-back" />
          </div>
          <Swiper
            className={style.slide}
            slidesPerView={1}
            pagination={{ type: 'bullets' }}
          >
            <SwiperSlide>
              <img src={this.state.sku?.gallery[0]} className={style.img} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={this.state.sku?.gallery[1]} className={style.img} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={this.state.sku?.gallery[2]} className={style.img} />
            </SwiperSlide>
          </Swiper>
          <div className={style.mid}>
            <div className={style.price}>￥{this.state.sku?.price}</div>
            <div className={style.number}>库存：{this.state.sku?.stock}</div>
            <div className={style.title}>{this.state.sku?.title}</div>
          </div>
          <div className={style.bot}>
            <img src={this.state.sku?.detail[0]} className={style.img} />
            <img src={this.state.sku?.detail[1]} className={style.img} />
            <img src={this.state.sku?.detail[2]} className={style.img} />
            <img src={this.state.sku?.detail[3]} className={style.img} />
          </div>
        </main>
        <footer className={style.foot}>
          <Link to={'/cart'} className={style.link}>
            <i className="iconfont icon-cart" />
            <span>购物车</span>
          </Link>
          <Button className={style.add} onClick={this.add.bind(this)}>加入购物车</Button>
        </footer>
      </div>
    )
  }
}