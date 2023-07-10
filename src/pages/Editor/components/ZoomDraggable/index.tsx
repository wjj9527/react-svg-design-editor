import React, { useContext } from 'react';
import { StoreContext, TYPES } from '@/store';
import './style.less';
import classNames from 'classnames';
interface ZoomDraggableProps {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
  visible: boolean;
  lock: boolean;
  ratio?: string | number;
  children: React.ReactElement;
}

const ZoomDraggable: React.FC<ZoomDraggableProps> = ({
  x,
  y,
  width,
  height,
  id,
  lock,
  visible,
  children,
}) => {
  const { state, dispatch } = useContext(StoreContext);
  const { activeKey, canvasScale } = state;
  //选中需要移动的节点操作
  const handleEvent = (
    e: React.MouseEvent,
    { target, type }: { target: string; type: string },
  ) => {
    const { pageX, pageY } = e;
    const { bottom, height, left, right, top, width, x, y } =
      //@ts-ignore
      e.target.getBoundingClientRect();
    //当前鼠标点位与边框偏移量
    const [offsetX, offsetY] = [pageX - x, pageY - y];
    const currentAction = {
      target,
      type,
      id,
      bottom,
      height,
      left,
      right,
      top,
      width,
      x,
      y,
      offsetX,
      offsetY,
    };
    dispatch({ type: TYPES.SET_CURRENT_ACTION, value: { currentAction } });
    //设置当前element为active
    dispatch({ type: TYPES.SET_ACTIVE_KEY, value: { id } });
  };
  const handleContextMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch({
      type: TYPES.SET_FOLLOW_MENU_CONFIG,
      value: {
        visible: true,
        x: e.pageX,
        y: e.pageY,
        id,
      },
    });
  };
  const classNameList = classNames(`element-item`, {
    active: activeKey === id,
    hidden: !visible,
    lock,
  });
  const zoomSize = (value: number) => value * canvasScale;
  return (
    <g
      transform={`translate(${zoomSize(x)},${zoomSize(y)})`}
      className={classNameList}
    >
      <foreignObject
        width={zoomSize(width)}
        height={zoomSize(height)}
        style={{
          transform: `scale(${canvasScale})`,
          transformOrigin: 'left top',
        }}
      >
        {children}
      </foreignObject>
      <g className="resize-draggable-group">
        <rect
          x="0"
          y="0"
          style={{
            cursor: 'move',
            transform: `scale(${canvasScale})`,
            transformOrigin: 'left top',
          }}
          className={`resize-draggable-container `}
          onContextMenu={handleContextMenu}
          onMouseDown={(e) =>
            handleEvent(e, { target: 'MOVE_CONTENT', type: 'MOVE' })
          }
          width={width}
          height={height}
          fill="rgba(0,0,0,0)"
        />
        <rect
          className="resize-left-top resize-rect"
          x={-4}
          y={-4}
          width="8"
          height="8"
          fill="#1677ff"
          style={{ cursor: 'nw-resize' }}
          onMouseDown={(e) =>
            handleEvent(e, { target: 'LEFT_TOP', type: 'RESIZE' })
          }
        />
        <rect
          className="resize-left-center resize-rect"
          x={-4}
          y={zoomSize(height) / 2 - 4}
          width="8"
          height="8"
          fill="#1677ff"
          style={{ cursor: 'w-resize' }}
          onMouseDown={(e) =>
            handleEvent(e, { target: 'LEFT_CENTER', type: 'RESIZE' })
          }
        />
        <rect
          className="resize-left-bottom resize-rect"
          x="-4"
          y={zoomSize(height) - 4}
          width="8"
          height="8"
          fill="#1677ff"
          style={{ cursor: 'sw-resize' }}
          onMouseDown={(e) =>
            handleEvent(e, { target: 'LEFT_BOTTOM', type: 'RESIZE' })
          }
        />
        <rect
          className="resize-center-top resize-rect"
          x={zoomSize(width) / 2 - 4}
          y={-4}
          width="8"
          height="8"
          fill="#1677ff"
          style={{ cursor: 's-resize' }}
          onMouseDown={(e) =>
            handleEvent(e, { target: 'CENTER_TOP', type: 'RESIZE' })
          }
        />
        <rect
          className="resize-center-bottom resize-rect"
          x={zoomSize(width) / 2 - 4}
          y={zoomSize(height) - 4}
          width="8"
          height="8"
          fill="#1677ff"
          style={{ cursor: 's-resize' }}
          onMouseDown={(e) =>
            handleEvent(e, { target: 'CENTER_BOTTOM', type: 'RESIZE' })
          }
        />
        <rect
          className="resize-right-top resize-rect"
          x={zoomSize(width) - 4}
          y={-4}
          width="8"
          height="8"
          fill="#1677ff"
          style={{ cursor: 'sw-resize' }}
          onMouseDown={(e) =>
            handleEvent(e, { target: 'RIGHT_TOP', type: 'RESIZE' })
          }
        />
        <rect
          className="resize-right-center resize-rect"
          x={zoomSize(width) - 4}
          y={zoomSize(height) / 2 - 4}
          width="8"
          height="8"
          fill="#1677ff"
          style={{ cursor: 'w-resize' }}
          onMouseDown={(e) =>
            handleEvent(e, { target: 'RIGHT_CENTER', type: 'RESIZE' })
          }
        />
        <rect
          className="resize-right-bottom resize-rect"
          x={zoomSize(width) - 4}
          y={zoomSize(height) - 4}
          width="8"
          height="8"
          fill="#1677ff"
          style={{ cursor: 'nw-resize' }}
          onMouseDown={(e) =>
            handleEvent(e, { target: 'RIGHT_BOTTOM', type: 'RESIZE' })
          }
        />
      </g>
    </g>
  );
};

export default ZoomDraggable;
