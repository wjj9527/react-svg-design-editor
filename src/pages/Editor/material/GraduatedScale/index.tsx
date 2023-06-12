import React, {useContext, useEffect, useRef, useState} from "react";
import './style.less'
import {StoreContext,TYPES} from "@/store";
interface ScaleProps {
  index:number
}
const ScaleX:React.FC<ScaleProps> = ({index})=>{


  return <div className="scale-x" >
    <div className="scale-text">
      {index*50+50}
    </div>
    <div className="scale-5px"/>
    <div className="scale-5px h"/>
    <div className="scale-5px"/>
    <div className="scale-5px h"/>
    <div className="scale-5px"/>
    <div className="scale-5px h"/>
    <div className="scale-5px"/>
    <div className="scale-5px h"/>
    <div className="scale-5px"/>
    <div className="scale-5px mh"/>
    {/*<div className="scale-hover-text">0</div>*/}
  </div>
}

const ScaleY:React.FC<ScaleProps> = ({index})=>{
  return <div className="scale-y">
    <div className="scale-text">
      {index*50+50}
    </div>
    <div className="scale-5px"/>
    <div className="scale-5px h"/>
    <div className="scale-5px"/>
    <div className="scale-5px h"/>
    <div className="scale-5px"/>
    <div className="scale-5px h"/>
    <div className="scale-5px"/>
    <div className="scale-5px h"/>
    <div className="scale-5px"/>
    <div className="scale-5px mh"/>
  </div>
}

const GraduatedScale:React.FC = ({children})=>{
  const scaleXBarRef = useRef(null)
  const scaleYBarRef = useRef(null)
  const [scaleXSize,setScaleXSize] = useState([])
  const [scaleYSize,setScaleYSize] = useState([])
  const [mouseX,setMouseX] = useState(0)
  const [mouseY,setMouseY] = useState(0)
  const [offsetX,setOffsetX] =useState(0)
  const [offsetY,setOffsetY] =useState(0)
  const {state,dispatch} = useContext(StoreContext)
  const {scalePosition} = state
  const scaleSizeSetting = ()=>{
    const scaleX = scaleXBarRef.current
    const scaleY = scaleYBarRef.current
    if (scaleX) {
      const {clientWidth} = scaleX
      const size = parseInt(String(clientWidth / 50 + 1))
      // @ts-ignore
      setScaleXSize([...Array(size).keys()])
      // @ts-ignore
      //当前x偏移量
      setOffsetX(scaleX.getBoundingClientRect().x)
    }
    if (scaleY) {
      const {clientHeight} = scaleY
      const size = parseInt(String(clientHeight / 50 + 1))
      // @ts-ignore
      setScaleYSize([...Array(size).keys()])
      // @ts-ignore
      //当前y偏移量
      setOffsetY(scaleY.getBoundingClientRect().y)
    }
  }
  const handleScaleXBarMouseMove = (e:React.MouseEvent)=>{
    const {clientX} = e
    setMouseX(clientX-offsetX)

  }
  const handleScaleYBarMouseMove = (e:React.MouseEvent)=>{
    const {clientY} = e
    setMouseY(clientY-offsetY)
  }
  const handleScaleXBarClick = ()=>{
    dispatch({type:TYPES.SET_SCALE_POSITION,value:{scale:'x',position:mouseX}})
  }
  const handleScaleYBarClick = ()=>{
    dispatch({type:TYPES.SET_SCALE_POSITION,value:{scale:'y',position:mouseY}})
  }
  useEffect(()=>{
    scaleSizeSetting()
    window.addEventListener('resize', scaleSizeSetting);
    return ()=>{
      window.removeEventListener('resize', scaleSizeSetting);
    }
  },[])
  return <div className="graduated-scale">
    <div className="horizontal">
      <div className="visible-btn"/>
      <div className="horizontal-scale" ref={scaleXBarRef} onMouseMove={handleScaleXBarMouseMove} onClick={handleScaleXBarClick}>
        <div className="scale-x-container">
          {
            scaleXSize.map((_)=><ScaleX key={_} index={_}/>)
          }
          <div className="line" style={{left:mouseX-1}}/>
          <div className="scale-hover-text" style={{left:mouseX+4}}>{mouseX}</div>
          {
            scalePosition.x.map((item:number)=><div className="sign-line" key={item} style={{left:item-1}}/>)
          }

        </div>
      </div>
    </div>
    <div className="vertical">
      <div className="vertical-scale" ref={scaleYBarRef} onMouseMove={handleScaleYBarMouseMove} onClick={handleScaleYBarClick}>
        <div className="scale-y-container">
          {
            scaleYSize.map((_)=><ScaleY key={_} index={_}/>)
          }
          <div className="line" style={{top:mouseY-1}}/>
          <div className="scale-hover-text" style={{top:mouseY+15}}>{mouseY}</div>
          {
            scalePosition.y.map((item:number)=><div className="sign-line" key={item} style={{top:item-1}}/>)
          }
        </div>
      </div>
      <div className="view-container">
        {children}
      </div>
    </div>

  </div>
}

export default GraduatedScale
