import React, { useState } from 'react';
import classNames from 'classnames';

const CollapseContainer: React.FC = ({ children }) => {
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
      {collapseStatus && <div className="collapse-content">{children}</div>}
    </div>
  );
};

export default CollapseContainer;
