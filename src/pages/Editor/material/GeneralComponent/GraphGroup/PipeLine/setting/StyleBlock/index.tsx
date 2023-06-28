import React, { useContext } from 'react';
import { InputNumber, Switch, Slider } from 'antd';
import { StoreContext, TYPES } from '@/store';
import { findElementById } from '@/utils/findElementById';
import TitleBlock from '@/pages/Editor/components/TitleBlock';

const StyleBlock: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { schema, activeKey } = state;
  const { element } = findElementById(activeKey, schema);
  const { line, animation, pipe, background } = element.data;
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
      <TitleBlock title="线条">
        <div className="inline-block-item">
          <div className="label">实线 / 虚线</div>
          <div className="content">
            <Switch checked={line.type !== 'solid'} />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">线条颜色</div>
          <div className="content">
            <input type="color" value={line.color} />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">线条透明度</div>
          <div className="content">
            <Slider defaultValue={30} />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">线宽</div>
          <div className="content">
            <InputNumber
              className="fill"
              placeholder="请输入"
              value={line.width}
            />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">虚线线长</div>
          <div className="content">
            <InputNumber
              className="fill"
              placeholder="请输入"
              value={line.dashedLength}
            />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">虚线间隔</div>
          <div className="content">
            <InputNumber
              className="fill"
              placeholder="请输入"
              value={line.dashedInterval}
            />
          </div>
        </div>
      </TitleBlock>
      <TitleBlock title="动画">
        <div className="inline-block-item">
          <div className="label">流动</div>
          <div className="content">
            <Switch checked={animation.flow} />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">流动速度</div>
          <div className="content">
            <InputNumber
              className="fill"
              placeholder="请输入"
              value={animation.flowVelocity}
            />
          </div>
        </div>
      </TitleBlock>
      <TitleBlock title="管道">
        <div className="inline-block-item">
          <div className="label">是否显示</div>
          <div className="content">
            <Switch checked={pipe.visible} />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">管道颜色</div>
          <div className="content">
            <input type="color" value={pipe.color} />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">管道透明度</div>
          <div className="content">
            <Slider defaultValue={30} />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">管道宽度</div>
          <div className="content">
            <InputNumber
              className="fill"
              placeholder="请输入"
              value={pipe.width}
            />
          </div>
        </div>
      </TitleBlock>
      <TitleBlock title="背景">
        <div className="inline-block-item">
          <div className="label">是否显示</div>
          <div className="content">
            <Switch />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">背景颜色</div>
          <div className="content">
            <input
              type="color"
              // value={style.color}
            />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">背景透明度</div>
          <div className="content">
            <Slider defaultValue={30} />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">背景宽度</div>
          <div className="content">
            <InputNumber className="fill" placeholder="请输入" />
          </div>
        </div>
      </TitleBlock>
    </div>
  );
};
export default StyleBlock;
