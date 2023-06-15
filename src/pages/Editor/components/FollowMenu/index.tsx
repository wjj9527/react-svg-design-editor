import React, {useContext} from "react";
import './style.less'
import {StoreContext} from "@/store";

const FollowMenu:React.FC =()=>{
  const {state} = useContext(StoreContext)
  const {visible,x,y} = state.followMenuConfig
  return visible ?(<div className="follow-menu" style={{left:x,top:y,}}>
    <div className="group">
      <div className="menu-group-item">置顶</div>
      <div className="menu-group-item">置底</div>
      <div className="menu-group-item">上移一层</div>
      <div className="menu-group-item">下移一层</div>
    </div>
    <div className="group">
      <div className="menu-group-item">锁定</div>
      <div className="menu-group-item">拷贝</div>
      <div className="menu-group-item">删除</div>
      <div className="menu-group-item">成组</div>
      <div className="menu-group-item">取消成组</div>
    </div>
  </div>):<></>
}

export default FollowMenu
