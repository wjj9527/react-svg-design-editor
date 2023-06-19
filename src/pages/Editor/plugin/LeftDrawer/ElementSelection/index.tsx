import React, {useEffect, useState} from "react";
import './style.less'
import {elementOptions} from '@/pages/Editor/material'
import ElementItem from './ElementItem'
import ElementCollapse from '@/pages/Editor/components/ElementCollapse'
const ElementSelection:React.FC = ()=>{
  const [activeKey,setActiveKey] = useState('')
  const [activeItems,setActiveItems] = useState([])
  const handleMenuClick = (item:any)=>{
    const {type,children} = item
    if (activeKey === type) {
      return
    }
    setActiveKey(type)
    setActiveItems(children)
  }
  useEffect(()=>{
    const [active] = elementOptions
    const {type,children} = active
    // @ts-ignore
    setActiveItems(children)
    setActiveKey(type)
  },[])
  return <div className="element-selection">
    <div className="selection-bar">
      {
        elementOptions.map(item=><div onClick={handleMenuClick.bind(this,item)} className={`selection-item ${activeKey===item.type?'active':''}`} key={item.type}>
          {item.icon}
        </div>)
      }

    </div>
    <div className="selection-content">
      {
        activeItems.map((item:any)=>(
          <ElementCollapse key={item.type} title={item.title}>
            <div className="item-group-content">
              {
                item.children.map((item:any)=><ElementItem title={item.title} type={item.type} icon={item.icon} key={item.type}/>)
              }
            </div>
          </ElementCollapse>
        ))
      }

    </div>
  </div>
}
export default ElementSelection
