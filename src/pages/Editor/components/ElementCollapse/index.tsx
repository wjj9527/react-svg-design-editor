import React, {useState} from "react";
import './style.less'
interface ElementCollapseProps {
  title:string,
  children:React.ReactElement,
}
const ElementCollapse:React.FC<ElementCollapseProps> = ({title,children})=>{
  const [contentVisible,setContentVisible] = useState(true)
  return <div className="element-collapse-container">
    <div className="element-collapse-text" onClick={setContentVisible.bind(this,!contentVisible)}>
      {
        contentVisible?<i className="iconfont icon-jianshao"/>:<i className="iconfont icon-zengjia"/>
      }
      {title}
    </div>
    {
      contentVisible&&(<div className="element-collapse-content">
        {children}
      </div>)
    }
  </div>
}

export default ElementCollapse
