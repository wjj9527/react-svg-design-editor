export type StateType = any;
const state: StateType = {
  schema: {
    type: 'root',
    id: '0',
    scale: 50,
    itemNodes: [],
  },
  //当前选中节点信息(resize drag)
  currentAction: {},
  //当前选中ID
  activeKey: '0',
  //画布偏移量
  svgOffset: {
    x: 0,
    y: 0,
  },
  //画布长宽信息
  svgStyle: {
    height: 0,
    width: 0,
  },
  //基线坐标列表
  scalePosition: {
    x: [],
    y: [],
  },
  scaleHoverLine: {
    x: 0,
    y: 0,
    xShow: false,
    yShow: false,
  },
  //是否显示基线
  scaleVisible: true,
  //是否显示页面选择器
  pageSelectionVisible: false,
  //是否显示图层选择器
  nodeSelectionVisible: true,
  //是否显示左侧抽屉
  leftDrawerVisible: true,
  //跟随弹窗信息
  followMenuConfig: {
    x: 0,
    y: 0,
    visible: false,
  },
  //是否显示右侧配置弹窗
  rightDrawerVisible: true,
  //判断当前是否ctrl按下（全局）
  isKeydownCtrlKey: false,
  //当前是否管道移动
  isPipeLineMove: false,
  copyNodeCache: {},
  isPipeLineNodePaste: false,
  isPipeLineVisible: false,
  isPipeLineLock: false,
  canvasMoveStatus: false,
};
export default state;
