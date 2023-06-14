import React, {useContext} from "react";
import './style.less'
import ElementSelection from "@/pages/Editor/plugin/LeftDrawer/ElementSelection";
import NodeSelection from "@/pages/Editor/plugin/LeftDrawer/NodeSelection";
import PageSelection from "@/pages/Editor/plugin/LeftDrawer/PageSelection";
import {StoreContext} from "@/store";
import classNames from "classnames";
const LeftDrawer:React.FC=()=>{
  const {state,} = useContext(StoreContext)
  const {pageSelectionVisible,nodeSelectionVisible,} = state
  const className = classNames('left-drawer',{
    width480:pageSelectionVisible||nodeSelectionVisible
  })
  return <div className={className}>
    <ElementSelection/>
    {
      (pageSelectionVisible||nodeSelectionVisible)&&(
        <div className="right-content">
          {
            pageSelectionVisible&&<PageSelection/>
          }
          {
            nodeSelectionVisible&&<NodeSelection/>
          }
        </div>
      )
    }
  </div>
}

export default LeftDrawer
