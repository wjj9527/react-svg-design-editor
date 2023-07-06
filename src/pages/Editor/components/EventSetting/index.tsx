import React from 'react';
import { Button } from 'antd';
import CollapseContainer from './CollapseContainer';
import './style.less';
interface EventSettingProps {
  StyleBlock: React.ReactNode;
}
const EventSetting: React.FC<any> = ({ StyleBlock }) => {
  return (
    <div className="event-setting-block setting-container">
      <div className="handle">
        <Button type="primary" shape="circle">
          <i className="iconfont icon-plus" />
        </Button>
      </div>
      <div className="event-content">
        <CollapseContainer />
        {StyleBlock}
      </div>
    </div>
  );
};

export default EventSetting;
