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
import { ConfigProvider } from 'antd';
import { deviceParamsList } from '@/utils/http/device';
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
  //由于线上点位数据会比较多，因此在初始化的时候获取所有点位，最终由前端筛选
  const getAllDeviceParams = () => {
    dispatch({
      type: TYPES.SET_DEVICE_LIST_REQUEST_LOADING_STATUS,
      value: { status: true },
    });
    deviceParamsList()
      .then((res) => {
        const { data } = res;
        const value = data?.map((item: any) => {
          const { deviceGroupId, deviceGroupName, deviceInfoList } = item;
          return {
            groupId: deviceGroupId,
            label: deviceGroupName,
            type: 'group',
            children: deviceInfoList?.map((item: any) => {
              const { deviceId, deviceName, deviceParamValueList } = item;
              return {
                deviceId,
                label: deviceName,
                type: 'device',
                children: deviceParamValueList?.map((item: any) => {
                  const { devicePointConfigId, itemsName } = item;
                  return {
                    id: devicePointConfigId,
                    type: 'item',
                    label: itemsName,
                  };
                }),
              };
            }),
          };
        });
        dispatch({ type: TYPES.SET_DEVICE_LIST, value });
      })
      .finally(() => {
        dispatch({
          type: TYPES.SET_DEVICE_LIST_REQUEST_LOADING_STATUS,
          value: { status: false },
        });
      });
  };
  // console.log(theme)
  useEffect(() => {
    //批量添加键盘输入事件，随组件销毁
    // @ts-ignore
    window.addEventListener('keydown', handleKeyDown);
    // @ts-ignore
    window.addEventListener('keyup', handleKeyUp);
    getAllDeviceParams();
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
          colorBgElevated: 'rgb(31,45,56)',
          colorBgMask: 'rgba(0,0,0,0)',
        },
      }}
    >
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
