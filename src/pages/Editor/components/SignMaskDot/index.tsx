import React, { useContext } from 'react';
import './style.less';
import { StoreContext, TYPES } from '@/store';
interface Props {
  x: number;
  y: number;
  id: string;
  dotId: string;
}
const SignMaskDot: React.FC<Props> = ({ x, y, id, dotId }) => {
  const { dispatch } = useContext(StoreContext);
  // const {svgOffset} = state
  const handleEvent = (e: React.MouseEvent) => {
    const target = 'SIGN_MASK_DOT';
    const type = 'MOVE';
    // itemNodes
    const { pageX, pageY } = e;
    //@ts-ignore
    const { bottom, height, left, right, top, width, x, y } =
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
      dotId,
    };
    dispatch({ type: TYPES.SET_CURRENT_ACTION, value: { currentAction } });
  };
  return (
    <g transform={`translate(${x},${y})`}>
      <circle r="5" fill="#6699ee" />
      <circle r="2" fill="#9933dd" />
      <rect
        className="sign-mask-dot-rect"
        width={10}
        height={10}
        x={-5}
        y={-5}
        fill={'transparent'}
        onMouseDown={handleEvent}
      />
    </g>
  );
};

export default SignMaskDot;
