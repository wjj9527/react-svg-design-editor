import React, { useState } from 'react';
import classNames from 'classnames';
const eventTypeTextOptions = {
  click: '单击',
  hover: '悬停',
  valueChange: '值变化',
};
const CollapseContainer: React.FC<any> = ({ children, eventProps }) => {
  const [collapseStatus, setCollapseStatus] = useState(false);
  const arrowClassName = classNames(`iconfont icon-arrowdown arrow`, {
    active: collapseStatus,
  });
  const { eventType } = eventProps;

  return (
    <div className="collapse-container">
      <div
        className="collapse-title"
        onClick={setCollapseStatus.bind(this, !collapseStatus)}
      >
        <div className="text">
          {
            // @ts-ignore
            eventTypeTextOptions[eventType]
          }
        </div>
        <div className="icon-group">
          <i className="iconfont icon-shanchu delete" />
          <i className={arrowClassName} />
        </div>
      </div>
      {collapseStatus && <div className="collapse-content">{children}</div>}
    </div>
  );
};

export default CollapseContainer;
