import React, {createContext, useReducer} from "react";
import stateSource from './state'
import types from './types'
import actions from './actions';
// console.log('actions',actions)
export const TYPES = types
//创建一个context
export const StoreContext = createContext<any>({});
//以下为为了区分事件所创立的typesKey
const reducer = (state:any, action:any) => {
  //在reducer中需要对事件进行判断来达到不同的state更新
  const {type} = action
  actions[type](state,action)
  return {...state}
}
export const Store = (props: any) => {
  //使用useReducer来创建需要向下传值的state与改变state的dispatch方法
  const [state, dispatch] = useReducer(reducer, stateSource);
  //在这里我们需要把dispatch也传给子组件，使子组件拥有跟新功能
  return (<StoreContext.Provider value={{state, dispatch}}>
      {props.children}
    </StoreContext.Provider>
  )
}
