import { InputNumber } from 'antd';
import { StoreContext, TYPES } from '@/store';
import React, { useContext } from 'react';
interface IProps {
  change?: boolean;
  element: {
    id: string;
    width: number | null;
    height: number | null;
  };
}
const Size: React.FC<IProps> = ({ element, change = false }) => {
  const { dispatch } = useContext(StoreContext);
  const { width, height } = element;
  const setNodeAttribute = (val: number | string | null, key: string) => {
    const type = change
      ? TYPES.SET_CHANGE_STYLE_BY_EVENT_ID
      : TYPES.SET_ATTRIBUTE_BY_MODULE;
    let data: { [key: string]: string | number } = {};
    // @ts-ignore
    data[key] = val;
    dispatch({
      type: TYPES.SET_ATTRIBUTE_BY_MODULE,
      value: { data, id: element.id },
    });
  };
  return (
    <>
      <div className="inline-block-item">
        <div className="label">尺寸</div>
        <div className="content inline-block">
          <div className="mini-inline">
            <div className="mini-label">W</div>
            <div className="mini-content">
              <InputNumber
                placeholder="W"
                min={0}
                value={width}
                onChange={(val) => setNodeAttribute(val, 'width')}
              />
            </div>
          </div>
          <div className="mini-inline">
            <div className="mini-label">H</div>
            <div className="mini-content">
              <InputNumber
                placeholder="H"
                min={0}
                value={height}
                onChange={(val) => setNodeAttribute(val, 'height')}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Size;
