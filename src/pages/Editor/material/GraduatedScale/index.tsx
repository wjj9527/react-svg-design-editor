import React, {useEffect, useRef, useState} from "react";
import './style.less'
interface ScaleProps {
  index:number
}
const ScaleX:React.FC<ScaleProps> = ({index})=>{
  return <div className="scale-x">
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
  const scaleSizeSetting = ()=>{
    const scaleX = scaleXBarRef.current
    const scaleY = scaleYBarRef.current
    if (scaleX) {
      const {clientWidth} = scaleX
      const size = parseInt(String(clientWidth / 50 + 1))
      // @ts-ignore
      setScaleXSize([...Array(size).keys()])
    }
    if (scaleY) {
      const {clientHeight} = scaleY
      console.dir(scaleY)
      const size = parseInt(String(clientHeight / 50 + 1))
      // @ts-ignore
      setScaleYSize([...Array(size).keys()])
    }
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
      <div className="horizontal-scale" ref={scaleXBarRef}>
        {
          scaleXSize.map((_,index)=><ScaleX key={_} index={_}/>)
        }
      </div>
    </div>
    <div className="vertical">
      <div className="vertical-scale" ref={scaleYBarRef}>
        {
          scaleYSize.map((_,index)=><ScaleY key={_} index={_}/>)
        }
      </div>
      <div className="view-container">
        {children}
      </div>
    </div>

  </div>
}

export default GraduatedScale
