import { InputNumber } from 'antd';
import { StoreContext, TYPES } from '@/store';
import React, { useContext } from 'react';
interface IProps {
  change?: boolean;
  element: {
    id: string;
    x: number | null;
    y: number | null;
  };
}
const Position: React.FC<IProps> = ({ element, change = false }) => {
  const { dispatch } = useContext(StoreContext);
  const { x, y } = element;
  const setNodeAttribute = (val: number | string | null, key: string) => {
    const type = change
      ? TYPES.SET_CHANGE_STYLE_BY_EVENT_ID
      : TYPES.SET_ATTRIBUTE_BY_MODULE;
    let data: { [key: string]: string | number } = {};
    // @ts-ignore
    data[key] = val;
    dispatch({ type, value: { data, id: element.id } });
  };
  return (
    <>
      <div className="inline-block-item">
        <div className="label">位置</div>
        <div className="content inline-block">
          <div className="mini-inline">
            <div className="mini-label">X</div>
            <div className="mini-content">
              <InputNumber
                placeholder="X"
                min={0}
                value={x}
                onChange={(val) => setNodeAttribute(val, 'x')}
              />
            </div>
          </div>
          <div className="mini-inline">
            <div className="mini-label">Y</div>
            <div className="mini-content">
              <InputNumber
                placeholder="Y"
                min={0}
                value={y}
                onChange={(val) => setNodeAttribute(val, 'y')}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Position;
