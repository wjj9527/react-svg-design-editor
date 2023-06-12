import React, {useContext} from "react";
import {StoreContext} from "@/store";
const SVGScaleLineGroup:React.FC=()=>{
  const {state,} = useContext(StoreContext)
  const {scalePosition,svgStyle,scaleHoverLine} = state
  return <g>
    {
      scalePosition.x.map((item:number,index:number)=><line key={index} x1={item} y1="0" x2={item} y2={svgStyle.height} stroke="#e52727" width={5}/>)
    }
    {
      scalePosition.y.map((item:number,index:number)=><line key={index} x1="0" y1={item} x2={svgStyle.width} y2={item} stroke="#e52727" width={5}/>)
    }
    {
      scaleHoverLine.yShow&&<line x1="0" y1={scaleHoverLine.y} x2={svgStyle.width} y2={scaleHoverLine.y} stroke="#e52727" width={5}/>
    }
    {
      scaleHoverLine.xShow&&<line x1={scaleHoverLine.x} y1="0" x2={scaleHoverLine.x} y2={svgStyle.height} stroke="#e52727" width={5}/>
    }
  </g>
}
export default SVGScaleLineGroup
