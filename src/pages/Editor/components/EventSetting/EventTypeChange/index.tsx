import React from 'react';
import { Select, Input } from 'antd';
const eventTypeOptions = [
  {
    value: '单击',
    key: 'click',
  },
  {
    value: '悬停',
    key: 'hover',
  },
  {
    value: '值变化',
    key: 'valueChange',
  },
];
const valueRuleOptions = [
  {
    value: '==',
    key: '0',
  },
  {
    value: '!=',
    key: '1',
  },
  {
    value: '<',
    key: '2',
  },
  {
    value: '>',
    key: '3',
  },
  {
    value: '<=',
    key: '4',
  },
  {
    value: '>=',
    key: '5',
  },
];
const EventTypeChange: React.FC = () => {
  const nodalSelect = () => {
    console.log(11);
  };
  return (
    <div className="event-type-change-block">
      <div className="inline-block-item">
        <div className="label">事件类型</div>
        <div className="content">
          <Select
            className="fill"
            options={eventTypeOptions}
            placeholder="请选择"
          />
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">设备参数</div>
        <div className="content">
          <Input
            readOnly
            placeholder="请选择点位"
            prefix={<i className="iconfont icon-lianjie" />}
            onClick={nodalSelect}
          />
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">判定值</div>
        <div className="content line">
          <Select
            className="pr"
            options={valueRuleOptions}
            placeholder="请选择"
          />
          <Input placeholder="请选择点位" onClick={nodalSelect} />
        </div>
      </div>
    </div>
  );
};

export default EventTypeChange;
