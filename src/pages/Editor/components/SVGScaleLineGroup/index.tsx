import React, {useContext, useEffect, useState} from "react";
import {StoreContext} from "@/store";
const SVGScaleLineGroup:React.FC=()=>{
  const {state,} = useContext(StoreContext)
  const {scalePosition,svgStyle,scaleHoverLine,schema,currentAction,scaleVisible} = state
  const [xBaseShowPoint,setXBaseShowPoint] = useState([])
  const [yBaseShowPoint,setYBaseShowPoint] = useState([])
  const setBasePointGroup = ()=>{
    const xBasePointGroup: number[] = []
    const yBasePointGroup: number[] = []
    schema.itemNodes.forEach((item:any)=>{
      const {x,y,height,width,id} = item
      if (id !== currentAction.id) {
        xBasePointGroup.push(x)
        xBasePointGroup.push(parseInt(x+width))
        xBasePointGroup.push(parseInt(x+width/2))
        yBasePointGroup.push(y)
        yBasePointGroup.push(parseInt(y+height))
        yBasePointGroup.push(parseInt(y+height/2))
      }
      // console.log(xBasePointGroup)
    })
    const targetNode = schema.itemNodes.find((item:any)=>item.id===currentAction.id)
    if (!!targetNode) {
      const {x,y,height,width} = targetNode
      const [xs,xm,xe,ys,ym,ye] = [x,parseInt(x+width/2),x+width,y,parseInt(y+height/2),parseInt(y+height)]
      const xGroup = []
      const yGroup = []
      if (xBasePointGroup.includes(xs)) {
        xGroup.push(xs)
      }
      if (xBasePointGroup.includes(xm)) {
        xGroup.push(xm)
      }
      if (xBasePointGroup.includes(xe)) {
        xGroup.push(xe)
      }
      if (yBasePointGroup.includes(ys)) {
        yGroup.push(ys)
      }
      if (yBasePointGroup.includes(ym)) {
        yGroup.push(ym)
      }
      if (yBasePointGroup.includes(ye)) {
        yGroup.push(ye)
      }
      // @ts-ignore
      setXBaseShowPoint(xGroup)
      // @ts-ignore
      setYBaseShowPoint(yGroup)
    }else{
      // @ts-ignore
      setXBaseShowPoint([])
      // @ts-ignore
      setYBaseShowPoint([])
    }

  }
  useEffect(()=>{
    setBasePointGroup()
  },[schema,currentAction])
  return <g>
    {/*x轴标记基线*/}
    {
      scaleVisible&&scalePosition.x.map((item:number,index:number)=><line className="sign-line" key={index} x1={item} y1="0" x2={item} y2={svgStyle.height} stroke="#e52727" width={5}/>)
    }
    {/*y轴编辑基线*/}
    {
      scaleVisible&&scalePosition.y.map((item:number,index:number)=><line key={index} x1="0" y1={item} x2={svgStyle.width} y2={item} stroke="#e52727" width={5}/>)
    }
    {/*x轴查看基线*/}
    {
      scaleVisible&&scaleHoverLine.yShow&&<line x1="0" y1={scaleHoverLine.y} x2={svgStyle.width} y2={scaleHoverLine.y} stroke="#e52727" width={5}/>
    }
    {/*y轴查看基线*/}
    {
      scaleVisible&&scaleHoverLine.xShow&&<line x1={scaleHoverLine.x} y1="0" x2={scaleHoverLine.x} y2={svgStyle.height} stroke="#e52727" width={5}/>
    }
    {/*x轴对齐基线组*/}
    {
      xBaseShowPoint.map((item,index)=><line key={index} x1={item} y1="0" x2={item} y2={svgStyle.height} stroke="#95e06d" width={5}/>)
    }
    {/*y轴对齐基线组*/}
    {
      yBaseShowPoint.map((item,index)=><line key={index} x1="0" y1={item} x2={svgStyle.width} y2={item} stroke="#95e06d" width={5}/>)
    }
  </g>
}
export default SVGScaleLineGroup
