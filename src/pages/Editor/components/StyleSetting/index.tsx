import React, { useContext } from 'react';
import { StoreContext } from '@/store';
import { findElementById } from '@/utils/findElementById';
import SettingItemBlock from '@/pages/Editor/components/SettingItemBlock';
import TitleBlock from '@/pages/Editor/components/TitleBlock';
// type ConfigItem = (keyof typeof SettingItemBlock | { label: string, items: (keyof typeof SettingItemBlock)[] })
// interface StyleSettingProps {
//   change?: boolean,
//   config: ConfigItem[]
// }

const StyleSetting: ({
  config,
  change,
}: {
  config: any;
  change?: any;
}) => JSX.Element[] | JSX.Element = ({ config, change = false }) => {
  const { state } = useContext(StoreContext);
  const { schema, activeKey } = state;
  const { element } = findElementById(activeKey, schema);
  const renderNodes = config.map((item: any) => {
    if (toString.call(item) === '[object Object]') {
      //@ts-ignore
      return (
        <TitleBlock title={item?.label}>
          {
            //@ts-ignore
            item.items.map((i) => {
              // @ts-ignore
              const Node = SettingItemBlock[i];
              return <Node element={element} />;
            })
          }
        </TitleBlock>
      );
    } else {
      // @ts-ignore
      const Node = SettingItemBlock[item];
      return <Node element={element} />;
    }
  });
  return change ? (
    renderNodes
  ) : (
    <div className="setting-container">{renderNodes}</div>
  );
};
export default StyleSetting;
