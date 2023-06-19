import React from "react";
import ZoomDraggable from "@/pages/Editor/components/ZoomDraggable";
import {Button} from "antd";
interface TextProps{
  x:number,
  y:number,
  width:number,
  height:number,
  id:string
}
const Text:React.FC<TextProps>=(props)=>{
  return <ZoomDraggable  {...props}>
    <Button>测试</Button>
  </ZoomDraggable>
}

export default Text
