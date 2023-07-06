import React from 'react';
import { Select, Input } from 'antd';

export const OpenDialog: React.FC = () => {
  return (
    <>
      <div className="inline-block-item">
        <div className="label">内容</div>
        <div className="content">
          <Select placeholder="请选择" className="fill" />
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">选择设备</div>
        <div className="content">
          <Select placeholder="请选择" className="fill" />
        </div>
      </div>
    </>
  );
};
