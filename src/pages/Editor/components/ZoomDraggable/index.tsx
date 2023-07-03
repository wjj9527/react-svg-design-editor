import React, { useContext } from 'react';
import { StoreContext, TYPES } from '@/store';
import './index.less';
interface ZoomDraggableProps {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
  ratio?: string | number;
  children: React.ReactElement;
}

const ZoomDraggable: React.FC<ZoomDraggableProps> = ({
  x,
  y,
  width,
  height,
  id,
  children,
}) => {
  const { state, dispatch } = useContext(StoreContext);
  const { activeKey } = state;
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
  return (
    <g
      transform={`translate(${x},${y})`}
      className={`element-item ${id === activeKey ? 'active' : ''}`}
    >
      <foreignObject width={width} height={height}>
        {children}
      </foreignObject>
      <g className="resize-draggable-group">
        <rect
          x="0"
          y="0"
          style={{ cursor: 'move' }}
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
          y={height / 2 - 4}
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
          y={height - 4}
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
          x={width / 2 - 4}
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
          x={width / 2 - 4}
          y={height - 4}
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
          x={width - 4}
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
          x={width - 4}
          y={height / 2 - 4}
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
          x={width - 4}
          y={height - 4}
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
