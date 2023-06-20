import { StoreContext, TYPES } from '@/store';
import React, { useContext } from 'react';
import { Select } from 'antd';
interface IProps {
  element: {
    data: {
      style: {
        textAlign: string;
      };
    };
  };
}
export const textAlignOption = [
  {
    value: 'center',
    label: '居中',
  },
  {
    value: 'left',
    label: '左对齐',
  },
  {
    value: 'right',
    label: '右对齐',
  },
];
const TextAlign: React.FC<IProps> = ({ element }) => {
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
        <div className="label">对齐方式</div>
        <div className="content">
          <Select
            placeholder="请输入"
            className="fill"
            onChange={(value) => setNodeAttribute(value, 'style', 'textAlign')}
            options={textAlignOption}
            value={style.textAlign}
          />
        </div>
      </div>
    </>
  );
};

export default TextAlign;
