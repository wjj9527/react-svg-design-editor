import React, { useContext } from 'react';
import { InputNumber } from 'antd';
import { StoreContext, TYPES } from '@/store';
import { findElementById } from '@/utils/findElementById';

const PositionAndSizeSetting: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { schema, activeKey } = state;
  const { element } = findElementById(activeKey, schema);
  const { x, y, height, width } = element;
  const setNodeAttribute = (val: string | number, key: string) => {
    let data: { [key: string]: string | number } = {};
    data[key] = val;
    dispatch({ type: TYPES.SET_ATTRIBUTE_BY_MODULE, value: { data } });
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
                placeholder="宽度"
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
                placeholder="高度"
                min={0}
                value={height}
                onChange={(val) => setNodeAttribute(val, 'height')}
              />
            </div>
          </div>
        </div>
      </div>
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

export default PositionAndSizeSetting;
