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
}

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
const PipeLine: React.FC<Props> = ({ path, stokeWidth, id }) => {
  const { state, dispatch } = useContext(StoreContext);
  const { schema } = state;
  let dStr = '';
  for (let i = 0; i < path.length; i++) {
    const { x, y, type } = path[i];

    if (i !== 0 && i !== path.length - 1) {
      const startX = path[i - 1].x;
      const startY = path[i - 1].y;
      const endX = path[i + 1].x;
      const endY = path[i + 1].y;
      if (
        (startX === endX && startX === x) ||
        (startY === endY && startY === y)
      ) {
        dStr += `${type} ${x} ${y} `;
      } else {
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
    // @ts-ignore
    const [x, y, width, height] = [
      minX - stokeWidth,
      minY - stokeWidth,
      maxX - minX + 2 * stokeWidth,
      maxY - minY + 2 * stokeWidth,
    ];
    dispatch({
      type: TYPES.SET_ELEMENT_NODE_DATA_BY_ID,
      value: { id, data: { x, y, width, height } },
    });
  }, [schema]);
  return (
    <g style={{ border: '1px solid red' }}>
      <path
        stroke="rgba(250,250,250,.2)"
        strokeWidth={stokeWidth}
        fill="none"
        d={dStr}
      />
      <path
        stroke="rgba(250,250,250,.2)"
        strokeWidth={20}
        fill="none"
        d={dStr}
      />
      <path
        stroke="#122C45"
        stroke-width="15"
        fill="none"
        z-level="3"
        d={dStr}
        filter="url(#filter-blurs-v0-828896131)"
      />
      <path
        className="path"
        style={{ animation: `path-animation 25s linear infinite` }}
        stroke="rgba(90,255,57,.5)"
        strokeWidth="2"
        strokeDasharray="40,50"
        strokeDashoffset="1000"
        fill="none"
        d={dStr}
        markerEnd="url(#marker-dash)"
      />
    </g>
  );
};

export default PipeLine;
