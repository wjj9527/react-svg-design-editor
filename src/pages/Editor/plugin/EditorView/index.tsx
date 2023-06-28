import React, { useContext, useEffect, useRef, useState } from 'react';
import './style.less';
import { StoreContext, TYPES } from '@/store';
import GraduatedScale from '@/pages/Editor/components/GraduatedScale';
import SVGScaleLineGroup from '@/pages/Editor/components/SVGScaleLineGroup';
import BlockGroup from '@/pages/Editor/material/nodes/BlockGroup';
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

let pageResize: any = null;
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
const EditorView: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const {
    currentAction,
    pageSelectionVisible,
    nodeSelectionVisible,
    svgOffset,
    isKeydownCtrlKey,
  } = state;
  const nodes = state.schema.itemNodes;
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
    if (isCanMove && isElementHandle) {
      dispatch({
        type: TYPES.SET_NODE_RESIZE_MOVE_ATTRIBUTE,
        value: { event },
      });
      // console.log(currentAction)
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
      stokeWidth: 10,
    };
    for (let i = 0; i < itemNodes.length; i++) {
      const { x, y, width, height, id, type, path, stokeWidth } = itemNodes[i];
      if (baseX > x && baseX < x + width && baseY > y && baseY < y + height) {
        blockConfig = {
          id,
          type,
          path,
          stokeWidth,
        };
        isEmptyBlock = false;
        break;
      }
    }

    //解除默认成组
    if (isEmptyBlock) {
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
        if (isKeydownCtrlKey) {
          setMaskArray(
            // @ts-ignore
            signPipeLineDot(nodes, baseX, baseY, maskArray, dispatch),
          );
        }
        dispatch({ type: TYPES.SET_ACTIVE_KEY, value: { id: blockConfig.id } });
      }
    }
  };
  //鼠标弹起不可移动
  const handleMouseUp = () => {
    setIsCanMove(false);
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
  useEffect(() => {
    svgCanvasSetting();
    if (!pageResize) {
      pageResize = window.addEventListener('resize', svgCanvasSetting);
    }
    return () => {
      window.removeEventListener('resize', svgCanvasSetting);
      pageResize = null;
    };
  }, [pageSelectionVisible, nodeSelectionVisible]);
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
              {/*element物料*/}
              {renderNodes()}
              <g className="svg-block-container">
                <rect
                  {...svgBlockContainerConfig}
                  fill="rgba(176, 91, 252, 0.2)"
                />
              </g>
              {/*区间划块(选中，非操作)*/}
              {maskArray.map((item: any, index) => (
                <SignMaskDot
                  key={index}
                  x={item.x}
                  y={item.y}
                  id={item.groupId}
                  dotId={item.dotId}
                />
              ))}
            </svg>
          </div>
        </div>
      </GraduatedScale>
    </div>
  );
};

export default EditorView;
