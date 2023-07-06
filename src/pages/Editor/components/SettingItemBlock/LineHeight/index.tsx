import { StoreContext, TYPES } from '@/store';
import React, { useContext } from 'react';
import { InputNumber } from 'antd';
interface IProps {
  change?: boolean;
  element: {
    id: string;
    data: {
      style: {
        lineHeight: string;
      };
    };
  };
}

const LineHeight: React.FC<IProps> = ({ element, change = false }) => {
  const { dispatch } = useContext(StoreContext);
  const { style } = element.data;
  const setNodeAttribute = (
    val: number | string | null,
    module: string,
    key: string,
  ) => {
    const type = change
      ? TYPES.SET_CHANGE_STYLE_BY_EVENT_ID
      : TYPES.SET_ATTRIBUTE_BY_MODULE;
    let data: { [key: string]: string | number } = {};
    // @ts-ignore
    data[key] = val;
    dispatch({ type, value: { data, module, id: element.id } });
  };
  return (
    <>
      <div className="inline-block-item">
        <div className="label">行高</div>
        <div className="content">
          <InputNumber
            placeholder="请输入"
            className="fill"
            onChange={(value) => setNodeAttribute(value, 'style', 'lineHeight')}
            value={style.lineHeight}
          />
        </div>
      </div>
    </>
  );
};

export default LineHeight;
