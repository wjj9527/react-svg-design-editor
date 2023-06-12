export type StateType = any
const state:StateType = {
  schema:{
    type:'root',
    id:0,
    itemNodes:[
      {
        id:1,
        width:100,
        height:100,
        x:100,
        y:100,
      }
    ]
  },
  //当前选中节点信息(resize drag)
  currentAction:{},
  //画布偏移量
  svgOffset:{
    x:0,
    y:0
  },
  //画布长宽信息
  svgStyle:{
    height:0,
    width:0
  },
  //基线坐标列表
  scalePosition:{
    x:[],
    y:[]
  },
  scaleHoverLine:{
    x:0,
    y:0,
    xShow:false,
    yShow:false,
  }

}
export default state
