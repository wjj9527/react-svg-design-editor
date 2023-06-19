import React, {useContext, useEffect, useState} from "react";
import './style.less'
import {StoreContext} from "@/store";
import {findElementById} from "@/utils/findElementById";
import SettingWrapper from '@/pages/Editor/components/SettingWrapper'
import {elementSetting} from "@/pages/Editor/material";

const RightDrawer:React.FC = ()=>{
  const {state} = useContext(StoreContext)
  const {rightDrawerVisible,schema,activeKey} = state
  const [elementType,setElementType] = useState('')
  const getActiveElementSource = ()=>{
    const {element} = findElementById(activeKey,schema)
    const {type} = element
    setElementType(type)
  }
  useEffect(()=>{
    getActiveElementSource()
  },[schema,activeKey])
  const renderElement = (<div className="right-drawer">
    {/*<SettingWrapper/>*/}
    {/*@ts-ignore*/}
    {elementSetting[elementType]}
  </div>)
  return rightDrawerVisible?renderElement:<></>
}

export default RightDrawer
