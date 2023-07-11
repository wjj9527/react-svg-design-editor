import React, { useContext, useState } from 'react';
import { Select, Input } from 'antd';
import { StoreContext, TYPES } from '@/store';
import NodalSelection from '@/pages/Editor/components/NodalSelection';
const eventTypeOptions = [
  {
    label: '单击',
    value: 'click',
  },
  {
    label: '悬停',
    value: 'hover',
  },
  {
    label: '值变化',
    value: 'valueChange',
  },
];
const valueRuleOptions = [
  {
    label: '==',
    value: '0',
  },
  {
    label: '!=',
    value: '1',
  },
  {
    label: '<',
    value: '2',
  },
  {
    label: '>',
    value: '3',
  },
  {
    label: '<=',
    value: '4',
  },
  {
    label: '>=',
    value: '5',
  },
];
const EventTypeChange: React.FC<any> = ({ eventProps }) => {
  const { dispatch } = useContext(StoreContext);
  const [visible, setVisible] = useState(false);
  const { id } = eventProps;
  const nodalSelect = (options: any) => {
    dispatch({
      type: TYPES.SET_EVENT_ATTRIBUTE_BY_EVENT_ID,
      value: { id, key: 'nodalParams', data: options },
    });
    setVisible(false);
  };
  return (
    <div className="event-type-change-block">
      <div className="inline-block-item">
        <div className="label">事件类型</div>
        <div className="content">
          <Select
            className="fill"
            options={eventTypeOptions}
            value={eventProps.eventType}
            placeholder="请选择"
            onChange={(data) =>
              dispatch({
                type: TYPES.SET_EVENT_ATTRIBUTE_BY_EVENT_ID,
                value: { id, key: 'eventType', data },
              })
            }
          />
        </div>
      </div>
      {eventProps.eventType === 'valueChange' && (
        <>
          <div className="inline-block-item">
            <div className="label">设备参数</div>
            <div className="content">
              <Input
                readOnly
                placeholder="请选择点位"
                value={
                  eventProps?.nodalParams
                    ?.map((item: any) => item.label)
                    .join('/') || ''
                }
                onClick={setVisible.bind(this, true)}
                prefix={<i className="iconfont icon-lianjie" />}
              />
            </div>
          </div>
          <NodalSelection
            visible={visible}
            onClose={setVisible.bind(this, false)}
            onConfirm={nodalSelect}
          />
          <div className="inline-block-item">
            <div className="label">判定值</div>
            <div className="content line">
              <Select
                className="pr"
                options={valueRuleOptions}
                placeholder="请选择"
                onChange={(data) =>
                  dispatch({
                    type: TYPES.SET_EVENT_ATTRIBUTE_BY_EVENT_ID,
                    value: { id, key: 'valueChangeRule', data },
                  })
                }
              />
              <Input
                placeholder="请输入"
                onChange={(e) =>
                  dispatch({
                    type: TYPES.SET_EVENT_ATTRIBUTE_BY_EVENT_ID,
                    value: { id, key: 'valueChangeData', data: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EventTypeChange;
