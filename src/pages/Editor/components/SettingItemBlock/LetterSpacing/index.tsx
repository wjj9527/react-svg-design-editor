import { InputNumber } from 'antd';
import { StoreContext, TYPES } from '@/store';
import React, { useContext } from 'react';
interface IProps {
  change?: boolean;
  element: {
    id: string;
    data: {
      style: {
        letterSpacing: string;
      };
    };
  };
}

const LetterSpacing: React.FC<IProps> = ({ element, change = false }) => {
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
        <div className="label">文本间距</div>
        <div className="content">
          <InputNumber
            placeholder="请输入"
            className="fill"
            onChange={(value) =>
              setNodeAttribute(value, 'style', 'letterSpacing')
            }
            value={style.letterSpacing}
          />
        </div>
      </div>
    </>
  );
};

export default LetterSpacing;
