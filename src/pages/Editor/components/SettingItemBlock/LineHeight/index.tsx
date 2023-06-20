import { StoreContext, TYPES } from '@/store';
import React, { useContext } from 'react';
import { InputNumber } from 'antd';
interface IProps {
  element: {
    data: {
      style: {
        lineHeight: string;
      };
    };
  };
}

const LineHeight: React.FC<IProps> = ({ element }) => {
  const { dispatch } = useContext(StoreContext);
  const { style } = element.data;
  const setNodeAttribute = (
    val: number | string | null,
    module: string,
    key: string,
  ) => {
    let data: { [key: string]: string | number } = {};
    // @ts-ignore
    data[key] = val;
    dispatch({ type: TYPES.SET_ATTRIBUTE_BY_MODULE, value: { data, module } });
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
