import React from 'react';
import { Select, Radio } from 'antd';
const optionsWithDisabled = [
  { label: '显示', value: 'show' },
  { label: '隐藏', value: 'hidden' },
  { label: '切换', value: 'toggle' },
];
export const SetVisible: React.FC = () => {
  return (
    <>
      <div className="inline-block-item">
        <div className="label">目标</div>
        <div className="content">
          <Select placeholder="请选择" className="fill" />
        </div>
      </div>
      <div className="inline-block-item">
        <Radio.Group
          className="fill"
          options={optionsWithDisabled}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
    </>
  );
};
