import { InputNumber } from 'antd';
import { StoreContext, TYPES } from '@/store';
import React, { useContext } from 'react';
interface IProps {
  element: {
    data: {
      style: {
        fontSize: string;
      };
    };
  };
}

const FontSize: React.FC<IProps> = ({ element }) => {
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
        <div className="label">字号</div>
        <div className="content">
          <InputNumber
            placeholder="请输入"
            className="fill"
            onChange={(value) => setNodeAttribute(value, 'style', 'fontSize')}
            value={style.fontSize}
          />
        </div>
      </div>
    </>
  );
};

export default FontSize;
