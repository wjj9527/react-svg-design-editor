import React from 'react';
import ZoomDraggable from '@/pages/Editor/components/ZoomDraggable';
import { Switch } from 'antd';
interface TextProps {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
}
const SwitchBtn: React.FC<TextProps> = (props) => {
  //@ts-ignore
  const { height, width, data } = props;
  const { style, attribute } = data;
  const { text } = attribute;
  return (
    <ZoomDraggable {...props}>
      <Switch checked />
    </ZoomDraggable>
  );
};

export default SwitchBtn;
