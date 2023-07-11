import React, { useContext, useState } from 'react';
import { Select, Radio, Button } from 'antd';
import { StoreContext, TYPES } from '@/store';
import NodalSelection from '@/pages/Editor/components/NodalSelection';
export const ValuePost: React.FC<any> = ({ eventProps }) => {
  const { state, dispatch } = useContext(StoreContext);
  const { id } = eventProps;
  const { itemNodes } = state.schema;
  const [nodalSelectionVisible, setNodalSelectionVisible] = useState(false);
  const nodeOptions = itemNodes
    .map((item: any) => {
      const { type, id, label, itemNodes } = item;
      if (type === 'BLOCK_GROUP') {
        return itemNodes.map((i: any) => {
          const { id, label } = i;
          return {
            value: id,
            label,
            type,
          };
        });
      } else {
        return {
          value: id,
          label,
          type,
        };
      }
    })
    .flat(Infinity)
    .filter((item: any) => item.id !== id && item.type === 'TextInput');
  const setValuePostInputNodal = (data: any) => {
    // console.log(data)
    dispatch({
      type: TYPES.SET_EVENT_ATTRIBUTE_BY_EVENT_ID,
      value: { id, key: 'valuePostInputNodal', data },
    });
  };
  return (
    <>
      <div className="inline-block-item">
        <div className="label">下发方式</div>
        <div className="content">
          <Radio.Group
            value={eventProps.valuePostType}
            onChange={(e) =>
              dispatch({
                type: TYPES.SET_EVENT_ATTRIBUTE_BY_EVENT_ID,
                value: { id, key: 'valuePostType', data: e.target.value },
              })
            }
          >
            <Radio value="post">直接下发</Radio>
            <Radio value="input">输入框</Radio>
          </Radio.Group>
        </div>
      </div>
      <NodalSelection
        visible={nodalSelectionVisible}
        onClose={setNodalSelectionVisible.bind(this, false)}
        multiple
        onConfirm={setValuePostInputNodal}
      />
      {eventProps.valuePostType === 'input' ? (
        <>
          <div className="inline-block-item">
            <div className="label">输入框</div>
            <div className="content">
              <Select
                placeholder="请选择"
                className="fill"
                options={nodeOptions}
                onChange={(data) =>
                  dispatch({
                    type: TYPES.SET_EVENT_ATTRIBUTE_BY_EVENT_ID,
                    value: { id, key: 'valuePostInputId', data },
                  })
                }
                value={eventProps.valuePostInputId}
              />
            </div>
          </div>
          <div className="inline-block-item">
            <div className="label">设备参数</div>
            <div className="content">
              <Button
                type="primary"
                onClick={setNodalSelectionVisible.bind(this, true)}
              >
                选择
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="inline-block-item">
          <div className="label">设备参数</div>
          <div className="content">
            <Button type="primary">配置</Button>
          </div>
        </div>
      )}
    </>
  );
};
