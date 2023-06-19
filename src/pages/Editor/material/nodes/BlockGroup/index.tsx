import React, {useContext, useEffect, useState} from "react";
import Test from "@/pages/Editor/material/nodes/Test";
import './style.less'
import {StoreContext, TYPES} from "@/store";
import {elementComponents,elementDefaultValues} from "@/pages/Editor/material";
interface BlockGroupProps{
  id:string
  itemNodes:any[]
}
const BlockGroup:React.FC<BlockGroupProps>=({id,itemNodes})=>{
  const {state,dispatch} = useContext(StoreContext)
  const {svgOffset} = state
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
  //选中需要移动的节点操作
  const handleEvent = (e: React.MouseEvent) => {
    const target = 'GROUP_RECT'
    const type = 'MOVE'
    // itemNodes
    const {pageX,pageY} = e
    //@ts-ignore
    const {bottom,height,left,right,top,width,x,y} = e.target.getBoundingClientRect()
    //当前鼠标点位与边框偏移量
    const [offsetX,offsetY]  = [pageX-x,pageY-y]
    const itemOffsetArray = itemNodes.map(item=>{
      const {id,x,y} = item
      return {id,x:x-(pageX-svgOffset.x),y:y-(pageY-svgOffset.y)}
    })
    const currentAction = {target, type,id,bottom,height,left,right,top,width,x,y,offsetX,offsetY,itemOffsetArray}
    dispatch({type:TYPES.SET_CURRENT_ACTION,value:{currentAction}})
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
  const renderNodes = ()=>{
    return itemNodes.map(item=>{
      const {type} = item
      // @ts-ignore
      const Element = elementComponents[type]
      return <Element key={item.id} {...item} />
    })
  }
  return itemNodes.length?<g className="block-group-container">
    <rect
      className="fill"
      fill="rgba(255,255,255,.1)"
      {...fillRectSetting}
      onMouseDown={handleEvent}
      onContextMenu={handleContextMenu}/>
    {renderNodes()}
  </g>:<></>
}

export default BlockGroup
