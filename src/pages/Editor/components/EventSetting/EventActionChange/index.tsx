import React from 'react';
import { Select } from 'antd';
import * as Actions from './Actions';
import StyleSetting from '@/pages/Editor/components/StyleSetting';
const eventActionOptions = [
  {
    value: '打开新窗口',
    key: 'OpenNewWindow',
  },
  {
    value: '切换页面',
    key: 'SwitchoverPage',
  },
  {
    value: '打开弹窗',
    key: 'OpenDialog',
  },
  {
    value: '显示/隐藏',
    key: 'SetVisible',
  },
  {
    value: '切换动态面板',
    key: 'SwitchoverBlock',
  },
  {
    value: '数值下发',
    key: 'ValuePost',
  },
  {
    value: '设置外观',
    key: 'StyleSetting',
  },
];
interface EventActionChangeProps {
  changeStyleConfig: any;
}
const EventActionChange: React.FC<EventActionChangeProps> = ({
  changeStyleConfig,
}) => {
  return (
    <div className="event-action-change-block">
      <div className="inline-block-item">
        <div className="label">事件行为</div>
        <div className="content">
          <Select
            className="fill"
            options={eventActionOptions}
            placeholder="请选择"
          />
        </div>
      </div>
      <Actions.OpenNewWindow />
      <Actions.SwitchoverPage />
      <Actions.OpenDialog />
      <Actions.SetVisible />
      <Actions.SwitchoverBlock />
      <Actions.ValuePost />
      <StyleSetting config={changeStyleConfig} change />
    </div>
  );
};

export default EventActionChange;
