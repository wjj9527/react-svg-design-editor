import React, { useContext } from 'react';
import { Radio, Input, Select } from 'antd';
import { StoreContext, TYPES } from '@/store';

export const OpenNewWindow: React.FC<any> = ({ eventProps }) => {
  const { dispatch } = useContext(StoreContext);
  const { openWindowAction, id, openWindowPath, openWindowPagePath } =
    eventProps;
  return (
    <>
      <div className="inline-block-item">
        <div className="label">内容</div>
        <div className="content">
          <Radio.Group
            value={openWindowAction}
            onChange={(e) =>
              dispatch({
                type: TYPES.SET_EVENT_ATTRIBUTE_BY_EVENT_ID,
                value: { id, key: 'openWindowAction', data: e.target.value },
              })
            }
          >
            <Radio value="page">页面</Radio>
            <Radio value="link">链接</Radio>
          </Radio.Group>
        </div>
      </div>
      {openWindowAction === 'link' && (
        <div className="inline-block-item">
          <div className="label">链接地址</div>
          <div className="content">
            <Input
              placeholder="请输入链接地址"
              value={openWindowPath}
              onInput={(e) =>
                dispatch({
                  type: TYPES.SET_EVENT_ATTRIBUTE_BY_EVENT_ID,
                  //@ts-ignore
                  value: { id, key: 'openWindowPath', data: e.target.value },
                })
              }
            />
          </div>
        </div>
      )}
      {openWindowAction === 'page' && (
        <div className="inline-block-item">
          <div className="label">选择页面</div>
          <div className="content">
            <Select
              className="fill"
              value={openWindowPagePath}
              placeholder="请选择"
              onChange={
                //@ts-ignore
                (data) =>
                  dispatch({
                    type: TYPES.SET_EVENT_ATTRIBUTE_BY_EVENT_ID,
                    value: { id, key: 'openWindowPagePath', data },
                  })
              }
            />
          </div>
        </div>
      )}
    </>
  );
};
