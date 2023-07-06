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

const StyleSetting: React.FC<any> = ({
  config,
  change = false,
  eventProps,
}) => {
  const { state } = useContext(StoreContext);
  const { schema, activeKey } = state;
  // const { element } = findElementById(activeKey, schema);
  const element = change
    ? eventProps
    : findElementById(activeKey, schema).element;
  console.log(element);
  const renderNodes = config.map((item: any) => {
    if (toString.call(item) === '[object Object]') {
      //@ts-ignore
      return (
        <TitleBlock title={item?.label} key={item.label}>
          {
            //@ts-ignore
            item.items.map((i) => {
              // @ts-ignore
              const Node = SettingItemBlock[i];
              return (
                <Node
                  element={element}
                  key={i}
                  change={change}
                  eventProps={eventProps}
                />
              );
            })
          }
        </TitleBlock>
      );
    } else {
      // @ts-ignore
      const Node = SettingItemBlock[item];
      return <Node element={element} key={item} change={change} />;
    }
  });
  return change ? (
    renderNodes
  ) : (
    <div className="setting-container">{renderNodes}</div>
  );
};
export default StyleSetting;
