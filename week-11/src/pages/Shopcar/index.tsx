import * as React from "react";
import { useHistory } from "react-router-dom";
import { ISku } from "../../types";
import style from "./style.module.css";
import Nav from "../../components/Nav";
import Checkbox from "../../components/Checkbox";
import ShopCarItem from "../../components/ShopCarItem";
import * as api from "../../services/api";

export default function Shopcar() {
  let history = useHistory();
  const [carlist, setCarlist] = React.useState<ISku[]>([]);
  const [isCheck, setIsCheck] = React.useState<boolean[]>([]);
  const [isAllCheck, setIsAllCheck] = React.useState<boolean>(false);
  /**
   * 获取购物车数据功能
   * 1.获取商品列表
   *  1.未登录 跳转到login
   * 2.初始化复选框状态
   * 3.更新UI
   */
   React.useEffect(() => {
    const getData = async () => {
      let result = await api.listCart();
      if (result.stat === "OK") {
        let isCheck = [];
        result.rows.map(() => {
          return isCheck.push(false);
        });
        setCarlist(result.rows);
        setIsCheck(isCheck)
      } else {
        history.push("/login");
      }
    }
    getData()
  },[history]);
  
  /**
   * 删除购物车的商品功能
   * 1.获取ids
   * 2.调用相应api
   */
   const getData = async () => {
    let result = await api.listCart();
    if (result.stat === "OK") {
      let isCheck = [];
      result.rows.map(() => {
        return isCheck.push(false);
      });
      setCarlist(result.rows);
      setIsCheck(isCheck)
    } else {
      history.push("/login");
    }
  }

  const doRemove = async () => {
    let ids: string[] = []
    const carlist2 = carlist.map(v => v)
    const isCheck2 = isCheck.map(v => v)
    isCheck2.map((v, w) => {
        if (v === true) {
            ids.push(carlist2[w].id!)
        }
        return v
    })
    await api.removeCart(ids)
    let result = await api.listCart()
    setCarlist(result.rows)
    getData()
}

  /**
   * 单选功能
   * 1.更改个体的选中状态并检验是否已经全选
   */
  const doChange = (isCheckeds, index) => {
    let isAllCheck = true;
    let isChecked = isCheck.map((v, w) => {
      if (w === index) v = isCheckeds;
      if (v === false) isAllCheck = false;
      return v;
    });
    
    setIsCheck([...isChecked]);
    setIsAllCheck(isAllCheck);
  };
  /**
   * 全选功能
   */
  const doAllChange = (isAllCheck) => {
    let isChecks = isCheck.map(() => isAllCheck);
    setIsCheck([...isChecks]);
    console.log(isAllCheck)
    setIsAllCheck(isAllCheck);
  };
  /**
   * 渲染删除按钮
   * 1.根据isCheck的状态来更新UI
   */
  const isDisabled = () => {
    let isPick = false;
    let isChecked = isCheck;
    for (let i = 0; i<isChecked.length; i++){
      if (isChecked[i] === true) {
        isPick = true
        break
      }
    }
    console.log(isPick)
    if (isPick === false) {
      return (
        <button className={style.delete} disabled>
          删除
        </button>
      );
    } else {
      return (
        <button className={style.delete} onClick={doRemove}>
          删除
        </button>
      );
    }
  };

  //html部分
  if (carlist.length === 0)
    return (
      <div className={style.back}>
        <div className={style.empty}>
          <i className="iconfont icon-shop" />
          <span>购物车是空的</span>
        </div>
        <Nav />
      </div>
    );
  return (
    <div className={style.back}>
      <div className={style.wrapper}>
        <div className={style.carlist}>
          {carlist.map((item, index) => (
            <ShopCarItem
              key={item.id}
              value={isCheck[index]}
              sku={item}
              index={index}
              onChange={doChange}
            />
          ))}
        </div>
      </div>
      <div className={style.control}>
        <Checkbox value={isAllCheck} onChange={doAllChange} />
        <span>全选</span>
        {isDisabled()}
      </div>
      <Nav />
    </div>
  );
}
