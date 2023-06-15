import React, {useContext, useEffect, useState} from "react";
import Test from "@/pages/Editor/material/nodes/Test";
import './style.less'
import {StoreContext, TYPES} from "@/store";
interface BlockGroupProps{
  id:number|string
  children:any[]
}
const BlockGroup:React.FC<BlockGroupProps>=({id,children})=>{
  const {state,dispatch} = useContext(StoreContext)
  const [fillRectSetting,setFillRectSetting] = useState({
    x:0,
    y:0,
    width:0,
    height:0
  })

  const handleContextMenu = (e:React.MouseEvent)=>{
    e.stopPropagation()
    e.preventDefault()
    console.log('handleContextMenu')
    console.log(e)
    dispatch({
      type:TYPES.SET_FOLLOW_MENU_CONFIG,
      value:{
        visible:true,
        x:e.pageX,
        y:e.pageY
      }
    })
    console.log(state)
  }
  useEffect(()=>{
    //g标签无法进行事件处理，必须用dom填充进行事件降级
    let x: number | null=null
    let y: number | null=null
    let width: number
    let height: number
    let currentXMax: number | null=null
    let currentYMax: number | null=null
    children.forEach(item=>{

      if (x===null||item.x < x) {
        x = item.x
      }
      if (y===null||item.y < y) {
        y = item.y
      }
      if (currentXMax===null||item.x+item.width > currentXMax) {
        currentXMax = item.x+item.width
      }
      if (currentYMax===null||item.y+item.height > currentYMax) {
        currentYMax = item.y+item.height
      }
    })
    // @ts-ignore
    width = currentXMax - x
    // @ts-ignore
    height = currentYMax - y
    // @ts-ignore
    setFillRectSetting({x,y,width,height})

  },[children])
  return children.length?<g className="block-group-container">
    <rect className="fill" fill="rgba(255,255,255,.1)" {...fillRectSetting}  onContextMenu={handleContextMenu}/>
    {children.map(item=><Test key={item.id} {...item}/>)}
  </g>:<></>
}

export default BlockGroup
