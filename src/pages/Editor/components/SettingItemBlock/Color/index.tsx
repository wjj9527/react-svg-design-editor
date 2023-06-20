import { StoreContext, TYPES } from '@/store';
import React, { useContext } from 'react';
interface IProps {
  element: {
    data: {
      style: {
        color: string;
      };
    };
  };
}

const Color: React.FC<IProps> = ({ element }) => {
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
