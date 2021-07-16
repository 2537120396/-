import { useEffect,useState} from 'react'
import {useHistory,useParams,Link} from 'react-router-dom'
import SwiperCore, { Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import { ISku }  from '../../types'
import style from './style.module.css'
import * as api from '../../services/api'
import Toast from '../../components/Toast'
import "swiper/swiper-bundle.min.css"

SwiperCore.use([ Pagination ]);//轮播图

interface Params {
  id: string
}

export default function Detail() {
  const history = useHistory()
  const params = useParams<Params>()
  const[ data, setData] = useState<ISku>();

  useEffect(() => {
    const getData = async () => {
      let result = await api.getSku(params.id) 
      if (result.stat === 'OK') {
        setData(result.data)
      }
    }
    getData()
  },[params.id])

  const add = async() =>{
    let result =await api.addCart(params.id)
    if (result.stat === 'OK') {
      Toast('已加入购物车')
    } else {
      history.push("/login")
      Toast("请先登录")
    }
  }

  if (data === null) return null        
  return(
    <div className={style.page}>
      <main className={style.swiper}>
        <div className={style.swiper_back}>
          <i className="iconfont icon-back" onClick={history.goBack}></i>
        </div>
        <Swiper 
        className = {style.swiperWrap}
        pagination={{bulletActiveClass: style.activePage}}
        >
          {data?.gallery.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <img className={style.swiperImg} src={item} alt=""/>
                </SwiperSlide>
              )
            })}
        </Swiper>
        <div className={style.product}>
          <div className={style.product_price}>￥{data?.price}</div>
          <div className={style.product_stock}>库存：{data?.stock}</div>
          <div className={style.product_title}>{data?.title}</div>
        </div>
        <div className={style.product_detail}>
          {data?.detail.map((item, index) => {
            return <img key={index} src={item} alt=""/>
          })}
        </div>  
      </main>
      <div className={style.footer}>
          <Link className={style.link} to='/Shopcar'>        
            <i className="iconfont icon-cart"></i>    
            <span>购物车</span>       
          </Link>
          <button className={style.addcart} onClick={add}>
            加入购物车          
          </button>      
      </div>
    </div>  
  )
}