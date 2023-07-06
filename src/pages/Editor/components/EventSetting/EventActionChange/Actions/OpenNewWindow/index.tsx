import React from 'react';
import { Radio, Input, Select } from 'antd';

export const OpenNewWindow: React.FC = () => {
  return (
    <>
      <div className="inline-block-item">
        <div className="label">事件行为</div>
        <div className="content">
          <Radio.Group>
            <Radio value="page">页面</Radio>
            <Radio value="link">链接</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">链接地址</div>
        <div className="content">
          <Input placeholder="请输入链接地址" />
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">链接地址</div>
        <div className="content">
          <Select className="fill" placeholder="请选择" />
        </div>
      </div>
    </>
  );
};
