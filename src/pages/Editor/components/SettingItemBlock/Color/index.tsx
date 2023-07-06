import { StoreContext, TYPES } from '@/store';
import React, { useContext } from 'react';
interface IProps {
  change?: boolean;
  element: {
    id: string;
    data: {
      style: {
        color: string;
      };
    };
  };
}

const Color: React.FC<IProps> = ({ element, change = false }) => {
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
        <div className="label">颜色</div>
        <div className="content">
          <input
            type="color"
            value={style.color}
            onChange={(e) => setNodeAttribute(e.target.value, 'style', 'color')}
          />
        </div>
      </div>
    </>
  );
};

export default Color;
