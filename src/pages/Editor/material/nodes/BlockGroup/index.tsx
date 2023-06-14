import React from "react";
import Test from "@/pages/Editor/material/nodes/Test";
import './style.less'
interface BlockGroupProps{
  id:number|string
  children:any[]
}
const BlockGroup:React.FC<BlockGroupProps>=({id,children})=>{
  const handleContextMenu = (e:React.MouseEvent)=>{
    // e.stopPropagation()
    e.preventDefault()
    console.log('handleContextMenu')
  }
  return <g className="block-group-container" onContextMenu={handleContextMenu}>
    {/*<rect className="fill" fill="#dddddd" />*/}
    {children.map(item=><Test key={item.id} {...item}/>)}
  </g>
}
export default BlockGroup
