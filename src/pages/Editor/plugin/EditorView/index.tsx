import React, { useContext, useEffect, useRef, useState } from 'react';
import './style.less';
import { StoreContext, TYPES } from '@/store';
import GraduatedScale from '@/pages/Editor/components/GraduatedScale';
import SVGScaleLineGroup from '@/pages/Editor/components/SVGScaleLineGroup';
import BlockGroup from '@/pages/Editor/components/BlockGroup';
import FollowMenu from '@/pages/Editor/components/FollowMenu';
import PipeLine from '@/pages/Editor/material/GeneralComponent/GraphGroup/PipeLine/component';
import signPipeLineDot from '@/pages/Editor/plugin/EditorView/signPipeLineDot';
import SignMaskDot from '@/pages/Editor/components/SignMaskDot';
import {
  elementComponents,
  elementDefaultValues,
} from '@/pages/Editor/material';
import { useDrop } from 'react-dnd';
import createUUID from '@/utils/UUID';
import classNames from 'classnames';

type SvgBlockContainerConfig = {
  x: number;
  y: number;
  height: number;
  width: number;
};
type SvgStartActionBasePoint = {
  x: number;
  y: number;
};
let mouseX = 0;
let mouseY = 0;
let activeKeyCache = '';
const EditorView: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const {
    currentAction,
    pageSelectionVisible,
    nodeSelectionVisible,
    svgOffset,
    isKeydownCtrlKey,
    isPipeLineMove,
    isPipeLineNodePaste,
    activeKey,
    isPipeLineLock,
    isPipeLineVisible,
  } = state;
  const nodes = state.schema.itemNodes;
  const { canvasMoveStatus } = state;
  const [isCanMove, setIsCanMove] = useState(false);
  const SVGContainerRef = useRef(null);
  const [maskArray, setMaskArray] = useState([]);
  //划组容器信息
  const [svgBlockContainerConfig, setSvgBlockContainerConfig] =
    useState<SvgBlockContainerConfig>({
      x: 0,
      y: 0,
      height: 0,
      width: 0,
    });
  //记录划组初始点位用于计算
  const [svgStartActionBasePoint, setSvgStartActionBasePoint] =
    useState<SvgStartActionBasePoint>({
      x: 0,
      y: 0,
    });
  const handleMouseMove = (event: React.MouseEvent) => {
    const { pageX, pageY } = event;
    const isElementHandle = !!Object.keys(currentAction).length;
    //记录鼠标在屏幕中的位置用于节点插入
    mouseX = pageX;
    mouseY = pageY;
    if (isCanMove && isElementHandle) {
      dispatch({
        type: TYPES.SET_NODE_RESIZE_MOVE_ATTRIBUTE,
        value: { event },
      });
      const { dotId, target, offsetX, offsetY } = currentAction;
      if (target === 'SIGN_MASK_DOT') {
        const maskArr = [...maskArray];
        const dot = maskArr.find((item: any) => item.dotId === dotId);
        // @ts-ignore
        dot.x = pageX - svgOffset.x - offsetX;
        // @ts-ignore
        dot.y = pageY - svgOffset.y - offsetY;
      }
    } else if (isCanMove) {
      //划组操作 千万不要动！！！！！
      const config = { ...svgBlockContainerConfig };
      const { x, y } = config;
      const baseY = pageY - svgOffset.y;
      const baseX = pageX - svgOffset.x;
      //此处判断鼠标轨迹的四种方向
      //右下移动方向
      if (baseY > y && baseX > x) {
        const height = baseY - svgStartActionBasePoint.y;
        const width = baseX - svgStartActionBasePoint.x;
        if (height > 0 && width > 0) {
          Object.assign(config, { height, width });
          setSvgBlockContainerConfig(config);
        } else if (height < 0 && width < 0) {
          const sx = baseX;

          const sy = baseY;
          const height = svgStartActionBasePoint.y - baseY;
          const width = svgStartActionBasePoint.x - baseX;
          setSvgBlockContainerConfig({ x: sx, y: sy, height, width });
        } else if (height > 0 && width < 0) {
          const sx = baseX;
          const sy = svgStartActionBasePoint.y;
          const height = baseY - svgStartActionBasePoint.y;
          const width = svgStartActionBasePoint.x - baseX;
          setSvgBlockContainerConfig({ x: sx, y: sy, height, width });
        } else if (height < 0 && width > 0) {
          const height = svgStartActionBasePoint.y - baseY;
          const width = baseX - svgStartActionBasePoint.x;
          const sx = svgStartActionBasePoint.x;
          const sy = svgStartActionBasePoint.y - height;
          setSvgBlockContainerConfig({ x: sx, y: sy, height, width });
        }
      }
      //左上移动方向
      if (baseY < y && baseX < x) {
        const sx = baseX;
        const sy = baseY;
        const height = svgStartActionBasePoint.y - baseY;
        const width = svgStartActionBasePoint.x - baseX;
        setSvgBlockContainerConfig({ x: sx, y: sy, height, width });
      }
      // 左下移动方向
      if (baseY > y && baseX < x) {
        const height = baseY - svgStartActionBasePoint.y;
        const width = svgStartActionBasePoint.x - baseX;
        if (height > 0 && width > 0) {
          const sx = baseX;
          const sy = svgStartActionBasePoint.y;
          setSvgBlockContainerConfig({ x: sx, y: sy, height, width });
        } else if (height < 0 && width > 0) {
          const height = svgStartActionBasePoint.y - baseY;
          const width = svgStartActionBasePoint.x - baseX;
          setSvgBlockContainerConfig({ x: baseX, y: baseY, height, width });
        }
      }
      // 右上移动方向
      if (baseY < y && baseX > x) {
        const height = svgStartActionBasePoint.y - baseY;
        const width = baseX - svgStartActionBasePoint.x;
        if (height > 0 && width > 0) {
          const sx = svgStartActionBasePoint.x;
          const sy = svgStartActionBasePoint.y - height;
          setSvgBlockContainerConfig({ x: sx, y: sy, height, width });
        } else if (height > 0 && width < 0) {
          const sx = baseX;
          const sy = baseY;
          const height = svgStartActionBasePoint.y - baseY;
          const width = svgStartActionBasePoint.x - baseX;
          setSvgBlockContainerConfig({ x: sx, y: sy, height, width });
        }
      }
    }
  };
  //鼠标按下可以移动
  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsCanMove(true);
    // svgCanvasSetting()
    if (SVGContainerRef.current) {
      //@ts-ignore
      //计算svg在页面中的偏移量
      const { left, top } = SVGContainerRef.current.getBoundingClientRect();
      dispatch({ type: TYPES.SET_SVG_OFFSET, value: { x: left, y: top } });
      //currentAction为空对象则说明进行划组操作
      if (!Object.keys(currentAction).length) {
        const { pageX, pageY } = event;
        const x = pageX - left;
        const y = pageY - top;
        const config = { x, y, height: 0, width: 0 };
        setSvgBlockContainerConfig(config);
        setSvgStartActionBasePoint({ x, y });
      }
    }
    dispatch({
      type: TYPES.SET_FOLLOW_MENU_CONFIG,
      value: {
        visible: false,
        x: 0,
        y: 0,
      },
    });

    //判断当前区域是否存在组或者元素
    const itemNodes = state.schema.itemNodes;
    const { pageX, pageY } = event;
    // @ts-ignore
    const { left, top } = SVGContainerRef.current.getBoundingClientRect();
    const [baseX, baseY] = [pageX - left, pageY - top];
    let isEmptyBlock = true;
    let blockConfig = {
      id: null,
      type: null,
      path: [],
      visible: true,
      lock: false,
      stokeWidth: 10,
    };
    for (let i = itemNodes.length - 1; i >= 0; i--) {
      const { x, y, width, height, id, type, path, stokeWidth, lock, visible } =
        itemNodes[i];
      if (baseX > x && baseX < x + width && baseY > y && baseY < y + height) {
        blockConfig = {
          id,
          type,
          path,
          stokeWidth,
          lock,
          visible,
        };
        isEmptyBlock = false;
        break;
      }
    }

    //解除默认成组
    if (isEmptyBlock) {
      dispatch({ type: TYPES.SET_ACTIVE_KEY, value: { id: '0' } });
      dispatch({ type: TYPES.RELIEVE_DEFAULT_BLOCK_ELEMENT_GROUP });
    }
    //判断当前区域是否有管道
    if (!isEmptyBlock && blockConfig.type === 'PipeLine') {
      // signMask区域不做打点操作，避免重复
      let isSignMaskDotBlock = false;
      maskArray.forEach((item) => {
        // @ts-ignore
        const { x, y } = item;
        if (x + 8 > baseX && x - 8 < baseX && y + 8 > baseY && y - 8 < baseY) {
          isSignMaskDotBlock = true;
        }
      });
      if (!isSignMaskDotBlock) {
        const checkHandle = (id: string) => {
          dispatch({
            type: TYPES.SET_ACTIVE_KEY,
            value: { id },
          });
        };
        const activeHandle = (id: string, path: any) => {
          dispatch({
            type: TYPES.SET_CURRENT_ACTION,
            value: {
              currentAction: {
                target: 'PIPE_LINE',
                type: 'MOVE',
                id: id,
                pageX,
                pageY,
                baseX,
                baseY,
                cachePath: path,
              },
            },
          });
        };
        setMaskArray(
          signPipeLineDot(
            nodes,
            baseX,
            baseY,
            // @ts-ignore
            maskArray,
            dispatch,
            isKeydownCtrlKey,
            checkHandle,
            activeHandle,
          ),
        );
      }
    }
  };
  //鼠标弹起不可移动
  const handleMouseUp = () => {
    setIsCanMove(false);
    dispatch({ type: TYPES.STOP_PIPE_LINE_MOVE });
    if (Object.keys(currentAction).length) {
      dispatch({
        type: TYPES.SET_CURRENT_ACTION,
        value: { currentAction: {} },
      });
    } else {
      //此处进行划块区域内的元素判断
      dispatch({
        type: TYPES.SET_BLOCK_ELEMENT_GROUP,
        value: { ...svgBlockContainerConfig },
      });
      setSvgBlockContainerConfig({
        x: 0,
        y: 0,
        height: 0,
        width: 0,
      });
    }
  };
  //设置画布属性
  const svgCanvasSetting = () => {
    if (SVGContainerRef.current) {
      const { left, top, width, height } =
        //@ts-ignore
        SVGContainerRef.current.getBoundingClientRect();
      dispatch({
        type: TYPES.SET_SVG_CANVAS_STYLE,
        value: { left, top, width, height },
      });
    }
  };
  const renderNodes = () => {
    return nodes.map((item: any) => {
      if (item.type === 'BLOCK_GROUP') {
        return <BlockGroup key={item.id} {...item} />;
      } else {
        const { type } = item;
        // @ts-ignore
        const Element = elementComponents[type] || (() => <></>);
        return <Element key={item.id} {...item} />;
      }
    });
  };
  //组件拖入操作
  // @ts-ignore
  const [{}, drop] = useDrop({
    accept: 'ELEMENT',
    drop: (item, monitor) => {
      // @ts-ignore
      const { type } = item;
      //@ts-ignore
      let { x, y } = monitor.getClientOffset();
      // @ts-ignore
      const { left, top } = SVGContainerRef.current.getBoundingClientRect();
      // @ts-ignore
      const value = { ...elementDefaultValues[type] };
      const { width, height, stokeWidth } = value;
      if (type !== 'PipeLine') {
        Object.assign(value, {
          x: x - left - width / 2,
          y: y - top - height / 2,
        });
      } else {
        const id = createUUID();
        const start = {
          type: 'M',
          x: x - left - stokeWidth / 2,
          y: y - top - 80,
          dotId: createUUID(),
          groupId: id,
        };
        const end = {
          type: 'L',
          x: x - left - stokeWidth / 2,
          y: y - top + 50,
          dotId: createUUID(),
          groupId: id,
        };
        Object.assign(value, {
          path: [start, end],
          x: x - left - stokeWidth / 2,
          y: y - top - 50,
          id,
        });
        // @ts-ignore
        setMaskArray([...maskArray, start, end]);
      }
      dispatch({ type: TYPES.CREATE_NEW_NODE_TO_SCHEMA, value });
    },
  });
  const keydownEvent = (event: React.KeyboardEvent) => {
    //删除操作
    if (event.key === 'Delete') {
      dispatch({ type: TYPES.DELETE_NODE_BY_ID });
    }
    if (event.ctrlKey) {
      //节点复制
      if (event.key === 'c') {
        dispatch({
          type: TYPES.SET_COPY_NODE_CACHE,
          value: { id: activeKeyCache },
        });
      }
      //节点粘贴
      if (event.key === 'v') {
        const { left, top } =
          //@ts-ignore
          SVGContainerRef.current.getBoundingClientRect();
        const x = mouseX - left;
        const y = mouseY - top;
        dispatch({ type: TYPES.INSET_NODE_TO_TREE, value: { x, y } });
      }
    }
  };
  const setCanvasMoveCurrentAction = (e: React.MouseEvent) => {
    const { pageX, pageY } = e;
    dispatch({
      type: TYPES.SET_CURRENT_ACTION,
      value: {
        currentAction: {
          target: 'MOVE_ALL_RECT',
          type: 'MOVE',
          pageX,
          pageY,
          cacheSchema: JSON.parse(JSON.stringify(nodes)), //保存缓存数据用于计算
          id: createUUID(),
        },
      },
    });
  };
  useEffect(() => {
    svgCanvasSetting();
    window.addEventListener('resize', svgCanvasSetting);
    // @ts-ignore
    window.addEventListener('keydown', keydownEvent);
    return () => {
      window.removeEventListener('resize', svgCanvasSetting);
      // @ts-ignore
      window.removeEventListener('keydown', keydownEvent);
    };
  }, [pageSelectionVisible, nodeSelectionVisible]);
  useEffect(() => {
    if (
      isPipeLineMove ||
      isPipeLineNodePaste ||
      isPipeLineLock ||
      isPipeLineVisible
    ) {
      const paths = nodes
        .filter(
          (item: any) => item.type === 'PipeLine' && !item.lock && item.visible,
        )
        .map((item: any) => item.path)
        .flat();
      setMaskArray(paths);
      dispatch({ type: TYPES.STOP_PIPE_LINE_PASTE });
      dispatch({ type: TYPES.SET_PIPE_LINE_VISIBLE_LISTENER_STATUS });
      dispatch({ type: TYPES.SET_PIPE_LINE_LOCK_LISTENER_STATUS });
    }
  }, [
    isPipeLineMove,
    nodes,
    isPipeLineNodePaste,
    isPipeLineLock,
    isPipeLineVisible,
  ]);
  //单独做处理，全局事件无法获取hooks内部属性，但是可以更改，使用全局变量
  useEffect(() => {
    activeKeyCache = activeKey;
  }, [activeKey]);
  return (
    <div className="editor-view">
      <FollowMenu />
      <GraduatedScale>
        <div className="canvas-container" ref={SVGContainerRef}>
          <div className="droppable-container" ref={drop}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              style={{ overflow: 'hidden' }}
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              className="svg-canvas"
              onContextMenu={(e) => e.preventDefault()}
            >
              {/*<PipeLine/>*/}
              <defs>
                <pattern
                  id="pattern_grid"
                  patternUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="10"
                  height="10"
                >
                  <rect width="1" height="1" rx="1" ry="1" fill="#555555" />
                </pattern>
              </defs>

              <rect width="100%" height="100%" fill="url(#pattern_grid)" />
              {/*scale基线*/}
              <SVGScaleLineGroup />

              <g>
                {/*element物料*/}
                {renderNodes()}
                <g className="svg-block-container">
                  <rect
                    {...svgBlockContainerConfig}
                    fill="rgba(176, 91, 252, 0.2)"
                  />
                </g>
                {/*区间划块(选中，非操作)*/}
                {!isPipeLineMove &&
                  maskArray.map((item: any, index) => (
                    <SignMaskDot
                      key={index}
                      x={item.x}
                      y={item.y}
                      id={item.groupId}
                      dotId={item.dotId}
                    />
                  ))}
              </g>
              <rect
                onMouseDown={setCanvasMoveCurrentAction}
                className={classNames('move-all-rect', {
                  'is-move': canvasMoveStatus,
                })}
              />
            </svg>
          </div>
        </div>
      </GraduatedScale>
    </div>
  );
};

export default EditorView;
