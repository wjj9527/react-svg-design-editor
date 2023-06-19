import React from "react";
import ZoomDraggable from "@/pages/Editor/components/ZoomDraggable";
interface TextProps{
  x:number,
  y:number,
  width:number,
  height:number,
  id:string
}
const Text:React.FC<TextProps>=(props)=>{
  return <ZoomDraggable  {...props}>
    <div>测试</div>
  </ZoomDraggable>
}

export default Text
