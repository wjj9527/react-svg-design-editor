import React, {useContext} from "react";
import './style.less'
import {StoreContext} from "@/store";
const RightDrawer:React.FC = ()=>{
  const {state} = useContext(StoreContext)
  const {rightDrawerVisible} = state
  return rightDrawerVisible?(
    <div className="right-drawer">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquid atque commodi consequatur cumque ducimus ea illo iure modi mollitia nam obcaecati quia quod saepe, ullam unde, veritatis voluptatem! Aspernatur.
    </div>
  ):<></>
}

export default RightDrawer
