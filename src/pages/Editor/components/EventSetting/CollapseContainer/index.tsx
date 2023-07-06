import React, { useState } from 'react';
import classNames from 'classnames';
import EventTypeChange from '@/pages/Editor/components/EventSetting/EventTypeChange';
import EventActionChange from '@/pages/Editor/components/EventSetting/EventActionChange';
const CollapseContainer: React.FC = () => {
  const [collapseStatus, setCollapseStatus] = useState(false);
  const arrowClassName = classNames(`iconfont icon-arrowdown arrow`, {
    active: collapseStatus,
  });
  return (
    <div className="collapse-container">
      <div
        className="collapse-title"
        onClick={setCollapseStatus.bind(this, !collapseStatus)}
      >
        <div className="text">值变化</div>
        <div className="icon-group">
          <i className="iconfont icon-shanchu delete" />
          <i className={arrowClassName} />
        </div>
      </div>
      {collapseStatus && (
        <div className="collapse-content">
          <EventTypeChange />
          <EventActionChange />
        </div>
      )}
    </div>
  );
};

export default CollapseContainer;
