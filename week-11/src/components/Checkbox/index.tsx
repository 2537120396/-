import * as React from 'react'
import style from './style.module.css'

interface Props {
  value: boolean
  className?: string
  index?: number
  onChange: (value: boolean, index?:number) => void
}

export default function Checkbox(props: Props) {

  const className =() => {
    let name = 'iconfont ' + style.checkbox
    if(props.value === true){
      name += ' icon-roundcheckfill ' + style.checked
    }else{
      name += ' icon-round'
    }
    if (props.className) 
      name += ' ' + props.className
    console.log(name)
    return name
  }
  return (
    <i
        className={className()}
        onClick={() => props.onChange(!props.value,props.index)}
    />
)}
