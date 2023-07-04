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
      let height, width, y, x;
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
        // console.log(svgOffset)
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
      } else if (type === 'MOVE' && target === 'SIGN_MASK_DOT') {
        const { offsetX, offsetY } = currentAction;
        const { path } = targetNode;
        const node = path.find(
          (item: any) => item.dotId === currentAction.dotId,
        );
        node.x = pageX - svgOffset.x - offsetX;
        node.y = pageY - svgOffset.y - offsetY;
      } else if (type === 'MOVE' && target === 'PIPE_LINE') {
        const { baseX, baseY, cachePath } = currentAction;
        const offsetX = pageX - baseX - svgOffset.x;
        const offsetY = pageY - baseY - svgOffset.y;
        let path = JSON.parse(JSON.stringify(cachePath));
        path = path.map((item: any) => {
          item.x = item.x + offsetX;
          item.y = item.y + offsetY;
          return item;
        });
        targetNode.path = path;
        state.isPipeLineMove = true;
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
    //过滤当前区域，组与管道不入组
    const passNodes = schema.itemNodes.filter((item: any) => {
      const { width, height, y, x } = item;
      return (
        ((x > rectMinX && x < rectMaxX) ||
          (x + width > rectMinX && x + width < rectMaxX)) &&
        ((y > rectMinY && y < rectMaxY) ||
          (y + height > rectMinY && y + height < rectMaxY)) &&
        item.type !== 'BLOCK_GROUP' &&
        item.type !== 'PipeLine' &&
        item.visible &&
        !item.lock
      );
    });
    if (passNodes.length > 1) {
      const blockGroup = {
        id: createUUID(),
        type: 'BLOCK_GROUP',
        label: '组合',
        isGroup: false,
        itemNodes: passNodes,
        visible: true,
        lock: false,
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
    const insertIndex =
      path.findIndex((item: any) => item.dotId === startId) + 1;
    path.splice(insertIndex, 0, node);
  },
  [TYPES.SET_IS_KEYDOWN_CTRL_KEY_STATUS]: (state, action) => {
    state.isKeydownCtrlKey = action.value.status;
  },
  [TYPES.STOP_PIPE_LINE_MOVE]: (state) => {
    state.isPipeLineMove = false;
  },
  [TYPES.SET_COPY_NODE_CACHE]: (state, action) => {
    const { schema } = state;
    const { id } = action.value;
    const { element } = findElementById(id, schema);
    const cacheNode = JSON.parse(JSON.stringify(element));
    cacheNode.id = createUUID();
    if (cacheNode.itemNodes) {
      cacheNode.itemNodes = cacheNode.itemNodes.map((item: any) => {
        const id = createUUID();
        Object.assign(item, { id });
        return item;
      });
    }
    if (cacheNode.path) {
      cacheNode.path = cacheNode.path.map((item: any) => {
        const groupId = cacheNode.id;
        const dotId = createUUID();
        Object.assign(item, { groupId, dotId });
        return item;
      });
    }
    state.copyNodeCache = cacheNode;
  },
  [TYPES.STOP_PIPE_LINE_PASTE]: (state) => {
    state.isPipeLineNodePaste = false;
  },
  //粘贴节点操作
  [TYPES.INSET_NODE_TO_TREE]: (state, action) => {
    const { x, y } = action.value || {};
    const { schema, copyNodeCache } = state;
    //没有复制缓存则不能进行复制
    if (!Object.keys(copyNodeCache).length) {
      return;
    }
    const refreshCacheNode = () => {
      const cacheNode = JSON.parse(JSON.stringify(copyNodeCache));
      cacheNode.id = createUUID();
      if (cacheNode.itemNodes) {
        cacheNode.itemNodes = cacheNode.itemNodes.map((item: any) => {
          const id = createUUID();
          Object.assign(item, { id });
          return item;
        });
      }
      if (cacheNode.path) {
        cacheNode.path = cacheNode.path.map((item: any) => {
          const groupId = cacheNode.id;
          const dotId = createUUID();
          Object.assign(item, { groupId, dotId });
          return item;
        });
      }
      state.copyNodeCache = cacheNode;
    };
    const isExistXY = !!x && !!y;
    console.log(isExistXY);
    if (copyNodeCache.type === 'BLOCK_GROUP') {
      const offsetX = copyNodeCache.x - x;
      const offsetY = copyNodeCache.y - y;
      copyNodeCache.itemNodes = copyNodeCache.itemNodes.map((item: any) => {
        let { x, y } = item;
        x = isExistXY ? x - offsetX : x + 20;
        y = isExistXY ? y - offsetY : y + 20;
        Object.assign(item, { x, y });
        return item;
      });
    }
    if (copyNodeCache.type === 'PipeLine') {
      //管道粘贴
      const offsetX = copyNodeCache.x - x;
      const offsetY = copyNodeCache.y - y;
      copyNodeCache.path = copyNodeCache.path.map((item: any) => {
        const groupId = copyNodeCache.id;
        const dotId = createUUID();
        let { x, y } = item;
        x = isExistXY ? x - offsetX : x + 20;
        y = isExistXY ? y - offsetY : y + 20;
        Object.assign(item, { groupId, dotId, x, y });
        return item;
      });
      state.isPipeLineNodePaste = true;
      state.activeKey = copyNodeCache.id;
    }
    copyNodeCache.x = isExistXY ? x : copyNodeCache.x + 20;
    copyNodeCache.y = isExistXY ? y : copyNodeCache.y + 20;
    schema.itemNodes.push({ ...copyNodeCache });
    state.activeKey = copyNodeCache.id;
    refreshCacheNode();
  },
  //删除节点
  [TYPES.DELETE_NODE_BY_ID]: (state) => {
    const { schema, activeKey } = state;
    if (activeKey === '0') {
      return;
    }
    const { parent } = findElementById(activeKey, schema);
    const deleteIndex = parent.itemNodes.findIndex(
      (item: any) => item.id === activeKey,
    );
    if (deleteIndex !== -1) {
      state.activeKey = '0';
      state.isPipeLineNodePaste = true;
      parent.itemNodes.splice(deleteIndex, 1);
    }
  },
  [TYPES.SET_GROUP_BLOCK]: (state, action) => {
    const { schema } = state;
    const { id } = action.value;
    const { element } = findElementById(id, schema);
    const { isGroup } = element;
    element.isGroup = !isGroup;
  },
  [TYPES.ELEMENT_INDEX_CHANGE]: (state, action) => {
    const { schema, activeKey } = state;
    const { parent } = findElementById(activeKey, schema);
    const { actionType } = action.value;
    const { itemNodes } = parent;
    const targetIndex = itemNodes.findIndex(
      (item: any) => item.id === activeKey,
    );
    switch (actionType) {
      case 'moveUp':
        if (targetIndex !== itemNodes.index) {
          [itemNodes[targetIndex], itemNodes[targetIndex + 1]] = [
            itemNodes[targetIndex + 1],
            itemNodes[targetIndex],
          ];
        }
        break;
      case 'moveDown':
        if (targetIndex !== 0) {
          [itemNodes[targetIndex], itemNodes[targetIndex - 1]] = [
            itemNodes[targetIndex - 1],
            itemNodes[targetIndex],
          ];
        }
        break;
      case 'top':
        if (targetIndex !== itemNodes.index) {
          const id = createUUID();
          const insertNode = { ...itemNodes[targetIndex], id };
          state.activeKey = id;
          itemNodes.push(insertNode);
          itemNodes.splice(targetIndex, 1);
        }
        break;
      case 'bottom':
        if (targetIndex !== 0) {
          const id = createUUID();
          const insertNode = { ...itemNodes[targetIndex], id };
          state.activeKey = id;
          itemNodes.unshift(insertNode);
          itemNodes.splice(targetIndex + 1, 1);
        }
    }
  },
  [TYPES.SET_GROUP_NODES_ALIGN]: (state, action) => {
    const { schema, activeKey } = state;
    const { type } = action.value;
    const { element } = findElementById(activeKey, schema);
    const { itemNodes } = element;
    let [
      baseTop,
      baseBottom,
      baseLeft,
      baseRight,
      baseHorizontally,
      baseVertical,
      xSpace,
      ySpace,
      xBlockAll,
      yBlockAll,
    ] = [null, null, null, null, null, null, null, null, 0, 0];
    itemNodes.forEach((item: any) => {
      const { x, y, height, width } = item;
      if (baseTop === null || y < baseTop) {
        baseTop = y;
      }
      if (baseLeft === null || x < baseLeft) {
        baseLeft = x;
      }
      if (baseRight === null || x + width > baseRight) {
        baseRight = x + width;
      }
      if (baseBottom === null || y + height > baseBottom) {
        baseBottom = y + height;
      }
      xBlockAll += width;
      yBlockAll += height;
    });

    //@ts-ignore
    xSpace = (baseRight - baseLeft - xBlockAll) / (itemNodes.length - 1);
    //@ts-ignore
    ySpace = (baseBottom - baseTop - yBlockAll) / (itemNodes.length - 1);
    //@ts-ignore
    baseHorizontally = (baseTop + baseBottom) / 2;
    //@ts-ignore
    baseVertical = (baseLeft + baseRight) / 2;
    switch (type) {
      case 'left':
        element.itemNodes = itemNodes.map((item: any) => {
          item.x = baseLeft;
          return item;
        });
        break;
      case 'right':
        element.itemNodes = itemNodes.map((item: any) => {
          // @ts-ignore
          item.x = baseRight - item.width;
          return item;
        });
        break;
      case 'centerVertical':
        element.itemNodes = itemNodes.map((item: any) => {
          // @ts-ignore
          item.x = baseVertical - item.width / 2;
          return item;
        });
        break;
      case 'top':
        element.itemNodes = itemNodes.map((item: any) => {
          item.y = baseTop;
          return item;
        });
        break;
      case 'bottom':
        element.itemNodes = itemNodes.map((item: any) => {
          // @ts-ignore
          item.y = baseBottom - item.height;
          return item;
        });
        break;
      case 'centerHorizontally':
        element.itemNodes = itemNodes.map((item: any) => {
          // @ts-ignore
          item.y = baseHorizontally - item.height / 2;
          return item;
        });
        break;
      case 'horizontallyFlex':
        const arr = element.itemNodes.sort((i1: any, i2: any) => i1.x - i2.x);
        const [f1] = arr;
        const startBaseX = f1.x;
        let startX = 0;
        element.itemNodes = arr.map((item: any) => {
          item.x = startBaseX + startX;
          startX = startX + item.width + xSpace;
          // @ts-ignore
          item.y = baseHorizontally - item.height / 2;
          return item;
        });
        break;
      case 'verticalFlex':
        const arr1 = element.itemNodes.sort((i1: any, i2: any) => i1.y - i2.y);
        const [j1] = arr1;
        const startBaseY = j1.y;
        let startY = 0;
        element.itemNodes = arr1.map((item: any) => {
          item.y = startBaseY + startY;
          startY = startY + item.height + ySpace;
          // @ts-ignore
          item.x = baseVertical - item.width / 2;
          return item;
        });
        break;
    }
  },
  [TYPES.SET_NODE_VISIBLE]: (state, action) => {
    const { schema } = state;
    const { id } = action.value;
    const { element } = findElementById(id, schema);
    element.visible = !element.visible;
    if (element.type === 'PipeLine') {
      state.isPipeLineVisible = true;
    }
  },
  [TYPES.SET_NODE_LOCK]: (state, action) => {
    const { schema } = state;
    const { id } = action.value;
    const { element } = findElementById(id, schema);
    element.lock = !element.lock;
    if (element.type === 'PipeLine') {
      state.isPipeLineLock = true;
    }
  },
  [TYPES.SET_NODE_LABEL]: (state, action) => {
    const { schema } = state;
    const { id, label } = action.value;
    const { element } = findElementById(id, schema);
    element.label = label;
  },
  [TYPES.SET_PIPE_LINE_VISIBLE_LISTENER_STATUS]: (state) => {
    state.isPipeLineVisible = false;
  },
  [TYPES.SET_PIPE_LINE_LOCK_LISTENER_STATUS]: (state) => {
    state.isPipeLineLock = false;
  },
};
export default actions;
