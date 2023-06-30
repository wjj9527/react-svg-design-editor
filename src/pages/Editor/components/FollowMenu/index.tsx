import React, { useContext, useEffect, useRef, useState } from 'react';
import './style.less';
import { StoreContext } from '@/store';

const FollowMenu: React.FC = () => {
  const { state } = useContext(StoreContext);
  const { visible, x, y } = state.followMenuConfig;
  const menuRef = useRef(null);
  const [pointX, setPointX] = useState(0);
  const [pointY, setPointY] = useState(0);
  useEffect(() => {
    if (visible) {
      if (menuRef.current) {
        const { clientHeight, clientWidth } = menuRef.current;
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;
        setPointX(
          clientWidth + parseInt(x) < screenWidth
            ? x
            : screenWidth - clientWidth,
        );
        setPointY(
          clientHeight + parseInt(y) < screenHeight
            ? y
            : screenHeight - clientHeight,
        );
      }
    }
  }, [visible]);
  return visible ? (
    <div
      className="follow-menu"
      style={{ left: pointX, top: pointY }}
      ref={menuRef}
    >
      <div className="group">
        <div className="menu-group-item">置顶</div>
        <div className="menu-group-item">置底</div>
        <div className="menu-group-item">上移一层</div>
        <div className="menu-group-item">下移一层</div>
      </div>
      <div className="group">
        <div className="menu-group-item">锁定</div>
        <div className="menu-group-item">拷贝</div>
        <div className="menu-group-item">删除</div>
        <div className="menu-group-item">成组</div>
        <div className="menu-group-item">取消成组</div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default FollowMenu;
