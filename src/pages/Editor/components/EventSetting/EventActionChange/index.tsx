import React, { useContext } from 'react';
import { Select } from 'antd';
import * as Actions from './Actions';
import StyleSetting from '@/pages/Editor/components/StyleSetting';
import { StoreContext, TYPES } from '@/store';
// import {findElementById} from "@/utils/findElementById";
const eventActionOptions = [
  {
    label: '打开新窗口',
    value: 'OpenNewWindow',
  },
  {
    label: '切换页面',
    value: 'SwitchoverPage',
  },
  {
    label: '打开弹窗',
    value: 'OpenDialog',
  },
  {
    label: '显示/隐藏',
    value: 'SetVisible',
  },
  {
    label: '切换动态面板',
    value: 'SwitchoverBlock',
  },
  {
    label: '数值下发',
    value: 'ValuePost',
  },
  {
    label: '设置外观',
    value: 'StyleSetting',
  },
];
interface EventActionChangeProps {
  changeStyleConfig: any;
  eventProps: any;
}
const EventActionChange: React.FC<EventActionChangeProps> = ({
  changeStyleConfig,
  eventProps,
}) => {
  const { dispatch } = useContext(StoreContext);
  const { id, eventAction } = eventProps;
  console.log(eventProps);
  return (
    <div className="event-action-change-block">
      <div className="inline-block-item">
        <div className="label">事件行为</div>
        <div className="content">
          <Select
            className="fill"
            options={eventActionOptions}
            placeholder="请选择"
            value={eventProps.eventAction}
            onChange={(data) =>
              dispatch({
                type: TYPES.SET_EVENT_ATTRIBUTE_BY_EVENT_ID,
                value: { id, key: 'eventAction', data },
              })
            }
          />
        </div>
      </div>
      {eventAction === 'OpenNewWindow' && (
        <Actions.OpenNewWindow eventProps={eventProps} />
      )}
      {eventAction === 'SwitchoverPage' && (
        <Actions.SwitchoverPage eventProps={eventProps} />
      )}
      {eventAction === 'OpenDialog' && <Actions.OpenDialog />}
      {eventAction === 'SetVisible' && (
        <Actions.SetVisible eventProps={eventProps} />
      )}
      {eventAction === 'SwitchoverBlock' && <Actions.SwitchoverBlock />}
      {eventAction === 'ValuePost' && <Actions.ValuePost />}
      {eventAction === 'StyleSetting' && (
        <StyleSetting
          config={changeStyleConfig}
          change
          eventProps={eventProps}
        />
      )}
    </div>
  );
};

export default EventActionChange;
