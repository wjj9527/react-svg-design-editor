import React, {useContext} from "react";
import {Checkbox} from 'antd'
import './style.less'
import {StoreContext, TYPES} from "@/store";
const BottomBar:React.FC = ()=>{
  const {state,dispatch} = useContext(StoreContext)
  const {pageSelectionVisible,nodeSelectionVisible} = state

  return <div className="bottom-bar">
    <div className="check-group">
      <Checkbox checked={pageSelectionVisible} onChange={dispatch.bind(this,{type:TYPES.SET_PAGE_SELECTION_VISIBLE})}>
        <span className="check-text">页面</span>
      </Checkbox>
      <Checkbox checked={nodeSelectionVisible} onChange={dispatch.bind(this,{type:TYPES.SET_NODE_SELECTION_VISIBLE})}>
        <span className="check-text">图层</span>
      </Checkbox>
    </div>
  </div>
}
export default BottomBar
