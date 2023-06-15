import React, {useContext, useEffect, useState} from "react";
import Test from "@/pages/Editor/material/nodes/Test";
import './style.less'
import {StoreContext, TYPES} from "@/store";
interface BlockGroupProps{
  id:string
  itemNodes:any[]
}
const BlockGroup:React.FC<BlockGroupProps>=({id,itemNodes})=>{
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
    dispatch({
      type:TYPES.SET_FOLLOW_MENU_CONFIG,
      value:{
        visible:true,
        x:e.pageX,
        y:e.pageY
      }
    })
  }

  useEffect(()=>{
    //g标签无法进行事件处理，必须用dom填充进行事件降级
    let x: number | null=null
    let y: number | null=null
    let width: number
    let height: number
    let currentXMax: number | null=null
    let currentYMax: number | null=null
    itemNodes.forEach(item=>{

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
    // console.log(findContainerById(id,state.schema))
    dispatch({type:TYPES.SET_ELEMENT_NODE_DATA_BY_ID,value:{id,data:{x,y,width,height}}})

  },[itemNodes])
  return itemNodes.length?<g className="block-group-container">
    <rect className="fill" fill="rgba(255,255,255,.1)" {...fillRectSetting}  onContextMenu={handleContextMenu}/>
    {itemNodes.map(item=><Test key={item.id} {...item}/>)}
  </g>:<></>
}

export default BlockGroup
