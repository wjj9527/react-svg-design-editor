import React, { useContext } from 'react';
import { Button } from 'antd';
import CollapseContainer from './CollapseContainer';
import './style.less';
import EventTypeChange from '@/pages/Editor/components/EventSetting/EventTypeChange';
import EventActionChange from '@/pages/Editor/components/EventSetting/EventActionChange';
import { StoreContext, TYPES } from '@/store';
import { findElementById } from '@/utils/findElementById';

interface EventSettingProps {
  changeStyleConfig: any;
}

const EventSetting: React.FC<EventSettingProps> = ({ changeStyleConfig }) => {
  const { state, dispatch } = useContext(StoreContext);
  const { schema, activeKey } = state;
  const { element } = findElementById(activeKey, schema);
  const { event } = element;
  return (
    <div className="event-setting-block setting-container">
      <div className="handle">
        <Button
          type="primary"
          shape="circle"
          onClick={dispatch.bind(this, { type: TYPES.CREATE_NEW_NODE_EVENT })}
        >
          <i className="iconfont icon-plus" />
        </Button>
      </div>
      <div className="event-content">
        {event?.map((item: any) => (
          <CollapseContainer>
            <EventTypeChange />
            <EventActionChange changeStyleConfig={changeStyleConfig} />
          </CollapseContainer>
        ))}
      </div>
    </div>
  );
};

export default EventSetting;
