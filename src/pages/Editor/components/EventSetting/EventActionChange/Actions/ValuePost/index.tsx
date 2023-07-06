import React from 'react';
import { Select, Radio, Button } from 'antd';

export const ValuePost: React.FC = () => {
  return (
    <>
      <div className="inline-block-item">
        <div className="label">下发方式</div>
        <div className="content">
          <Radio.Group>
            <Radio value="post">直接下发</Radio>
            <Radio value="input">输入框</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">输入框</div>
        <div className="content">
          <Select placeholder="请选择" className="fill" />
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">设备参数</div>
        <div className="content">
          <Button type="primary">选择</Button>
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">设备参数</div>
        <div className="content">
          <Button type="primary">配置</Button>
        </div>
      </div>
    </>
  );
};
