import React, {useContext, useEffect, useRef, useState} from "react";
import './style.less'
import {StoreContext, TYPES} from "@/store";
import Test from '@/pages/Editor/material/nodes/Test'
import GraduatedScale from "@/pages/Editor/components/GraduatedScale";
import SVGScaleLineGroup from "@/pages/Editor/components/SVGScaleLineGroup";
import BlockGroup from "@/pages/Editor/material/nodes/BlockGroup";

let pageResize: any = null
type SvgBlockContainerConfig = {
  x:number,
  y:number,
  height:number,
  width:number
}
type SvgStartActionBasePoint = {
  x:number,
  y:number
}
const EditorView: React.FC = () => {
  const {state,dispatch} = useContext(StoreContext)
  const {currentAction,pageSelectionVisible,nodeSelectionVisible,svgOffset} = state
  const nodes = state.schema.itemNodes
  const [isCanMove,setIsCanMove] = useState(false)
  const SVGContainerRef = useRef(null)
  //划组容器信息
  const [svgBlockContainerConfig,setSvgBlockContainerConfig] = useState<SvgBlockContainerConfig>({
    x:0,
    y:0,
    height:0,
    width:0
  })
  //记录划组初始点位用于计算
  const [svgStartActionBasePoint,setSvgStartActionBasePoint] = useState<SvgStartActionBasePoint>({
    x:0,
    y:0
  })
  const handleMouseMove = (event:React.MouseEvent)=>{
    const isElementHandle = !!Object.keys(currentAction).length
    if (isCanMove&&isElementHandle) {
      dispatch({type:TYPES.SET_NODE_RESIZE_MOVE_ATTRIBUTE,value:{event}})
    }else if(isCanMove){//划组操作 千万不要动！！！！！
      const {pageX,pageY} = event
      const config = {...svgBlockContainerConfig}
      const {x,y} = config
      const baseY = pageY - svgOffset.y
      const baseX = pageX - svgOffset.x
      //此处判断鼠标轨迹的四种方向
      //右下移动方向
      if (baseY > y && baseX > x) {
        const height = baseY - svgStartActionBasePoint.y
        const width = baseX - svgStartActionBasePoint.x
        if (height>0 && width>0) {
          Object.assign(config,{height,width})
          setSvgBlockContainerConfig(config)
        }else if(height<0 && width<0){
          const sx = baseX
          const sy = baseY
          const height = svgStartActionBasePoint.y - baseY
          const width = svgStartActionBasePoint.x - baseX
          setSvgBlockContainerConfig({x:sx,y:sy,height,width})
        }else if(height>0 && width<0){
          const sx = baseX
          const sy = svgStartActionBasePoint.y
          const height = baseY - svgStartActionBasePoint.y
          const width = svgStartActionBasePoint.x - baseX
          setSvgBlockContainerConfig({x:sx,y:sy,height,width})
        }else if(height<0 && width>0){
          const height = svgStartActionBasePoint.y - baseY
          const width = baseX - svgStartActionBasePoint.x
          const sx =  svgStartActionBasePoint.x
          const sy =  svgStartActionBasePoint.y - height
          setSvgBlockContainerConfig({x:sx,y:sy,height,width})
        }
      }
      //左上移动方向
      if (baseY < y && baseX < x) {
        const sx = baseX
        const sy = baseY
        const height = svgStartActionBasePoint.y - baseY
        const width = svgStartActionBasePoint.x - baseX
        setSvgBlockContainerConfig({x:sx,y:sy,height,width})
      }
      // 左下移动方向
      if (baseY > y && baseX < x) {

        const height = baseY - svgStartActionBasePoint.y
        const width = svgStartActionBasePoint.x - baseX
        if (height > 0 && width > 0) {
          const sx = baseX
          const sy = svgStartActionBasePoint.y
          setSvgBlockContainerConfig({x:sx,y:sy,height,width})
        }else if(height < 0 && width > 0){
          const height = svgStartActionBasePoint.y - baseY
          const width = svgStartActionBasePoint.x - baseX
          setSvgBlockContainerConfig({x:baseX,y:baseY,height,width})
        }
      }
      // 右上移动方向
      if (baseY < y && baseX > x) {
        const height = svgStartActionBasePoint.y - baseY
        const width = baseX - svgStartActionBasePoint.x
        if (height > 0 && width > 0) {
          const sx =  svgStartActionBasePoint.x
          const sy =  svgStartActionBasePoint.y - height
          setSvgBlockContainerConfig({x:sx,y:sy,height,width})
        }else if(height>0&&width<0){
          const sx = baseX
          const sy = baseY
          const height = svgStartActionBasePoint.y - baseY
          const width = svgStartActionBasePoint.x - baseX
          setSvgBlockContainerConfig({x:sx,y:sy,height,width})
        }
      }
    }
  }
  //鼠标按下可以移动
  const handleMouseDown = (event:React.MouseEvent)=>{
    setIsCanMove(true)
    if (SVGContainerRef.current) {
      //@ts-ignore
      //计算svg在页面中的偏移量
      const {left,top} = SVGContainerRef.current.getBoundingClientRect()
      dispatch({type:TYPES.SET_SVG_OFFSET,value:{x:left,y:top}})
      //currentAction为空对象则说明进行划组操作
      if (!Object.keys(currentAction).length) {
        const {pageX,pageY} = event
        const x = pageX - left
        const y = pageY - top
        const config = {x,y,height:0,width:0}
        setSvgBlockContainerConfig(config)
        setSvgStartActionBasePoint({x,y})
      }
    }
  }
  //鼠标弹起不可移动
  const handleMouseUp = ()=>{
    setIsCanMove(false)
    if (Object.keys(currentAction).length) {
      dispatch({type:TYPES.SET_CURRENT_ACTION,value:{currentAction:{}}})
    }else{//此处进行划块区域内的元素判断
      dispatch({type:TYPES.SET_BLOCK_ELEMENT_GROUP,value:svgBlockContainerConfig})
    }

  }
  const svgCanvasSetting = ()=>{
    if (SVGContainerRef.current) {
      //@ts-ignore
      const {left,top,width,height} = SVGContainerRef.current.getBoundingClientRect()
      dispatch({type:TYPES.SET_SVG_CANVAS_STYLE,value:{left,top,width,height}})
    }
  }
  const renderNodes = ()=>{
    return nodes.map((item:any)=>{
      if (item.type === 'BLOCK_GROUP') {
        return <BlockGroup key={item.id} {...item}/>
      }else{
        return <Test key={item.id} {...item}/>
      }
    })
  }
  useEffect(()=>{
    svgCanvasSetting()
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
            {/*区间划块(选中，非操作)*/}

            <rect width="100%" height="100%" fill="url(#pattern_grid)" />
            {/*scale基线*/}
            <SVGScaleLineGroup/>
            {/*element物料*/}
            {
              renderNodes()
            }
            <g className="svg-block-container">
              <rect  {...svgBlockContainerConfig} fill="rgba(176, 91, 252, 0.2)" />
            </g>
          </svg>
        </div>
      </GraduatedScale>
    </div>
  )
}

export default EditorView
