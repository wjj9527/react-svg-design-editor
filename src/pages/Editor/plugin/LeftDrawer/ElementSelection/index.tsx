import React from "react";
import './style.less'
import ElementCollapse from '@/pages/Editor/components/ElementCollapse'
const ElementSelection:React.FC = ()=>{
  return <div className="element-selection">
    <div className="selection-bar">
      <div className="selection-item">
        <i className="iconfont icon-xitongzujian"/>
      </div>
    </div>
    <div className="selection-content">
      <ElementCollapse title="测试"><div>11</div></ElementCollapse>
      <ElementCollapse title="测试"><div>11</div></ElementCollapse>
      <ElementCollapse title="测试"><div>11</div></ElementCollapse>
    </div>
  </div>
}
export default ElementSelection
