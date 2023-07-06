import { Input } from 'antd';
import { StoreContext, TYPES } from '@/store';
import React, { useContext } from 'react';
interface IProps {
  change: boolean;
  element: {
    id: string;
    data: {
      attribute: {
        text: string;
      };
    };
  };
}
const Size: React.FC<IProps> = ({ element, change }) => {
  const { dispatch } = useContext(StoreContext);
  const { attribute } = element.data;
  const setNodeAttribute = (
    val: number | string | null,
    key: string,
    module: string,
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
        <div className="label">文字内容</div>
        <div className="content">
          <Input
            placeholder="请输入"
            value={attribute.text}
            onInput={(e: any) =>
              setNodeAttribute(e.target.value, 'text', 'attribute')
            }
          />
        </div>
      </div>
    </>
  );
};

export default Size;
