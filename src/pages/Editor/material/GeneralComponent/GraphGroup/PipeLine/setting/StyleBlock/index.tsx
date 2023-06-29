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
    val: string | number | boolean,
    module: string,
    key: string,
  ) => {
    let data: { [key: string]: string | number | boolean } = {};
    data[key] = val;
    dispatch({ type: TYPES.SET_ATTRIBUTE_BY_MODULE, value: { module, data } });
    if (key === 'width') {
      let stokeWidth = 0;
      const widthArr = [line.width, pipe.width, background.width];
      widthArr.forEach((w) => {
        if (w > stokeWidth) {
          stokeWidth = w;
        }
      });
      dispatch({ type: TYPES.SET_ATTRIBUTE_BY_MODULE, value: { stokeWidth } });
    }
  };
  return (
    <div className="setting-container">
      <TitleBlock title="线条">
        <div className="inline-block-item">
          <div className="label">实线 / 虚线</div>
          <div className="content">
            <Switch
              checked={line.type !== 'solid'}
              onChange={(v) =>
                v
                  ? setNodeAttribute('dashed', 'line', 'type')
                  : setNodeAttribute('solid', 'line', 'type')
              }
            />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">线条颜色</div>
          <div className="content">
            <input
              type="color"
              value={line.color}
              onChange={(e) =>
                setNodeAttribute(e.target.value, 'line', 'color')
              }
            />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">线条透明度</div>
          <div className="content">
            <Slider
              value={line.opacity * 100}
              onChange={(e) => setNodeAttribute(e / 100, 'line', 'opacity')}
            />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">线宽</div>
          <div className="content">
            <InputNumber
              className="fill"
              placeholder="请输入"
              value={line.width}
              onChange={(e) => setNodeAttribute(e, 'line', 'width')}
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
              onChange={(e) => setNodeAttribute(e, 'line', 'dashedLength')}
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
              onChange={(e) => setNodeAttribute(e, 'line', 'dashedInterval')}
            />
          </div>
        </div>
      </TitleBlock>
      <TitleBlock title="动画">
        <div className="inline-block-item">
          <div className="label">流动</div>
          <div className="content">
            <Switch
              checked={animation.flow}
              onChange={(e) => setNodeAttribute(e, 'animation', 'flow')}
            />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">流动速度</div>
          <div className="content">
            <InputNumber
              className="fill"
              placeholder="请输入"
              value={animation.flowVelocity}
              onChange={(e) => setNodeAttribute(e, 'animation', 'flowVelocity')}
            />
          </div>
        </div>
      </TitleBlock>
      <TitleBlock title="管道">
        <div className="inline-block-item">
          <div className="label">是否显示</div>
          <div className="content">
            <Switch
              checked={pipe.visible}
              onChange={(e) => setNodeAttribute(e, 'pipe', 'visible')}
            />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">管道颜色</div>
          <div className="content">
            <input
              type="color"
              value={pipe.color}
              onChange={(e) =>
                setNodeAttribute(e.target.value, 'pipe', 'color')
              }
            />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">管道透明度</div>
          <div className="content">
            <Slider
              value={pipe.opacity * 100}
              onChange={(e) => setNodeAttribute(e / 100, 'pipe', 'opacity')}
            />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">管道宽度</div>
          <div className="content">
            <InputNumber
              className="fill"
              placeholder="请输入"
              value={pipe.width}
              onChange={(e) => setNodeAttribute(e, 'pipe', 'width')}
            />
          </div>
        </div>
      </TitleBlock>
      <TitleBlock title="背景">
        <div className="inline-block-item">
          <div className="label">是否显示</div>
          <div className="content">
            <Switch
              checked={background.visible}
              onChange={(e) => setNodeAttribute(e, 'background', 'visible')}
            />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">背景颜色</div>
          <div className="content">
            <input
              type="color"
              value={background.color}
              onChange={(e) =>
                setNodeAttribute(e.target.value, 'background', 'color')
              }
            />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">背景透明度</div>
          <div className="content">
            <Slider
              defaultValue={background.opacity * 100}
              onChange={(e) =>
                setNodeAttribute(e / 100, 'background', 'opacity')
              }
            />
          </div>
        </div>
        <div className="inline-block-item">
          <div className="label">背景宽度</div>
          <div className="content">
            <InputNumber
              className="fill"
              placeholder="请输入"
              value={background.width}
              onChange={(e) => setNodeAttribute(e, 'background', 'width')}
            />
          </div>
        </div>
      </TitleBlock>
    </div>
  );
};
export default StyleBlock;
