import React from 'react';
import { Button } from 'antd';
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
      <Button>{text}</Button>
    </ZoomDraggable>
  );
};

export default NormalBtn;
