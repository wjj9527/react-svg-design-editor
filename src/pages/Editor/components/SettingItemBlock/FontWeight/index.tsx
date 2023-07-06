import { Select } from 'antd';
import { StoreContext, TYPES } from '@/store';
import React, { useContext } from 'react';
interface IProps {
  change?: boolean;
  element: {
    id: string;
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
const FontWeight: React.FC<IProps> = ({ element, change = false }) => {
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
