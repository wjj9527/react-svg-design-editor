import React from 'react';
import { Select } from 'antd';

export const SwitchoverBlock: React.FC = () => {
  return (
    <>
      <div className="inline-block-item">
        <div className="label">目标</div>
        <div className="content">
          <Select placeholder="请选择" className="fill" />
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">切换状态</div>
        <div className="content">
          <Select placeholder="请选择" className="fill" />
        </div>
      </div>
    </>
  );
};
