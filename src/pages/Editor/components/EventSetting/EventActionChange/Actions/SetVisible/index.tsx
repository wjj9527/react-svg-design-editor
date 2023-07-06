import React, { useContext } from 'react';
import { Select } from 'antd';
import { StoreContext, TYPES } from '@/store';

export const SetVisible: React.FC<any> = ({ eventProps }) => {
  const { state, dispatch } = useContext(StoreContext);
  const { itemNodes } = state.schema;
  const { id } = eventProps;
  const nodeOptions = itemNodes
    .map((item: any) => {
      const { type, id, label, itemNodes } = item;
      if (type === 'BLOCK_GROUP') {
        return itemNodes.map((i: any) => {
          const { id, label } = i;
          return {
            value: id,
            label,
          };
        });
      } else {
        return {
          value: id,
          label,
        };
      }
    })
    .flat(Infinity)
    .filter((item: any) => item.id !== id);

  return (
    <>
      <div className="inline-block-item">
        <div className="label">目标</div>
        <div className="content">
          <Select
            placeholder="请选择"
            className="fill"
            options={nodeOptions}
            value={eventProps.switchoverPagePath}
            onChange={(data) =>
              dispatch({
                type: TYPES.SET_EVENT_ATTRIBUTE_BY_EVENT_ID,
                value: { id, key: 'targetVisibleNodeId', data },
              })
            }
          />
        </div>
      </div>
    </>
  );
};
