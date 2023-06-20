import React, { useContext } from 'react';
import { Input, InputNumber, Select } from 'antd';
import { StoreContext } from '@/store';
import { findElementById } from '@/utils/findElementById';
import {
  fontFamilyOptions,
  fontWeightOptions,
  textAlignOption,
} from './params';

const StyleBlock: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { schema, activeKey } = state;
  const { element } = findElementById(activeKey, schema);
  const { style, attribute } = element.data;

  return (
    <div className="setting-container">
      {/*<input type="color"/>*/}
      <div className="inline-block-item">
        <div className="label">文字内容</div>
        <div className="content">
          <Input placeholder="请输入" value={attribute.text} />
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">字体</div>
        <div className="content">
          <Select
            placeholder="请输入"
            className="fill"
            options={fontFamilyOptions}
            value={style.fontFamily}
          />
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">字号</div>
        <div className="content">
          <InputNumber
            placeholder="请输入"
            className="fill"
            value={style.fontSize}
          />
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">颜色</div>
        <div className="content">
          <input type="color" value={style.color} />
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">字体粗细</div>
        <div className="content">
          <Select
            placeholder="请输入"
            className="fill"
            options={fontWeightOptions}
            value={style.fontWeight}
          />
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">文本间距</div>
        <div className="content">
          <InputNumber
            placeholder="请输入"
            className="fill"
            value={style.letterSpacing}
          />
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">行高</div>
        <div className="content">
          <InputNumber
            placeholder="请输入"
            className="fill"
            value={style.lineHeight}
          />
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">背景颜色</div>
        <div className="content">
          <input type="color" value={style.backgroundColor} />
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">对齐方式</div>
        <div className="content">
          <Select
            placeholder="请输入"
            className="fill"
            options={textAlignOption}
            value={style.textAlign}
          />
        </div>
      </div>
    </div>
  );
};
export default StyleBlock;
