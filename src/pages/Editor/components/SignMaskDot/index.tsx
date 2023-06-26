import React from 'react';
interface Props {
  x: number;
  y: number;
  id: string;
}
const SignMaskDot: React.FC<Props> = ({ x, y, id }) => {
  const handleClick = () => {
    // console.log(111)
  };
  return (
    <g transform={`translate(${x},${y})`}>
      <circle r="5" fill="#6699ee" />
      <circle r="2" fill="#9933dd" />
      <rect
        width={10}
        height={10}
        x={-5}
        y={-5}
        fill={'transparent'}
        onMouseDown={handleClick}
      />
    </g>
  );
};

export default SignMaskDot;
