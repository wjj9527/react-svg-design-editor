import React, { useContext, useState } from 'react';
import { StoreContext, TYPES } from '@/store';
type Item = {
  icon: string;
  label: string;
  id: string;
  visible: boolean;
  lock: boolean;
};
interface SelectionItemProps {
  item: Item;
}

interface SelectionMenuProps {
  icon: string;
  label: string;
  id: string;
  visible: boolean;
  lock: boolean;
  itemNodes: Item[];
}
const SelectionItem: React.FC<SelectionItemProps> = ({ item }) => {
  const { state, dispatch } = useContext(StoreContext);
  const { activeKey } = state;
  const lockHandler = dispatch.bind(this, {
    type: TYPES.SET_NODE_LOCK,
    value: { id: item.id },
  });
  const visibleHandler = dispatch.bind(this, {
    type: TYPES.SET_NODE_VISIBLE,
    value: { id: item.id },
  });
  return (
    <div
      className={`selection-item ${activeKey === item.id ? 'active' : ''}`}
      onClick={dispatch.bind(this, {
        type: TYPES.SET_ACTIVE_KEY,
        value: { id: item.id },
      })}
    >
      <div className="name-group">
        <i className={`iconfont ${item.icon}`} />
        <span className="text">{item.label}</span>
      </div>
      <div className="btn-group">
        {!item.lock ? (
          <i className="iconfont icon-lock sa" onClick={lockHandler} />
        ) : (
          <i className="iconfont icon-unlock sa" onClick={lockHandler} />
        )}
        {!item.visible ? (
          <i className="iconfont icon-bukejian1" onClick={visibleHandler} />
        ) : (
          <i className="iconfont icon-kejian1" onClick={visibleHandler} />
        )}
      </div>
    </div>
  );
};
const SelectionMenu: React.FC<SelectionMenuProps> = ({
  label,
  id,
  lock,
  visible,
  itemNodes,
}) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const { dispatch } = useContext(StoreContext);
  const lockHandler = dispatch.bind(this, {
    type: TYPES.SET_NODE_LOCK,
    value: { id },
  });
  const visibleHandler = dispatch.bind(this, {
    type: TYPES.SET_NODE_VISIBLE,
    value: { id },
  });
  return (
    <div className="selection-menu">
      <div
        className="selection-menu-text"
        onClick={setOptionsVisible.bind(this, !optionsVisible)}
      >
        <div className="name-group">
          <i
            className={`iconfont arrow icon-arrow-sortdown-smal ${
              optionsVisible ? '' : 'hidden'
            } `}
          />
          <i className="iconfont icon-wenjianjia" />
          <div className="text">{label}</div>
        </div>
        <div className="btn-group">
          {!lock ? (
            <i className="iconfont icon-lock sa" onClick={lockHandler} />
          ) : (
            <i className="iconfont icon-unlock sa" onClick={lockHandler} />
          )}
          {!visible ? (
            <i className="iconfont icon-bukejian1" onClick={visibleHandler} />
          ) : (
            <i className="iconfont icon-kejian1" onClick={visibleHandler} />
          )}
        </div>
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
  const { state } = useContext(StoreContext);
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
