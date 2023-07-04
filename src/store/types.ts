const SET_CURRENT_ACTION = 'SET_CURRENT_ACTION';
const SET_NODE_RESIZE_MOVE_ATTRIBUTE = 'SET_NODE_RESIZE_MOVE_ATTRIBUTE';
const SET_SVG_OFFSET = 'SET_SVG_OFFSET';
const SET_SCALE_POSITION = 'SET_SCALE_POSITION';
const SET_SVG_CANVAS_STYLE = 'SET_SVG_CANVAS_STYLE';
const SET_SCALE_HOVER_LINE = 'SET_SCALE_HOVER_LINE';
const SET_SCALE_VISIBLE = 'SET_SCALE_VISIBLE';
const SET_PAGE_SELECTION_VISIBLE = 'SET_PAGE_SELECTION_VISIBLE';
const SET_NODE_SELECTION_VISIBLE = 'SET_NODE_SELECTION_VISIBLE';
const SET_LEFT_DRAWER_VISIBLE = 'SET_LEFT_DRAWER_VISIBLE';
//设置划块内元素成组
const SET_BLOCK_ELEMENT_GROUP = 'SET_BLOCK_ELEMENT_GROUP';
//设置跟随菜单
const SET_FOLLOW_MENU_CONFIG = 'SET_FOLLOW_MENU_CONFIG';
//解除成组(默认)
const RELIEVE_DEFAULT_BLOCK_ELEMENT_GROUP =
  'RELIEVE_DEFAULT_BLOCK_ELEMENT_GROUP';
//更具id设置节点信息
const SET_ELEMENT_NODE_DATA_BY_ID = 'SET_ELEMENT_NODE_DATA_BY_ID';
//设置右侧配置抽屉
const SET_RIGHT_DRAWER_VISIBLE = 'SET_RIGHT_DRAWER_VISIBLE';
//创建新节点(拖入)
const CREATE_NEW_NODE_TO_SCHEMA = 'CREATE_NEW_NODE_TO_SCHEMA';
//设置当前选中ID
const SET_ACTIVE_KEY = 'SET_ACTIVE_KEY';
//设置node属性
const SET_ATTRIBUTE_BY_MODULE = 'SET_ATTRIBUTE_BY_MODULE';
//插入新节点至管道
const INSERT_NEW_NODE_TO_PIPE_LINE_GROUP = 'INSERT_NEW_NODE_TO_PIPE_LINE_GROUP';
//键盘按下ctrl状态设置
const SET_IS_KEYDOWN_CTRL_KEY_STATUS = 'SET_IS_KEYDOWN_CTRL_KEY_STATUS';
//停止管道移动
const STOP_PIPE_LINE_MOVE = 'STOP_PIPE_LINE_MOVE';
//设置复制缓存
const SET_COPY_NODE_CACHE = 'SET_COPY_NODE_CACHE';
//节点粘贴操作
const INSET_NODE_TO_TREE = 'INSET_NODE_TO_TREE';
//停止管道粘贴
const STOP_PIPE_LINE_PASTE = 'STOP_PIPE_LINE_PASTE';
//删除节点操作
const DELETE_NODE_BY_ID = 'DELETE_NODE_BY_ID';
//设置成组
const SET_GROUP_BLOCK = 'SET_GROUP_BLOCK';
//上移，下移，置顶，置底
const ELEMENT_INDEX_CHANGE = 'ELEMENT_INDEX_CHANGE';
//组内元素align设置
const SET_GROUP_NODES_ALIGN = 'SET_GROUP_NODES_ALIGN';
export default {
  SET_CURRENT_ACTION,
  SET_NODE_RESIZE_MOVE_ATTRIBUTE,
  SET_SVG_OFFSET,
  SET_SCALE_POSITION,
  SET_SVG_CANVAS_STYLE,
  SET_SCALE_HOVER_LINE,
  SET_SCALE_VISIBLE,
  SET_PAGE_SELECTION_VISIBLE,
  SET_NODE_SELECTION_VISIBLE,
  SET_LEFT_DRAWER_VISIBLE,
  SET_BLOCK_ELEMENT_GROUP,
  SET_FOLLOW_MENU_CONFIG,
  RELIEVE_DEFAULT_BLOCK_ELEMENT_GROUP,
  SET_ELEMENT_NODE_DATA_BY_ID,
  SET_RIGHT_DRAWER_VISIBLE,
  CREATE_NEW_NODE_TO_SCHEMA,
  SET_ACTIVE_KEY,
  SET_ATTRIBUTE_BY_MODULE,
  INSERT_NEW_NODE_TO_PIPE_LINE_GROUP,
  SET_IS_KEYDOWN_CTRL_KEY_STATUS,
  STOP_PIPE_LINE_MOVE,
  SET_COPY_NODE_CACHE,
  INSET_NODE_TO_TREE,
  STOP_PIPE_LINE_PASTE,
  DELETE_NODE_BY_ID,
  SET_GROUP_BLOCK,
  ELEMENT_INDEX_CHANGE,
  SET_GROUP_NODES_ALIGN,
};
