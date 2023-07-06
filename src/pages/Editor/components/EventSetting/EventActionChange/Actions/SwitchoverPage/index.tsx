import React, { useContext } from 'react';
import { Select } from 'antd';
import { StoreContext, TYPES } from '@/store';
export const SwitchoverPage: React.FC<any> = ({ eventProps }) => {
  const { dispatch } = useContext(StoreContext);
  const { id } = eventProps;
  return (
    <>
      <div className="inline-block-item">
        <div className="label">选择页面</div>
        <div className="content">
          <Select
            className="fill"
            placeholder="请选择"
            value={eventProps.switchoverPagePath}
            onChange={(data) =>
              dispatch({
                type: TYPES.SET_EVENT_ATTRIBUTE_BY_EVENT_ID,
                value: { id, key: 'switchoverPagePath', data },
              })
            }
          />
        </div>
      </div>
    </>
  );
};
