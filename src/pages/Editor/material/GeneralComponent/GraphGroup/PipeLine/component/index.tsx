import React, { useContext, useEffect } from 'react';
import { StoreContext, TYPES } from '@/store';
import './style.less';

type PathItem = {
  type: string;
  x: number;
  y: number;
  id?: string;
};

interface Props {
  path: PathItem[];
  stokeWidth: number;
  x: number;
  y: number;
  id: string;
  visible: boolean;
  data: {
    line: any;
    animation: any;
    pipe: any;
    background: any;
  };
}

//获取圆心切点坐标与斜率
const getEndpoint = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  l2: number,
) => {
  const v1x = x2 - x1;
  const v1y = y2 - y1;
  const v2x = y1 - y2;
  const v2y = x2 - x1;
  const v2Length = Math.sqrt(v2x * v2x + v2y * v2y);
  const slope1 = v1y / v1x; // 直线l1的斜率
  const slope2 = -v1x / v1y; // 直线l2的斜率
  const endpointX = x1 + (l2 * v2x) / v2Length;
  const endpointY = y1 + (l2 * v2y) / v2Length;
  return { x: endpointX, y: endpointY, slope1: slope1, slope2: slope2 };
};
//计算直线交点
const getIntersectionPoint = (
  x1: number,
  y1: number,
  k1: number,
  x2: number,
  y2: number,
  k2: number,
) => {
  const x = (k1 * x1 - y1 - k2 * x2 + y2) / (k1 - k2);
  const y = k1 * (x - x1) + y1;
  return { x: x, y: y };
};
//判断点是否在线上
const isPointOnLine = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
) => {
  // 如果 x2 - x1 = 0，则直线垂直于 x 轴，斜率不存在
  if (x2 - x1 === 0) {
    return x3 === x1 && y3 >= Math.min(y1, y2) && y3 <= Math.max(y1, y2);
  }
  // 否则，求出直线的斜率 k 和截距 b
  const k = (y2 - y1) / (x2 - x1);
  const b = y1 - k * x1;
  // 判断点是否在直线上
  return Math.abs(y3 - (k * x3 + b)) < Number.EPSILON;
};
const PipeLine: React.FC<Props> = ({ path, stokeWidth, id, data, visible }) => {
  const { state, dispatch } = useContext(StoreContext);
  const { schema, activeKey } = state;
  const { line, animation, pipe, background } = data;
  const animationStyle = animation.flow
    ? {
        animation: `path-animation ${animation.flowVelocity}s linear infinite`,
        opacity: line.opacity,
      }
    : {
        opacity: line.opacity,
      };

  let dStr = '';
  for (let i = 0; i < path.length; i++) {
    const { x, y, type } = path[i];
    if (i !== 0 && i !== path.length - 1) {
      const startX = path[i - 1].x;
      const startY = path[i - 1].y;
      const endX = path[i + 1].x;
      const endY = path[i + 1].y;
      const isOnLine = isPointOnLine(startX, startY, endX, endY, x, y);
      if (
        (startX === endX && startX === x) ||
        (startY === endY && startY === y) ||
        isOnLine
      ) {
        dStr += `${type} ${x} ${y} `;
      } else {
        //交点贝塞尔曲线计算
        let p1 = getEndpoint(x, y, startX, startY, -0.01);
        let p2 = getEndpoint(x, y, endX, endY, 0.01);
        let p3 = getIntersectionPoint(
          p1.x,
          p1.y,
          p1.slope1,
          p2.x,
          p2.y,
          p2.slope1,
        );
        dStr += `L ${p1.x} ${p1.y} C ${p1.x} ${p1.y}  ${p3.x} ${p3.y}  ${p2.x} ${p2.y}  L ${p2.x} ${p2.y} `;
      }
    } else {
      dStr += `${type} ${x} ${y} `;
    }
  }

  useEffect(() => {
    //g标签无法进行事件处理，必须用dom填充进行事件降级
    let minX: number | null = null;
    let minY: number | null = null;
    let maxX: number | null = null;
    let maxY: number | null = null;
    path.forEach((item) => {
      const { x, y } = item;
      if (minX === null || x < minX) {
        minX = x;
      }
      if (maxX === null || x > maxX) {
        maxX = x;
      }
      if (minY === null || y < minY) {
        minY = y;
      }
      if (maxY === null || y > maxY) {
        maxY = y;
      }
    });

    const [x, y, width, height] = [
      // @ts-ignore
      minX - stokeWidth,
      // @ts-ignore
      minY - stokeWidth,
      // @ts-ignore
      maxX - minX + 2 * stokeWidth,
      // @ts-ignore
      maxY - minY + 2 * stokeWidth,
    ];
    dispatch({
      type: TYPES.SET_ELEMENT_NODE_DATA_BY_ID,
      value: { id, data: { x, y, width, height } },
    });
  }, [schema]);

  return (
    <g style={{ border: '1px solid red', display: visible ? '' : 'none' }}>
      <defs>
        <filter
          className="blurs-filter"
          x="-1"
          y="-1"
          filterUnits="userSpaceOnUse"
          id={`filter-blurs-${id}`}
        >
          <feGaussianBlur stdDeviation="3.6" result="offset-blur" />
          <feComposite
            operator="out"
            in="SourceGraphic"
            in2="offset-blur"
            result="inverse"
          />
          <feFlood floodColor={pipe.color} result="color" />
          <feMorphology operator="dilate" radius="4" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
        </filter>
      </defs>
      {background.visible && (
        <path
          stroke={background.color}
          strokeWidth={background.width}
          style={{ opacity: background.opacity }}
          fill="none"
          d={dStr}
        />
      )}
      {/*选中出现*/}
      {activeKey === id && (
        <path
          stroke="rgba(250,250,250,.2)"
          strokeWidth={stokeWidth + 8}
          fill="none"
          d={dStr}
        />
      )}
      {pipe.visible && (
        <path
          stroke="#122C45"
          style={{ opacity: pipe.opacity }}
          strokeWidth={pipe.width}
          fill="none"
          d={dStr}
          filter={`url(#filter-blurs-${id})`}
        />
      )}
      {line.type === 'dashed' ? (
        <path
          className="path"
          style={animationStyle}
          stroke={line.color}
          strokeWidth={line.width}
          strokeDasharray={`${line.dashedLength} ${line.dashedInterval}`}
          strokeDashoffset="1000"
          fill="none"
          d={dStr}
        />
      ) : (
        <path
          className="path"
          style={animationStyle}
          stroke={line.color}
          strokeWidth={line.width}
          fill="none"
          d={dStr}
        />
      )}
    </g>
  );
};

export default PipeLine;
