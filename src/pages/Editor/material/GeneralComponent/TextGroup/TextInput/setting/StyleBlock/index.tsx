import React, { useContext } from 'react';
import PositionAndSizeSetting from '@/pages/Editor/components/PositionAndSizeSetting';
import { Input, InputNumber, Select } from 'antd';
import { StoreContext, TYPES } from '@/store';
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
  const setNodeAttribute = (
    val: string | number,
    module: string,
    key: string,
  ) => {
    let data: { [key: string]: string | number } = {};
    data[key] = val;
    dispatch({ type: TYPES.SET_ATTRIBUTE_BY_MODULE, value: { module, data } });
  };
  return (
    <div className="setting-container">
      <PositionAndSizeSetting />
      <div className="inline-block-item">
        <div className="label">文字内容</div>
        <div className="content">
          <Input
            placeholder="请输入"
            value={attribute.text}
            onInput={(e: any) =>
              setNodeAttribute(e.target.value, 'attribute', 'text')
            }
          />
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">字体</div>
        <div className="content">
          <Select
            placeholder="请输入"
            className="fill"
            onChange={(value) => setNodeAttribute(value, 'style', 'fontFamily')}
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
            onChange={(value) => setNodeAttribute(value, 'style', 'fontSize')}
            value={style.fontSize}
          />
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">颜色</div>
        <div className="content">
          <input
            type="color"
            value={style.color}
            onChange={(e) => setNodeAttribute(e.target.value, 'style', 'color')}
          />
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">字体粗细</div>
        <div className="content">
          <Select
            placeholder="请输入"
            className="fill"
            onChange={(value) => setNodeAttribute(value, 'style', 'fontWeight')}
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
            onChange={(value) =>
              setNodeAttribute(value, 'style', 'letterSpacing')
            }
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
            onChange={(value) => setNodeAttribute(value, 'style', 'lineHeight')}
            value={style.lineHeight}
          />
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">背景颜色</div>
        <div className="content">
          <input
            type="color"
            value={style.backgroundColor}
            onChange={(e) =>
              setNodeAttribute(e.target.value, 'style', 'backgroundColor')
            }
          />
        </div>
      </div>
      <div className="inline-block-item">
        <div className="label">对齐方式</div>
        <div className="content">
          <Select
            placeholder="请输入"
            className="fill"
            onChange={(value) => setNodeAttribute(value, 'style', 'textAlign')}
            options={textAlignOption}
            value={style.textAlign}
          />
        </div>
      </div>
    </div>
  );
};
export default StyleBlock;
