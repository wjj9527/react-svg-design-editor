import React, {useContext, useEffect} from "react";
import './style.less'
import {StoreContext} from "@/store";
import {findElementById} from "@/utils/findElementById";
import SettingWrapper from '@/pages/Editor/components/SettingWrapper'
const RightDrawer:React.FC = ()=>{
  const {state} = useContext(StoreContext)
  const {rightDrawerVisible,schema,activeKey} = state
  const getActiveElementSource = ()=>{
    const {element} = findElementById(activeKey,schema)
    console.log(element)
  }
  useEffect(()=>{
    getActiveElementSource()
  },[schema,activeKey])
  const renderElement = (<div className="right-drawer">
    <SettingWrapper/>
  </div>)
  return rightDrawerVisible?renderElement:<></>
}

export default RightDrawer
