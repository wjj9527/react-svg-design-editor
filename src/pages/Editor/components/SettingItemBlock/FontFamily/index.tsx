import { Select } from 'antd';
import { StoreContext, TYPES } from '@/store';
import React, { useContext } from 'react';
interface IProps {
  change?: boolean;
  element: {
    id: string;
    data: {
      style: {
        fontFamily: string;
      };
    };
  };
}
export const fontFamilyOptions = [
  {
    value: '微软雅黑',
    label: '微软雅黑',
  },
  {
    value: '宋体',
    label: '宋体',
  },
  {
    value: '黑体',
    label: '黑体',
  },
  {
    value: '隶书',
    label: '隶书',
  },
  {
    value: 'arial',
    label: 'arial',
  },
  {
    value: 'sans-serif',
    label: 'sans-serif',
  },
];
const FontFamily: React.FC<IProps> = ({ element, change = false }) => {
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
        <div className="label">字体</div>
        <div className="content">
          <Select
            placeholder="请输入"
            className="fill"
            onChange={(value) => setNodeAttribute(value, 'style', 'fontFamily')}
            options={fontFamilyOptions}
            value={style.fontFamily}
          />
        </div>
      </div>
    </>
  );
};

export default FontFamily;
