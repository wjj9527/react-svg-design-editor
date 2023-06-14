import React, {useContext, useEffect, useRef, useState} from "react";
import './style.less'
import {StoreContext, TYPES} from "@/store";
import Test from '@/pages/Editor/material/nodes/Test'
import GraduatedScale from "@/pages/Editor/components/GraduatedScale";
import SVGScaleLineGroup from "@/pages/Editor/components/SVGScaleLineGroup";
let pageResize: any = null
const EditorView: React.FC = () => {
  const {state,dispatch} = useContext(StoreContext)
  const {currentAction,pageSelectionVisible,nodeSelectionVisible} = state
  const nodes = state.schema.itemNodes
  const [isCanMove,setIsCanMove] = useState(false)
  const SVGContainerRef = useRef(null)
  const handleMouseMove = (event:React.MouseEvent)=>{
    if (isCanMove&&currentAction.id) {
      dispatch({type:TYPES.SET_NODE_RESIZE_MOVE_ATTRIBUTE,value:{event}})
    }
  }
  //鼠标按下可以移动
  const handleMouseDown = (e:React.MouseEvent)=>{
    setIsCanMove(true)
    if (SVGContainerRef.current) {
      //@ts-ignore
      const {left,top} = SVGContainerRef.current.getBoundingClientRect()
      dispatch({type:TYPES.SET_SVG_OFFSET,value:{x:left,y:top}})
    }
  }
  //鼠标弹起不可移动
  const handleMouseUp = ()=>{
    setIsCanMove(false)
    dispatch({type:TYPES.SET_CURRENT_ACTION,value:{currentAction:{}}})
  }
  const svgCanvasSetting = ()=>{
    if (SVGContainerRef.current) {
      //@ts-ignore
      const {left,top,width,height} = SVGContainerRef.current.getBoundingClientRect()
      dispatch({type:TYPES.SET_SVG_CANVAS_STYLE,value:{left,top,width,height}})
    }
  }
  useEffect(()=>{
    svgCanvasSetting()
    console.log(pageSelectionVisible,nodeSelectionVisible)
    if (!pageResize) {
      pageResize = window.addEventListener('resize',svgCanvasSetting)
    }
    return ()=>{
      window.removeEventListener('resize',svgCanvasSetting)
      pageResize = null
    }
  },[pageSelectionVisible,nodeSelectionVisible])
  return (<div className="editor-view" >
      <GraduatedScale>
        <div className="canvas-container" ref={SVGContainerRef}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%" height="100%"
            style={{overflow:'hidden'}}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <defs>
              <pattern id="pattern_grid" patternUnits="userSpaceOnUse" x="0" y="0" width="10" height="10">
                <rect width="1" height="1" rx="1" ry="1" fill="#555555" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern_grid)" />
            {/*scale基线*/}
            <SVGScaleLineGroup/>
            {/*element物料*/}
            <g>
              {
                nodes.map((item:any)=><Test key={item.id} {...item}/>)
              }
            </g>
          </svg>
        </div>
      </GraduatedScale>
    </div>
  )
}

export default EditorView
