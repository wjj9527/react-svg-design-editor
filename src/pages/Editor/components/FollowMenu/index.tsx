import React, { useContext, useEffect, useRef, useState } from 'react';
import './style.less';
import { message } from 'antd';
import { StoreContext, TYPES } from '@/store';

const FollowMenu: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { activeKey, followMenuConfig } = state;
  const { visible, x, y, id, type, isGroup } = followMenuConfig;
  const [messageApi, messageHolder] = message.useMessage();
  const menuRef = useRef(null);
  const [pointX, setPointX] = useState(-200);
  const [pointY, setPointY] = useState(-500);
  //操作完成隐藏弹窗
  const hiddenFollowMenu = () => {
    dispatch({
      type: TYPES.SET_FOLLOW_MENU_CONFIG,
      value: { visible: false, x: 0, y: 0 },
    });
  };
  //成组，取消成组操作
  const elementGroupConfigSetting = () => {
    dispatch({ type: TYPES.SET_GROUP_BLOCK, value: { id } });
    messageApi.success('操作成功');
    hiddenFollowMenu();
  };
  const elementDeleteHandle = () => {
    dispatch({ type: TYPES.DELETE_NODE_BY_ID });
    messageApi.success('删除成功');
    hiddenFollowMenu();
  };
  //元素复制操作
  const elementCopyHandle = () => {
    dispatch({ type: TYPES.SET_COPY_NODE_CACHE, value: { id: activeKey } });
    messageApi.success('复制成功');
    hiddenFollowMenu();
  };
  //元素位置变化
  const elementIndexChange = (
    actionType: 'moveUp' | 'moveDown' | 'top' | 'bottom',
  ) => {
    dispatch({ type: TYPES.ELEMENT_INDEX_CHANGE, value: { actionType } });
    hiddenFollowMenu();
  };
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
    } else {
      setPointX(-200);
      setPointY(-500);
    }
  }, [visible]);
  return (
    <div
      className="follow-menu"
      style={{ left: pointX, top: pointY, display: visible ? 'block' : 'none' }}
      ref={menuRef}
    >
      {messageHolder}
      <div className="group">
        <div
          className="menu-group-item"
          onClick={elementIndexChange.bind(this, 'top')}
        >
          置顶
        </div>
        <div
          className="menu-group-item"
          onClick={elementIndexChange.bind(this, 'bottom')}
        >
          置底
        </div>
        <div
          className="menu-group-item"
          onClick={elementIndexChange.bind(this, 'moveUp')}
        >
          上移一层
        </div>
        <div
          className="menu-group-item"
          onClick={elementIndexChange.bind(this, 'moveDown')}
        >
          下移一层
        </div>
      </div>
      <div className="group">
        <div className="menu-group-item">锁定</div>
        <div className="menu-group-item" onClick={elementCopyHandle}>
          拷贝
        </div>
        <div className="menu-group-item" onClick={elementDeleteHandle}>
          删除
        </div>
        {/*{type}*/}
        {type === 'BlockGroup' && (
          <div className="menu-group-item" onClick={elementGroupConfigSetting}>
            {!isGroup ? '成组' : '取消成组'}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowMenu;
