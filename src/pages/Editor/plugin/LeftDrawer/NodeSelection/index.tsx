import React, { useContext, useState } from 'react';
import { StoreContext, TYPES } from '@/store';
import { Modal, Form, Input, message } from 'antd';
type Item = {
  icon: string;
  label: string;
  id: string;
  visible: boolean;
  lock: boolean;
};
interface SelectionItemProps {
  item: Item;
  update: ({ id, label }: { id: string; label: string }) => void;
}

interface SelectionMenuProps {
  icon: string;
  label: string;
  id: string;
  visible: boolean;
  lock: boolean;
  update: ({ id, label }: { id: string; label: string }) => void;
  itemNodes: Item[];
}
const SelectionItem: React.FC<SelectionItemProps> = ({ item, update }) => {
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
        <span
          className="text"
          onClick={update.bind(this, { id: item.id, label: item.label })}
        >
          {item.label}
        </span>
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
  update,
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
          <div className="text" onClick={update.bind(this, { id, label })}>
            {label}
          </div>
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
            <SelectionItem item={item} update={update} />
          ))}
        </div>
      )}
    </div>
  );
};
let updateId = '';
const NodeSelection: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [form] = Form.useForm();
  const nodes = state.schema.itemNodes;
  const [dialogVisible, setDialogVisible] = useState(false);
  const [updateLabel, setUpdateLabel] = useState('');
  const [messageApi, messageHolder] = message.useMessage();
  const showModal = ({ id, label }: { id: string; label: string }) => {
    updateId = id;
    setUpdateLabel(label);
    form.setFieldsValue({ label });
    setDialogVisible(true);
  };
  const updateNodeLabel = () => {
    form.validateFields().then((res) => {
      dispatch({
        type: TYPES.SET_NODE_LABEL,
        value: { id: updateId, label: res.label },
      });
      setDialogVisible(false);
      messageApi.success('操作成功');
    });
  };
  return (
    <div className="node-selection block-selection">
      <div className="block-title">图层</div>
      <div className="selection-content">
        {messageHolder}
        <Modal
          title="修改"
          open={dialogVisible}
          okText="确认"
          cancelText="取消"
          width={400}
          onCancel={setDialogVisible.bind(this, false)}
          onOk={updateNodeLabel}
        >
          <Form form={form}>
            <Form.Item
              label="节点名称"
              name="label"
              rules={[{ required: true, message: '请输入节点名称' }]}
            >
              <Input placeholder="请输入" value={updateLabel} />
            </Form.Item>
          </Form>
        </Modal>
        {nodes.map((item: any) => {
          if (item.type === 'BLOCK_GROUP') {
            return <SelectionMenu key={item.id} {...item} update={showModal} />;
          }
          return <SelectionItem key={item.id} item={item} update={showModal} />;
        })}
      </div>
    </div>
  );
};
export default NodeSelection;
