import TYPES from './types'
import {StateType} from "@/store/state";
import {MINIMUM_DISPLACEMENT} from '@/global'
type ValueOf<T> = T[keyof T];
type Types = ValueOf<typeof TYPES>
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
  [TYPES.SET_CURRENT_ACTION]: (state, action) => {
    state.currentAction = action.value.currentAction
  },
  [TYPES.SET_SVG_OFFSET]:(state, action)=>{
    state.svgOffset = action.value
  },
  //
  [TYPES.SET_NODE_RESIZE_MOVE_ATTRIBUTE]: (state, action) => {
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
      let y
      let x
      const setValue = (value:number)=>{
        const floatNumber = value%MINIMUM_DISPLACEMENT
        const intNumber = parseInt(String(value / MINIMUM_DISPLACEMENT))
        const settingValue = intNumber+((floatNumber>MINIMUM_DISPLACEMENT/2)?MINIMUM_DISPLACEMENT:0)
        return settingValue>0?settingValue:0
      }
      if (type === 'RESIZE') {
        switch (target) {
          case 'RIGHT_TOP':
            width = setValue(pageX - targetNode.x - svgOffset.x)
            height = setValue(targetNode.height + targetNode.y - pageY + svgOffset.y)
            y = setValue(pageY - svgOffset.y)
            targetNode.width = width
            targetNode.height = height
            targetNode.y = y
            break;
          case 'RIGHT_CENTER':
            width = setValue(pageX - targetNode.x - svgOffset.x)
            targetNode.width = width
            break;
          case 'RIGHT_BOTTOM':
            width = setValue(pageX - targetNode.x - svgOffset.x)
            height = setValue(pageY - targetNode.y - svgOffset.y)
            targetNode.width = width
            targetNode.height = height
            break;
          case 'CENTER_TOP':
            height = setValue(targetNode.height + targetNode.y - pageY + svgOffset.y)
            y = setValue(pageY - svgOffset.y)
            targetNode.height = height
            targetNode.y = y
            break;
          case 'CENTER_BOTTOM':
            height = setValue(pageY - targetNode.y - svgOffset.y)
            targetNode.height = height
            break;
          case 'LEFT_TOP':
            height = setValue(targetNode.height + targetNode.y - pageY + svgOffset.y)
            width = setValue(targetNode.width + targetNode.x - pageX + svgOffset.x)
            x = setValue(pageX - svgOffset.x)
            y = setValue(pageY - svgOffset.y)
            targetNode.height = height
            targetNode.y = y
            targetNode.width = width
            targetNode.x = x
            break;
          case 'LEFT_CENTER':
            width = setValue(targetNode.width + targetNode.x - pageX + svgOffset.x)
            x = setValue(pageX - svgOffset.x)
            targetNode.width = width
            targetNode.x = x
            break;
          case 'LEFT_BOTTOM':
            width = setValue(targetNode.width + targetNode.x - pageX + svgOffset.x)
            height = setValue(pageY - targetNode.y -svgOffset.y)
            x = setValue(pageX - svgOffset.x)
            targetNode.width = width
            targetNode.x = x
            targetNode.height = height
            break;
        }
      }else if(type === 'MOVE'){
        x = setValue(pageX-offsetX - svgOffset.x)
        y = setValue(pageY-offsetY - svgOffset.y)
        targetNode.x = x
        targetNode.y = y
      }
      state.schema = {...state.schema}
    }
  },
  [TYPES.SET_SCALE_POSITION]:(state,action)=> {
    const {scalePosition} = state
    const {scale,position} = action.value
    if (scalePosition[scale].includes(position)) {
      const index = scalePosition[scale].findIndex((item:number)=>item===position)
      scalePosition[scale].splice(index,1)
    }else{
      scalePosition[scale].push(position)
    }
  },
  [TYPES.SET_SVG_CANVAS_STYLE]:(state,action)=>{
    state.svgStyle = action.value
  },
  [TYPES.SET_SCALE_HOVER_LINE]:(state,action)=>{
    //@ts-ignore
    const lineGroup = {...action.scaleHoverLine}
    Object.assign(lineGroup,action.value)
    state.scaleHoverLine = lineGroup
  },
  [TYPES.SET_SCALE_VISIBLE]:(state,)=>{
    state.scaleVisible = !state.scaleVisible
  },
  [TYPES.SET_PAGE_SELECTION_VISIBLE]:(state,)=>{
    state.pageSelectionVisible = !state.pageSelectionVisible
  },
  [TYPES.SET_NODE_SELECTION_VISIBLE]:(state,)=>{
    state.nodeSelectionVisible = !state.nodeSelectionVisible
  },
  [TYPES.SET_LEFT_DRAWER_VISIBLE]:(state)=>{
    state.leftDrawerVisible = !state.leftDrawerVisible
  }
}
export default actions
