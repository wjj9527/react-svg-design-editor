import React from "react";
import classNames from "classnames";
import {Tooltip} from 'antd'
import './style.less'
interface IProps{
  iconText:string,
  text:string,
  disabled?:boolean,
  onClick?:()=>void
}
const IconBtn:React.FC<IProps> = ({iconText,text,disabled,onClick})=>{
  const className = classNames('iconfont',iconText,{
    disabled
  })
  const handleClick = ()=>{
    if (!disabled&&onClick) {
      onClick()
    }
  }
  return <div className="btn" onClick={handleClick}>
    <Tooltip placement="top" title={text}>
      <i className={className}></i>
    </Tooltip>
  </div>
}

export default  IconBtn
