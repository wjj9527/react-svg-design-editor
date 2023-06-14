import React from "react";
import classNames from "classnames";
import {Tooltip} from 'antd'
interface IProps{
  iconText:string,
  text:string,
  disabled?:boolean
}
const IconBtn:React.FC<IProps> = ({iconText,text,disabled})=>{
  const className = classNames('iconfont',iconText,{
    disabled
  })
  return <div className="btn">
    <Tooltip placement="top" title={text}>
      <i className={className}></i>
    </Tooltip>
  </div>
}

export default  IconBtn
