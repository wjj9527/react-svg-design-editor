import React from 'react';
import { Modal, Input, Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import './style.less';
const { Search } = Input;
const treeData: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    disabled: true,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
];
const NodalSelection: React.FC = () => {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  return (
    <Modal
      title="选择点位"
      okText="确认"
      cancelText="取消"
      width={640}
      open={true}
    >
      <div className="nodal-selection-content">
        <div className="search-handle">
          <Search placeholder="请输入关键字" enterButton />
        </div>
        <div className="nodal-tree-wrapper">
          <div className="inner">
            <Tree
              showLine
              checkedKeys={['0-0-0-1']}
              defaultExpandedKeys={['0-0-0']}
              onSelect={onSelect}
              treeData={treeData}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default NodalSelection;
