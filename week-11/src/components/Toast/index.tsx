import * as ReactDOM from 'react-dom'
import style from './style.module.css'

export default function Toast(text:string){
    let el = document.createElement('div')
    document.body.appendChild(el)
    ReactDOM.render(
      <div className={style.wrap}>
        <div className={style.box}>{text}</div>
      </div>, el)
    setTimeout(() => {
       ReactDOM.unmountComponentAtNode(el)
       document.body.removeChild(el)
    }, 2000)
    return (
       <div className={style.wrap}>
          <div className={style.box}>{text}</div>
       </div>
    )
}