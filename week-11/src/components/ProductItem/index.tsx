import style from './style.module.css'
import { Link} from "react-router-dom"
import { ISku } from "../../types"

interface Props {
  sku: ISku
}
export default function ProductItem(props:Props){
  return(
    <Link to={"/detail/" + props.sku.id} className={style.ProductItem}>
        <img src={props.sku.cover} className={style.cover} alt=""/>

        <div className={style.ProductItemBottom}>
          <div className={style.ProductItemTitle}>{props.sku.title}</div>
          <div className={style.ProductItemPrice}>￥{props.sku.price}</div>
        </div>
      </Link>
  )
}
