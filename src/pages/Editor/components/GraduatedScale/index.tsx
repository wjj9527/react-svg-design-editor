import React, { useContext, useEffect, useRef, useState } from 'react';
import './style.less';
import { StoreContext, TYPES } from '@/store';
interface ScaleProps {
  index: number;
}
let pageResize: any = null;
const ScaleX: React.FC<ScaleProps> = ({ index }) => {
  return (
    <div className="scale-x">
      <div className="scale-text">{index * 50 + 50}</div>
      <div className="scale-5px" />
      <div className="scale-5px h" />
      <div className="scale-5px" />
      <div className="scale-5px h" />
      <div className="scale-5px" />
      <div className="scale-5px h" />
      <div className="scale-5px" />
      <div className="scale-5px h" />
      <div className="scale-5px" />
      <div className="scale-5px mh" />
      {/*<div className="scale-hover-text">0</div>*/}
    </div>
  );
};

const ScaleY: React.FC<ScaleProps> = ({ index }) => {
  return (
    <div className="scale-y">
      <div className="scale-text">{index * 50 + 50}</div>
      <div className="scale-5px" />
      <div className="scale-5px h" />
      <div className="scale-5px" />
      <div className="scale-5px h" />
      <div className="scale-5px" />
      <div className="scale-5px h" />
      <div className="scale-5px" />
      <div className="scale-5px h" />
      <div className="scale-5px" />
      <div className="scale-5px mh" />
    </div>
  );
};

const GraduatedScale: React.FC = ({ children }) => {
  const scaleXBarRef = useRef(null);
  const scaleYBarRef = useRef(null);
  const [scaleXSize, setScaleXSize] = useState([]);
  const [scaleYSize, setScaleYSize] = useState([]);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const { state, dispatch } = useContext(StoreContext);
  const {
    scalePosition,
    scaleHoverLine,
    scaleVisible,
    pageSelectionVisible,
    nodeSelectionVisible,
  } = state;
  const scaleSizeSetting = () => {
    const scaleX = scaleXBarRef.current;
    const scaleY = scaleYBarRef.current;
    if (scaleX) {
      const { clientWidth } = scaleX;
      const size = parseInt(String(clientWidth / 50 + 1));
      // @ts-ignore
      setScaleXSize([...Array(size).keys()]);
      // @ts-ignore
      //当前x偏移量
      setOffsetX(scaleX.getBoundingClientRect().x);
    }
    if (scaleY) {
      const { clientHeight } = scaleY;
      const size = parseInt(String(clientHeight / 50 + 1));
      // @ts-ignore
      setScaleYSize([...Array(size).keys()]);
      // @ts-ignore
      //当前y偏移量
      setOffsetY(scaleY.getBoundingClientRect().y);
    }
  };
  //x鼠标移入
  const handleScaleXBarMouseMove = (e: React.MouseEvent) => {
    const { clientX } = e;
    dispatch({
      type: TYPES.SET_SCALE_HOVER_LINE,
      value: { xShow: true, x: clientX - offsetX },
    });
  };
  //x鼠标离开
  const handleScaleXBarMouseLeave = () => {
    dispatch({ type: TYPES.SET_SCALE_HOVER_LINE, value: { xShow: false } });
  };
  //x鼠标移入
  const handleScaleYBarMouseMove = (e: React.MouseEvent) => {
    const { clientY } = e;
    dispatch({
      type: TYPES.SET_SCALE_HOVER_LINE,
      value: { yShow: true, y: clientY - offsetY },
    });
  };
  //y鼠标离开
  const handleScaleYBarMouseLeave = () => {
    dispatch({ type: TYPES.SET_SCALE_HOVER_LINE, value: { yShow: false } });
  };
  const handleScaleXBarClick = () => {
    dispatch({
      type: TYPES.SET_SCALE_POSITION,
      value: { scale: 'x', position: scaleHoverLine.x },
    });
  };
  const handleScaleYBarClick = () => {
    dispatch({
      type: TYPES.SET_SCALE_POSITION,
      value: { scale: 'y', position: scaleHoverLine.y },
    });
  };
  useEffect(() => {
    scaleSizeSetting();
    if (!pageResize) {
      pageResize = window.addEventListener('resize', scaleSizeSetting);
    }
    return () => {
      window.removeEventListener('resize', scaleSizeSetting);
      pageResize = null;
    };
  }, [pageSelectionVisible, nodeSelectionVisible]);
  return (
    <div className="graduated-scale">
      <div className="horizontal">
        <div
          className="visible-btn"
          onClick={dispatch.bind(this, { type: TYPES.SET_SCALE_VISIBLE })}
        >
          {scaleVisible ? (
            <i className="iconfont icon-bukejian" />
          ) : (
            <i className="iconfont icon-kejian" />
          )}
        </div>
        {scaleVisible && (
          <div
            className="horizontal-scale"
            ref={scaleXBarRef}
            onMouseMove={handleScaleXBarMouseMove}
            onMouseLeave={handleScaleXBarMouseLeave}
            onClick={handleScaleXBarClick}
          >
            <div className="scale-x-container">
              {scaleXSize.map((_) => (
                <ScaleX key={_} index={_} />
              ))}
              <div
                className="line"
                style={{ left: scaleHoverLine.x - 1 || 0 }}
              />
              <div
                className="scale-hover-text"
                style={{ left: scaleHoverLine.x + 4 || 0 }}
              >
                {parseInt(scaleHoverLine.x)}
              </div>
              {scalePosition.x.map((item: number) => (
                <div
                  className="sign-line"
                  key={item}
                  style={{ left: item - 1 || 0 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="vertical">
        <div
          className="vertical-scale"
          ref={scaleYBarRef}
          onMouseMove={handleScaleYBarMouseMove}
          onMouseLeave={handleScaleYBarMouseLeave}
          onClick={handleScaleYBarClick}
        >
          {scaleVisible && (
            <div className="scale-y-container">
              {scaleYSize.map((_) => (
                <ScaleY key={_} index={_} />
              ))}
              <div
                className="line"
                style={{ top: scaleHoverLine.y - 1 || 0 }}
              />
              <div
                className="scale-hover-text"
                style={{ top: scaleHoverLine.y + 15 || 0 }}
              >
                {parseInt(scaleHoverLine.y)}
              </div>
              {scalePosition.y.map((item: number) => (
                <div
                  className="sign-line"
                  key={item}
                  style={{ top: item - 1 || 0 }}
                />
              ))}
            </div>
          )}
        </div>
        <div className="view-container">{children}</div>
      </div>
    </div>
  );
};

export default GraduatedScale;
