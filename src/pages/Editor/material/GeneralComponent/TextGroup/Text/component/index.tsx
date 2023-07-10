import React, { useContext } from 'react';
import ZoomDraggable from '@/pages/Editor/components/ZoomDraggable';
import { StoreContext } from '@/store';
interface TextProps {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
  visible: boolean;
  lock: boolean;
  data: any;
}
const Text: React.FC<TextProps> = (props) => {
  // const {state} = useContext(StoreContext)
  // const {canvasScale} = state
  const { height, width, data } = props;
  const { style, attribute } = data;
  const { text } = attribute;
  return (
    <ZoomDraggable {...props}>
      <div style={{ ...style, height, width }}>{text}</div>
    </ZoomDraggable>
  );
};

export default Text;
