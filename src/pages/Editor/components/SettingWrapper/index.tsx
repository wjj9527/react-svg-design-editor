import React, { useEffect, useState } from 'react';
import './style.less';
type Config = {
  key: string;
  label: string;
  component: React.ReactNode;
};
interface SettingWrapperProps {
  config: Config[];
}
const SettingWrapper: React.FC<SettingWrapperProps> = ({ config }) => {
  const [activeMenuKey, setActiveMenuKey] = useState('');
  useEffect(() => {
    const [active] = config;
    const { key } = active;
    setActiveMenuKey(key);
  }, []);
  const RenderComponent = () => {
    //@ts-ignore
    const active = config.find((item) => item.key === activeMenuKey);
    const Component = active?.component;
    return Component ? Component : <></>;
  };
  //
  return (
    <div className="setting-wrapper">
      <div className="setting-menu">
        {config.map((item) => (
          <div
            className={`setting-menu-item ${
              activeMenuKey === item.key ? 'active' : ''
            }`}
            onClick={setActiveMenuKey.bind(this, item.key)}
            key={item.key}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div className="setting-content">{RenderComponent()}</div>
    </div>
  );
};

export default SettingWrapper;
