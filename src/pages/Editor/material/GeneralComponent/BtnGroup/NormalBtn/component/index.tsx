import React from 'react';
import ZoomDraggable from '@/pages/Editor/components/ZoomDraggable';
interface NormalBtnProps {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
}
const NormalBtn: React.FC<NormalBtnProps> = (props) => {
  //@ts-ignore
  const { height, width, data } = props;
  const { style, attribute } = data;
  const { text } = attribute;
  return (
    <ZoomDraggable {...props}>
      <div style={{ ...style, height, width }}>{text}</div>
    </ZoomDraggable>
  );
};

export default NormalBtn;
