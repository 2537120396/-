import * as React from "react";

import style from './style.module.css'
import Checkbox from "../../components/Checkbox";
import { ISku } from "../../types";

interface Props {
  sku: ISku;
  value: boolean;
  onChange: (value: boolean, index?:number) => void;
  index?: number;
}
export default function ShopCarItem(props:Props){
  return (
    <div className={style.caritem}>
      <Checkbox
        value={props.value}
        onChange={props.onChange}
        index={props.index}
      />
      <img className={style.img} src={props.sku.cover} alt="商品封面图"/>
      <div className={style.text}>
        <p className={style.title}>{props.sku.title}</p>
        <p className={style.price}>￥{props.sku.price}</p>
      </div>
    </div>
  );
}