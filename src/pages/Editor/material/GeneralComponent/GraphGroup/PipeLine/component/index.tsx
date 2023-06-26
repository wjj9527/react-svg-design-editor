import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import ZoomDraggable from '@/pages/Editor/components/ZoomDraggable';
import { StoreContext, TYPES } from '@/store';
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
const PipeLine: React.FC<Props> = ({ path, stokeWidth, id }) => {
  const { dispatch } = useContext(StoreContext);
  const [rectConfigSetting, setRectConfigSetting] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  let dStr = '';
  path.forEach((item) => {
    const { x, y, type } = item;
    dStr += `${type} ${x} ${y} `;
  });
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
  }, []);
  return (
    <g style={{ border: '1px solid red' }}>
      <rect
        {...rectConfigSetting}
        className="pipe-line-fill-rect"
        fill="rgba(0,0,0,.3)"
      />
      <path
        stroke="rgba(250,250,250,.2)"
        strokeWidth={stokeWidth}
        fill="none"
        d={dStr}
      />
    </g>
  );
};

export default PipeLine;
