import types from './types'
import {StateType} from "@/store/state";

type ValueOf<T> = T[keyof T];
type Types = ValueOf<typeof types>
type ActionProps = {
  type: Types,
  value: {
    [key: string]: any
  }
}
type ActionsType = {
  [key: string]: (state: StateType, action: ActionProps) => void
}
const actions: ActionsType = {
  [types.SET_CURRENT_ACTION]: (state, action) => {
    state.currentAction = action.value.currentAction
  },
  [types.SET_SVG_OFFSET]:(state, action)=>{
    state.svgOffset = action.value
  },
  //
  [types.SET_NODE_ATTRIBUTE]: (state, action) => {
    let {currentAction, schema,svgOffset} = state
    const {id, target, type,offsetX,offsetY} = currentAction
    const {event} = action.value
    const {pageX, pageY} = event
    let targetNode = null
    if (id) {
      //获取移动目标
      for (let i = 0; i < schema.itemNodes.length; i++) {
        if (schema.itemNodes[i].id === id) {
          targetNode = schema.itemNodes[i]
        }
      }
      let height
      let width
      if (type === 'RESIZE') {
        switch (target) {
          case 'RIGHT_TOP':
            width = pageX - targetNode.x - svgOffset.x
            height = targetNode.height + targetNode.y - pageY + svgOffset.y
            targetNode.width = width>0?width:0
            targetNode.height = height>0?height:0
            targetNode.y = pageY - svgOffset.y
            break;
          case 'RIGHT_CENTER':
            width = pageX - targetNode.x - svgOffset.x
            targetNode.width = width>0?width:0
            break;
          case 'RIGHT_BOTTOM':
            width = pageX - targetNode.x - svgOffset.x
            height = pageY - targetNode.y - svgOffset.y
            targetNode.width = width>0?width:0
            targetNode.height = height>0?height:0
            break;
          case 'CENTER_TOP':
            height = targetNode.height + targetNode.y - pageY + svgOffset.y
            targetNode.height = height>0?height:0
            targetNode.y = pageY - svgOffset.y
            break;
          case 'CENTER_BOTTOM':
            height = pageY - targetNode.y - svgOffset.y
            targetNode.height = height>0?height:0
            break;
          case 'LEFT_TOP':
            height = targetNode.height + targetNode.y - pageY + svgOffset.y
            width = targetNode.width + targetNode.x - pageX + svgOffset.x
            targetNode.height = height>0?height:0
            targetNode.y = pageY - svgOffset.y
            targetNode.width = width>0?width:0
            targetNode.x = pageX - svgOffset.x
            break;
          case 'LEFT_CENTER':
            width = targetNode.width + targetNode.x - pageX + svgOffset.x
            targetNode.width = width>0?width:0
            targetNode.x = pageX - svgOffset.x
            break;
          case 'LEFT_BOTTOM':
            width = targetNode.width + targetNode.x - pageX + svgOffset.x
            height = pageY - targetNode.y -svgOffset.y
            targetNode.width = width>0?width:0
            targetNode.x = pageX - svgOffset.x
            targetNode.height = height>0?height:0
            break;
        }
      }else if(type === 'MOVE'){
        targetNode.x = pageX-offsetX - svgOffset.x
        targetNode.y = pageY-offsetY - svgOffset.y
      }
    }
  }

}
export default actions
