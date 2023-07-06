import React from 'react';
import { Select } from 'antd';
export const SwitchoverPage: React.FC = () => {
  return (
    <>
      <div className="inline-block-item">
        <div className="label">选择页面</div>
        <div className="content">
          <Select className="fill" placeholder="请选择" />
        </div>
      </div>
    </>
  );
};
