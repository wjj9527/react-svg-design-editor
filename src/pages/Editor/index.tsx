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
const Editor: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
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
  useEffect(() => {
    //批量添加键盘输入事件，随组件销毁
    // @ts-ignore
    window.addEventListener('keydown', handleKeyDown);
    // @ts-ignore
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      // @ts-ignore
      window.removeEventListener('keydown', handleKeyDown);
      // @ts-ignore
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="editor-container page-root">
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
  );
};
export default () => {
  return (
    <Store>
      <Editor />
    </Store>
  );
};
