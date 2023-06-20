import { Select } from 'antd';
import { StoreContext, TYPES } from '@/store';
import React, { useContext } from 'react';
interface IProps {
  element: {
    data: {
      style: {
        fontWeight: string;
      };
    };
  };
}

export const fontWeightOptions = [
  {
    value: 'normal',
    label: 'normal',
  },
  {
    value: 'bold',
    label: 'bold',
  },
  {
    value: 'bolder',
    label: 'bolder',
  },
  {
    value: 'lighter',
    label: 'lighter',
  },
];
const FontWeight: React.FC<IProps> = ({ element }) => {
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
        <div className="label">字体粗细</div>
        <div className="content">
          <Select
            placeholder="请输入"
            className="fill"
            onChange={(value) => setNodeAttribute(value, 'style', 'fontWeight')}
            options={fontWeightOptions}
            value={style.fontWeight}
          />
        </div>
      </div>
    </>
  );
};

export default FontWeight;
