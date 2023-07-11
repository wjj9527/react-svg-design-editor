import React, { useContext, useEffect, useState } from 'react';
import { Modal, Input } from 'antd';
import TreeItem from './TreeItem';
import './style.less';
import { StoreContext } from '@/store';

const { Search } = Input;
interface NodalSelectionProps {
  multiple?: boolean;
  onClose?: () => void;
  visible: boolean;
  onConfirm?: (checkedOptions: any) => void;
}

const NodalSelection: React.FC<NodalSelectionProps> = ({
  visible = false,
  multiple = false,
  onClose = () => {},
  onConfirm = () => {},
}) => {
  const { state } = useContext(StoreContext);
  const { deviceList, deviceListRequestLoadingStatus } = state;
  const [checkedOptions, setCheckedOptions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const handleSelect = (group: any) => {
    if (!multiple) {
      // @ts-ignore
      setCheckedOptions([group]);
    } else {
      const targetIndex = checkedOptions.findIndex(
        (item: any) => item[2].id === group[2].id,
      );
      if (targetIndex > -1) {
        const options = [...checkedOptions];
        options.splice(targetIndex, 1);
        // @ts-ignore
        setCheckedOptions([...options]);
      } else {
        // @ts-ignore
        setCheckedOptions([...checkedOptions, group]);
      }
    }
  };
  const handleSearch = (text: string) => {
    setSearchText(text);
  };
  const handleClose = () => {
    setCheckedOptions([]);
    setSearchText('');
    onClose();
  };
  return (
    <Modal
      title="选择点位"
      okText="确认"
      cancelText="取消"
      destroyOnClose
      width={640}
      open={visible}
      onCancel={handleClose}
      onOk={onConfirm.bind(this, checkedOptions[0] || [])}
    >
      <div className="nodal-selection-content">
        <div className="search-handle">
          <Search
            placeholder="请输入关键字"
            allowClear
            enterButton
            onSearch={handleSearch}
          />
        </div>
        <div className="nodal-tree-wrapper">
          <div className="inner">
            {deviceList.map((groupItem: any) => {
              const { groupId, label, children } = groupItem;
              return (
                <TreeItem
                  key={groupId}
                  id={groupId}
                  label={label}
                  searchText={searchText}
                >
                  {children.map((deviceItem: any) => {
                    const { deviceId, label, children } = deviceItem;
                    return (
                      <TreeItem
                        key={deviceId}
                        label={label}
                        id={deviceId}
                        searchText={searchText}
                      >
                        {children.map((item: any) => {
                          const { id, label } = item;
                          return (
                            <TreeItem
                              searchText={searchText}
                              key={id}
                              id={id}
                              label={label}
                              selection={true}
                              multiple={multiple}
                              allChecked={checkedOptions}
                              group={[
                                { id: groupId, label: groupItem.label },
                                { id: deviceId, label: deviceItem.label },
                                { id, label },
                              ]}
                              onChange={handleSelect}
                            />
                          );
                        })}
                      </TreeItem>
                    );
                  })}
                </TreeItem>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default NodalSelection;
