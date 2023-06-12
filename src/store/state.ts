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
  currentAction:{},
  svgOffset:{
    x:0,
    y:0
  },
  //基线坐标列表
  scalePosition:{
    x:[],
    y:[]
  }
}
export default state
