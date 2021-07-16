import * as React from "react"
import {useHistory,Link} from 'react-router-dom'
import style from './style.module.css'
import Toast from "../../components/Toast"
import * as api from "../../services/api"


export default function Login() {
  const history = useHistory()
  const [username, setUsername] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  
  const login =async() =>{
    try{
      let result = await api.login(username,password)
      if (result.stat === 'OK') {
         history.push('/mine')
      } else {
        Toast(result.message)
      }
    } catch {}
  }
  
  const isDisabled  = () =>{
    let disabled = false
    if (username !== '' && password !== '') {
      disabled = true
    } else {
      disabled = false
    }
    if (disabled) {
      return (
        <button className={style.button} onClick={login} >
          登 录
        </button>
      )
    } else {
      return (
        <button className={style.button} disabled onClick={login} >
          登 录
        </button>
      )
    }
  }
  return (
    <div className={style.wrap}>
      <Link to="/product" className={style.tao}>
        <img src="https://gw.alicdn.com/tfs/TB1puqzr6MZ7e4jSZFOXXX7epXa-160-160.png" className={style.img} alt=""/>
      </Link>
      <input
        type="text"
        placeholder="用户名"
        className={style.inputText}
        onChange={event=>setUsername(event.target.value)}
      />
      <input 
      type="password" 
      placeholder="密 码" 
      className={style.inputText}
      onChange={event =>setPassword(event.target.value)}
      />
      {isDisabled()}
    </div>
  );
}


