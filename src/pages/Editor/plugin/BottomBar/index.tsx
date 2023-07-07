import React, { useContext, useEffect, useRef, useState } from 'react';
import { Checkbox, Slider } from 'antd';
import './style.less';
import { StoreContext, TYPES } from '@/store';
import classNames from 'classnames';

const BottomBar: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const {
    pageSelectionVisible,
    nodeSelectionVisible,
    rightDrawerVisible,
    canvasMoveStatus,
    schema,
  } = state;
  const barRef = useRef(null);
  const [barWidth, setBarWidth] = useState(0);
  const setInnerBarWidth = () => {
    if (barRef.current) {
      //@ts-ignore
      const wrapperBarWidth = barRef.current.clientWidth;
      const barWidth = rightDrawerVisible
        ? wrapperBarWidth - 480
        : wrapperBarWidth;
      setBarWidth(barWidth);
    }
  };
  useEffect(() => {
    setInnerBarWidth();
    window.addEventListener('resize', setInnerBarWidth);
    return () => {
      window.removeEventListener('resize', setInnerBarWidth);
    };
  }, [rightDrawerVisible]);
  return (
    <div className="bottom-bar" ref={barRef}>
      <div className="bar-inner" style={{ width: barWidth }}>
        <div className="check-group">
          <Checkbox
            checked={pageSelectionVisible}
            onChange={dispatch.bind(this, {
              type: TYPES.SET_PAGE_SELECTION_VISIBLE,
            })}
          >
            <span className="check-text">页面</span>
          </Checkbox>
          <Checkbox
            checked={nodeSelectionVisible}
            onChange={dispatch.bind(this, {
              type: TYPES.SET_NODE_SELECTION_VISIBLE,
            })}
          >
            <span className="check-text">图层</span>
          </Checkbox>
        </div>
        <div className="handle-group">
          <i
            className={classNames('iconfont icon-a-28Dshubiaojiantou', {
              active: !canvasMoveStatus,
            })}
            onClick={dispatch.bind(this, {
              type: TYPES.SET_CANVAS_MOVE_STATUS,
              value: { status: false },
            })}
          />
          <i
            className={classNames('iconfont icon-hand', {
              active: canvasMoveStatus,
            })}
            onClick={dispatch.bind(this, {
              type: TYPES.SET_CANVAS_MOVE_STATUS,
              value: { status: true },
            })}
          />
          <div className="slider-wrapper">
            <Slider
              value={schema.scale}
              onChange={(scale) => {
                dispatch({ type: TYPES.SET_CANVAS_SCALE, value: { scale } });
              }}
            />
          </div>
          <div className="number">{schema.scale}%</div>
        </div>
      </div>
    </div>
  );
};
export default BottomBar;
