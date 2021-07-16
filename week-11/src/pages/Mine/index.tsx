import { useEffect,useState} from 'react'
import {useHistory} from 'react-router-dom'
import { IUser } from '../../types'

import style from './style.module.css'
import Nav from '../../components/Nav'
import * as api from "../../services/api"

export default function Login() {
  const history = useHistory()
  const[user, setUser] = useState<IUser>();

  const logout = async() =>{
    let result = await api.logout()
    if (result.stat === "OK") {
      history.push("/login")
    }
  }
  useEffect(() => {
    const userinfo = async () => {
      let result = await api.userInfo()
      if (result.stat === 'OK') {
        setUser(result.data)
      }else {
        history.push("/login")
      }
    }
    userinfo()
  },[history])
  return (
    <div className={style.back}>
      <div className={style.wrapper}>
        <img className={style.avater} src={user?.avatar} alt="淘宝头像"/>
        <div className={style.text}>{user?.nickname}</div>
        <button className={style.outputButton} onClick={logout} >退出登录</button>
      </div>
      <Nav />
    </div>
  )
}