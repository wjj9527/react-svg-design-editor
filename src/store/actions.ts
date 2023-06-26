import TYPES from './types';
import { StateType } from '@/store/state';
import { MINIMUM_DISPLACEMENT } from '@/global';
import createUUID from '@/utils/UUID';
import { findElementById } from '@/utils/findElementById';
type ValueOf<T> = T[keyof T];
type Types = ValueOf<typeof TYPES>;
type ActionProps = {
  type: Types;
  value: {
    [key: string]: any;
  };
};
type ActionsType = {
  [key: string]: (state: StateType, action: ActionProps) => void;
};
const actions: ActionsType = {
  [TYPES.SET_CURRENT_ACTION]: (state, action) => {
    state.currentAction = action.value.currentAction;
  },
  [TYPES.SET_SVG_OFFSET]: (state, action) => {
    state.svgOffset = action.value;
  },
  //
  [TYPES.SET_NODE_RESIZE_MOVE_ATTRIBUTE]: (state, action) => {
    let { currentAction, schema, svgOffset } = state;
    const { id, target, type, offsetX, offsetY } = currentAction;
    const { event } = action.value;
    const { pageX, pageY } = event;
    let targetNode = null;
    if (id) {
      //获取移动目标
      for (let i = 0; i < schema.itemNodes.length; i++) {
        if (schema.itemNodes[i].type === 'BLOCK_GROUP') {
          const nodes = schema.itemNodes[i].itemNodes;
          for (let index = 0; index < nodes.length; index++) {
            if (nodes[index].id === id) {
              targetNode = nodes[index];
            }
          }
        } else if (schema.itemNodes[i].id === id) {
          targetNode = schema.itemNodes[i];
        }
      }
      let height;
      let width;
      let y;
      let x;
      const setValue = (value: number) => {
        const floatNumber = value % MINIMUM_DISPLACEMENT;
        const intNumber = parseInt(String(value / MINIMUM_DISPLACEMENT));
        const settingValue =
          intNumber +
          (floatNumber > MINIMUM_DISPLACEMENT / 2 ? MINIMUM_DISPLACEMENT : 0);
        return settingValue > 0 ? settingValue : 0;
      };
      if (type === 'RESIZE') {
        switch (target) {
          case 'RIGHT_TOP':
            width = setValue(pageX - targetNode.x - svgOffset.x);
            height = setValue(
              targetNode.height + targetNode.y - pageY + svgOffset.y,
            );
            y = setValue(pageY - svgOffset.y);
            targetNode.width = width;
            targetNode.height = height;
            targetNode.y = y;
            break;
          case 'RIGHT_CENTER':
            width = setValue(pageX - targetNode.x - svgOffset.x);
            targetNode.width = width;
            break;
          case 'RIGHT_BOTTOM':
            width = setValue(pageX - targetNode.x - svgOffset.x);
            height = setValue(pageY - targetNode.y - svgOffset.y);
            targetNode.width = width;
            targetNode.height = height;
            break;
          case 'CENTER_TOP':
            height = setValue(
              targetNode.height + targetNode.y - pageY + svgOffset.y,
            );
            y = setValue(pageY - svgOffset.y);
            targetNode.height = height;
            targetNode.y = y;
            break;
          case 'CENTER_BOTTOM':
            height = setValue(pageY - targetNode.y - svgOffset.y);
            targetNode.height = height;
            break;
          case 'LEFT_TOP':
            height = setValue(
              targetNode.height + targetNode.y - pageY + svgOffset.y,
            );
            width = setValue(
              targetNode.width + targetNode.x - pageX + svgOffset.x,
            );
            x = setValue(pageX - svgOffset.x);
            y = setValue(pageY - svgOffset.y);
            targetNode.height = height;
            targetNode.y = y;
            targetNode.width = width;
            targetNode.x = x;
            break;
          case 'LEFT_CENTER':
            width = setValue(
              targetNode.width + targetNode.x - pageX + svgOffset.x,
            );
            x = setValue(pageX - svgOffset.x);
            targetNode.width = width;
            targetNode.x = x;
            break;
          case 'LEFT_BOTTOM':
            width = setValue(
              targetNode.width + targetNode.x - pageX + svgOffset.x,
            );
            height = setValue(pageY - targetNode.y - svgOffset.y);
            x = setValue(pageX - svgOffset.x);
            targetNode.width = width;
            targetNode.x = x;
            targetNode.height = height;
            break;
        }
      } else if (type === 'MOVE' && target === 'MOVE_CONTENT') {
        x = setValue(pageX - offsetX - svgOffset.x);
        y = setValue(pageY - offsetY - svgOffset.y);
        targetNode.x = x;
        targetNode.y = y;
      } else if (type === 'MOVE' && target === 'GROUP_RECT') {
        const node = schema.itemNodes.find(
          (item: any) => item.id === id,
        ).itemNodes;
        const { itemOffsetArray } = currentAction;
        //根据偏移量计算实际需要偏差值
        for (let i = 0; i < node.length; i++) {
          for (let j = 0; j < itemOffsetArray.length; j++) {
            if (itemOffsetArray[j].id === node[i].id) {
              const { x, y } = itemOffsetArray[j];
              node[i].x = setValue(pageX - svgOffset.x + x);
              node[i].y = setValue(pageY - svgOffset.y + y);
              break;
            }
          }
        }
      }
      state.schema = JSON.parse(JSON.stringify(state.schema));
    }
  },
  [TYPES.SET_SCALE_POSITION]: (state, action) => {
    const { scalePosition } = state;
    const { scale, position } = action.value;
    if (scalePosition[scale].includes(position)) {
      const index = scalePosition[scale].findIndex(
        (item: number) => item === position,
      );
      scalePosition[scale].splice(index, 1);
    } else {
      scalePosition[scale].push(position);
    }
  },
  [TYPES.SET_SVG_CANVAS_STYLE]: (state, action) => {
    state.svgStyle = action.value;
  },
  [TYPES.SET_SCALE_HOVER_LINE]: (state, action) => {
    //@ts-ignore
    const lineGroup = { ...action.scaleHoverLine };
    Object.assign(lineGroup, action.value);
    state.scaleHoverLine = lineGroup;
  },
  [TYPES.SET_SCALE_VISIBLE]: (state) => {
    state.scaleVisible = !state.scaleVisible;
  },
  [TYPES.SET_PAGE_SELECTION_VISIBLE]: (state) => {
    state.pageSelectionVisible = !state.pageSelectionVisible;
  },
  [TYPES.SET_NODE_SELECTION_VISIBLE]: (state) => {
    state.nodeSelectionVisible = !state.nodeSelectionVisible;
  },
  [TYPES.SET_LEFT_DRAWER_VISIBLE]: (state) => {
    state.leftDrawerVisible = !state.leftDrawerVisible;
  },
  [TYPES.SET_BLOCK_ELEMENT_GROUP]: (state, action) => {
    const { schema } = state;
    const { x, y, height, width } = action.value;
    const rectMinX = x;
    const rectMaxX = x + width;
    const rectMinY = y;
    const rectMaxY = y + height;
    const passNodes = schema.itemNodes.filter((item: any) => {
      const { width, height, y, x } = item;
      return (
        ((x > rectMinX && x < rectMaxX) ||
          (x + width > rectMinX && x + width < rectMaxX)) &&
        ((y > rectMinY && y < rectMaxY) ||
          (y + height > rectMinY && y + height < rectMaxY))
      );
    });
    if (passNodes.length > 1) {
      const blockGroup = {
        id: createUUID(),
        type: 'BLOCK_GROUP',
        isGroup: false,
        itemNodes: passNodes,
      };
      for (let i = 0; i < passNodes.length; i++) {
        const deleteIndex = schema.itemNodes.findIndex(
          (item: any) => passNodes[i].id === item.id,
        );
        schema.itemNodes.splice(deleteIndex, 1);
      }
      schema.itemNodes.push(blockGroup);
    }
  },
  [TYPES.SET_FOLLOW_MENU_CONFIG]: (state, action) => {
    state.followMenuConfig = { ...action.value };
  },
  [TYPES.RELIEVE_DEFAULT_BLOCK_ELEMENT_GROUP]: (state) => {
    const { schema } = state;
    let itemNodes = [...schema.itemNodes];
    const blockArray = itemNodes.filter(
      (item: any) => item.type === 'BLOCK_GROUP' && !item.isGroup,
    );
    const nodesFlatArray = blockArray
      .map((item: any) => item.itemNodes)
      .flat(Infinity);
    const deleteIDArray = blockArray.map((item: any) => item.id);
    for (let i = 0; i < deleteIDArray.length; i++) {
      const deleteIndex = itemNodes.findIndex(
        (item: any) => item.id === deleteIDArray[i],
      );
      itemNodes.splice(deleteIndex, 1);
    }
    itemNodes = [...itemNodes, ...nodesFlatArray];
    schema.itemNodes = itemNodes;
  },
  //更具id设置节点信息
  [TYPES.SET_ELEMENT_NODE_DATA_BY_ID]: (state, action) => {
    const { id, data } = action.value;
    const { element } = findElementById(id, state.schema);
    Object.assign(element, data);
  },
  [TYPES.SET_RIGHT_DRAWER_VISIBLE]: (state) => {
    state.rightDrawerVisible = !state.rightDrawerVisible;
  },
  [TYPES.CREATE_NEW_NODE_TO_SCHEMA]: (state, action) => {
    const value = { ...action.value };
    const id = value.id || createUUID();
    Object.assign(value, { id });
    state.schema.itemNodes.push(value);
    //新增element设置为active
    state.activeKey = id;
  },
  [TYPES.SET_ACTIVE_KEY]: (state, action) => {
    state.activeKey = action.value.id;
  },
  [TYPES.SET_ATTRIBUTE_BY_MODULE]: (state, action) => {
    const { schema, activeKey } = state;
    const { module, data } = action.value;
    const { element } = findElementById(activeKey, schema);
    if (module) {
      Object.assign(element.data[module], data);
    } else {
      Object.assign(element, data);
    }
  },
  [TYPES.INSERT_NEW_NODE_TO_PIPE_LINE_GROUP]: (state, action) => {
    const { schema } = state;
    const { id, startId, node } = action.value;
    const { element } = findElementById(id, schema);
    const { path } = element;
    const insertIndex = path.findIndex((item: any) => item.dotId === startId);
    path.splice(insertIndex, 0, node);
  },
};
export default actions;
