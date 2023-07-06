import { StoreContext, TYPES } from '@/store';
import React, { useContext } from 'react';
import { Select } from 'antd';
interface IProps {
  change?: boolean;
  element: {
    id: string;
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
const TextAlign: React.FC<IProps> = ({ element, change = false }) => {
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
    dispatch({
      type: TYPES.SET_ATTRIBUTE_BY_MODULE,
      value: { data, module, id: element.id },
    });
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
