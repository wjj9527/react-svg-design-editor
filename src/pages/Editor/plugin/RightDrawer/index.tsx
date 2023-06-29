import React, { useContext } from 'react';
import './style.less';
import { StoreContext } from '@/store';
import { findElementById } from '@/utils/findElementById';
import { elementSetting } from '@/pages/Editor/material';

const RightDrawer: React.FC = () => {
  const { state } = useContext(StoreContext);
  const { rightDrawerVisible, schema, activeKey } = state;
  const getActiveElementSource = () => {
    const { element } = findElementById(activeKey, schema);
    const { type } = element;
    // @ts-ignore
    return elementSetting[type];
  };
  const renderElement = (
    <div className="right-drawer">{getActiveElementSource()}</div>
  );
  return rightDrawerVisible ? renderElement : <></>;
};

export default RightDrawer;
