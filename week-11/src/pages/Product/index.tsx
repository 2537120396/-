import * as React from 'react'
import { ISku }  from '../../types'
import * as api from '../../services/api'
import ProductItem from '../../components/ProductItem'
import style from './style.module.css'
import Nav from '../../components/Nav'

export default function Product(){
  /** 
  *获取数据函数
  *1.调用api获取商品详细信息
  *2.判断result的stat属性判断是否成功获得数据
  *     OK，那么说明成功获取数据
  *3.更新状态
  */
  const [rows, setRows] = React.useState<ISku[]>([])

  React.useEffect(() => {
    const getData = async () => {
      let result = await api.listSku()
      if (result.stat === 'OK') {
        setRows(result.rows)
      }
    }
    getData()
  }, [])
    return (
      <div className={style.back}>
        <div className={style.wrapper}>
          <main className={style.container}>
          {rows.map(item => (
            <ProductItem sku={item} key={item.id} />
          ))}
          </main>
        </div>
        <Nav /> 
      </div>
    )
}


