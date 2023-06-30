import React, { useContext, useEffect } from 'react';
import './style.less';
import EditorView from '@/pages/Editor/plugin/EditorView';
import HeaderBar from '@/pages/Editor/plugin/HeaderBar';
import LeftDrawer from '@/pages/Editor/plugin/LeftDrawer';
import BottomBar from '@/pages/Editor/plugin/BottomBar';
import RightDrawer from '@/pages/Editor/plugin/RightDrawer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Store, StoreContext, TYPES } from '@/store';
import { ConfigProvider, Modal, theme } from 'antd';

const Editor: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [modal, contextHolder] = Modal.useModal();
  const confirm = () => {
    modal.confirm({
      title: '提示',
      content: '是否删除',
      okText: '确认',
      cancelText: '取消',
    });
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey && !state.isKeydownCtrlKey) {
      dispatch({
        type: TYPES.SET_IS_KEYDOWN_CTRL_KEY_STATUS,
        value: { status: true },
      });
    }
  };
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!event.ctrlKey && event.key === 'Control') {
      dispatch({
        type: TYPES.SET_IS_KEYDOWN_CTRL_KEY_STATUS,
        value: { status: false },
      });
    }
  };

  // console.log(theme)
  useEffect(() => {
    //批量添加键盘输入事件，随组件销毁
    // @ts-ignore
    window.addEventListener('keydown', handleKeyDown);
    // @ts-ignore
    window.addEventListener('keyup', handleKeyUp);
    confirm();
    return () => {
      // @ts-ignore
      window.removeEventListener('keydown', handleKeyDown);
      // @ts-ignore
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimaryBg: 'rgba(18,28,36,.45)',
          colorBgContainer: 'rgb(18,28,36,.45)',
          colorText: 'rgba(255, 255, 255, 0.88)',
          colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
          colorTextTertiary: 'rgba(255,255,255,0.45)',
          colorTextQuaternary: 'rgba(255, 255, 255, 0.25)',
          colorFill: 'rgba(255,255,255,0.15)',
          colorFillSecondary: 'rgba(255,255,255,0.06)',
          colorFillTertiary: 'rgba(255,255,255,0.04)',
          colorFillQuaternary: 'rgba(255,255,255,0.02)',
          colorBgElevated: 'rgba(18,28,36,1)',
          colorBgMask: 'rgba(0,0,0,0)',
        },
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <div className="editor-container page-root">
          {contextHolder}
          <HeaderBar />
          <div className="content-view">
            <LeftDrawer />
            <div className="editor-view-container">
              <div className="editor-view-box">
                <EditorView />
              </div>
              <BottomBar />
            </div>
            <RightDrawer />
          </div>
        </div>
      </DndProvider>
    </ConfigProvider>
  );
};
export default () => {
  return (
    <Store>
      <Editor />
    </Store>
  );
};
