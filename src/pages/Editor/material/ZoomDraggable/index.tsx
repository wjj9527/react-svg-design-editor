import React, {useContext, useRef} from "react";
import {StoreContext, TYPES} from "@/store";
import "./index.less"
interface ZoomDraggableProps {
  x: number,
  y: number,
  width: number,
  height: number,
  id: string,
  zoom?: string | number
}

const ZoomDraggable: React.FC<ZoomDraggableProps> = ({x, y, width, height, id}) => {
  const {dispatch} = useContext(StoreContext)
  //选中需要移动的节点操作
  const handleEvent = (e: React.MouseEvent, { target, type }:{ target: string, type: string }) => {
    const {pageX,pageY} = e
    //@ts-ignore
    const {bottom,height,left,right,top,width,x,y} = e.target.getBoundingClientRect()
    // console.log(pageX,pageY,'--------------')
    //当前鼠标点位与边框偏移量
    const [offsetX,offsetY]  = [pageX-x,pageY-y]
    const currentAction = {target, type,id,bottom,height,left,right,top,width,x,y,offsetX,offsetY}
    dispatch({type:TYPES.SET_CURRENT_ACTION,value:{currentAction}})
  }

  return <g transform={`translate(${x},${y})`}>
    <rect x="0" y="0"
          style={{cursor:"move"}}
          className="resize-draggable-container"
          onMouseDown={e => handleEvent(e, {target: 'MOVE_CONTENT', type: 'MOVE'})}
          width={width} height={height} fill="rgba(0,0,0,0)"/>
    <rect id="resize-left-top" x={-4} y={-4} width="8" height="8" fill="#1677ff"
          style={{cursor:"nw-resize"}}
          onMouseDown={e => handleEvent(e, {target: 'LEFT_TOP', type: 'RESIZE'})}/>
    <rect id="resize-left-center" x={-4} y={height / 2 - 4} width="8" height="8" fill="#1677ff"
          style={{cursor:"w-resize"}}
          onMouseDown={e => handleEvent(e, {target: 'LEFT_CENTER', type: 'RESIZE'})}/>
    <rect id="resize-left-bottom" x="-4" y={height - 4} width="8" height="8" fill="#1677ff"
          style={{cursor:"sw-resize"}}
          onMouseDown={e => handleEvent(e, {target: 'LEFT_BOTTOM', type: 'RESIZE'})}/>
    <rect id="resize-center-top" x={width / 2 - 4} y={-4} width="8" height="8" fill="#1677ff"
          style={{cursor:"s-resize"}}
          onMouseDown={e => handleEvent(e, {target: 'CENTER_TOP', type: 'RESIZE'})}/>
    <rect id="resize-center-bottom" x={width / 2 - 4} y={height - 4} width="8" height="8" fill="#1677ff"
          style={{cursor:"s-resize"}}
          onMouseDown={e => handleEvent(e, {target: 'CENTER_BOTTOM', type: 'RESIZE'})}/>
    <rect id="resize-right-top" x={width - 4} y={-4} width="8" height="8" fill="#1677ff"
          style={{cursor:"sw-resize"}}
          onMouseDown={e => handleEvent(e, {target: 'RIGHT_TOP', type: 'RESIZE'})}/>
    <rect id="resize-right-center" x={width - 4} y={height / 2 - 4} width="8" height="8" fill="#1677ff"
          style={{cursor:"w-resize"}}
          onMouseDown={e => handleEvent(e, {target: 'RIGHT_CENTER', type: 'RESIZE'})}/>
    <rect id="resize-right-bottom" x={width - 4} y={height - 4} width="8" height="8" fill="#1677ff"
          style={{cursor:"nw-resize"}}
          onMouseDown={e => handleEvent(e, {target: 'RIGHT_BOTTOM', type: 'RESIZE'})}/>

    {/*<circle cx={width/2} cy={height-width/2} r={width/2} fill="white"/>*/}
  </g>
}

export default ZoomDraggable
