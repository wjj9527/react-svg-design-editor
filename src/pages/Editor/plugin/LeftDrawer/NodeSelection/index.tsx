import React, { useContext, useState } from 'react';
import { StoreContext, TYPES } from '@/store';
type Item = {
  icon: string;
  label: string;
  id: string;
};
interface SelectionItemProps {
  item: Item;
}

interface SelectionMenuProps {
  icon: string;
  label: string;
  id: string;
  itemNodes: Item[];
}
const SelectionItem: React.FC<SelectionItemProps> = ({ item }) => {
  const { state, dispatch } = useContext(StoreContext);
  const { activeKey } = state;
  return (
    <div
      className={`selection-item ${activeKey === item.id ? 'active' : ''}`}
      onClick={dispatch.bind(this, {
        type: TYPES.SET_ACTIVE_KEY,
        value: { id: item.id },
      })}
    >
      <i className={`iconfont ${item.icon}`} />
      <span className="text">{item.label}</span>
    </div>
  );
};
const SelectionMenu: React.FC<SelectionMenuProps> = ({
  icon,
  label,
  id,
  itemNodes,
}) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  return (
    <div className="selection-menu">
      <div
        className="selection-menu-text"
        onClick={setOptionsVisible.bind(this, !optionsVisible)}
      >
        <i
          className={`iconfont arrow icon-arrow-sortdown-smal ${
            optionsVisible ? '' : 'hidden'
          } `}
        />
        <i className="iconfont icon-wenjianjia" />
        <div className="text">{label}</div>
      </div>
      {optionsVisible && (
        <div className="selection-menu-content">
          {itemNodes.map((item) => (
            <SelectionItem item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

const NodeSelection: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const nodes = state.schema.itemNodes;
  return (
    <div className="node-selection block-selection">
      <div className="block-title">图层</div>
      <div className="selection-content">
        {nodes.map((item: any) => {
          if (item.type === 'BLOCK_GROUP') {
            return <SelectionMenu key={item.id} {...item} />;
          }
          return <SelectionItem key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};
export default NodeSelection;
