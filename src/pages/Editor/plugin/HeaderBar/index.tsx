import React, {useContext} from "react";
import './style.less'
import {StoreContext,TYPES} from "@/store";
import IconBtn from "@/pages/Editor/components/IconBtn";
import {Button} from 'antd'
const HeaderBar:React.FC = ()=>{
  const {state,dispatch} = useContext(StoreContext)

  return <div className="header-bar">
    <div className="left-content">
      33
    </div>
    <div className="btn-group-container">
      <div className="btn-group">
        <IconBtn iconText="icon-iconfontchexiao1" disabled text="撤销 [CTRL+Z]"/>
        <IconBtn iconText="icon-iconfontchexiao" text="恢复 [CTRL+Y]"/>
      </div>
      <div className="btn-group">
        <IconBtn iconText="icon-fuzhi" text="复制"/>
        <IconBtn iconText="icon-niantie" text="粘贴"/>
        <IconBtn iconText="icon-shanchu" text="删除"/>
      </div>
      <div className="btn-group">
        <IconBtn iconText="icon-zhiding" text="置顶"/>
        <IconBtn iconText="icon-zhidi" text="置底"/>
      </div>
      <div className="btn-group">
        <IconBtn iconText="icon-shangyiyiceng" text="上移一层"/>
        <IconBtn iconText="icon-xiayiyiceng" text="下移一层"/>
      </div>
      <div className="btn-group">
        <IconBtn iconText="icon-bianzu" text="编组"/>
        <IconBtn iconText="icon-jiezu" text="取消编组"/>
      </div>
      <div className="btn-group">
        <IconBtn iconText="icon-zuoduiqi" text="左对齐"/>
        <IconBtn iconText="icon-chuizhijuzhongduiqi" text="垂直居中"/>
        <IconBtn iconText="icon-youduiqi" text="右对齐"/>
      </div>
      <div className="btn-group">
        <IconBtn iconText="icon-shangduiqi" text="上对齐"/>
        <IconBtn iconText="icon-shuipingjuzhongduiqi" text="水平对齐"/>
        <IconBtn iconText="icon-xiaduiqi" text="下对齐"/>
      </div>
      <div className="btn-group">
        <IconBtn iconText="icon-chuizhijunfen" text="水平对齐"/>
        <IconBtn iconText="icon-shuipingjunfen" text="居中对齐"/>
      </div>
    </div>
    <div className="right-content">
      <Button size="small" type="primary" onClick={dispatch.bind(this,{type:TYPES.SET_RIGHT_DRAWER_VISIBLE})}>
        <span className="btn-text">配置</span>
      </Button>
    </div>
  </div>
}
export default HeaderBar
