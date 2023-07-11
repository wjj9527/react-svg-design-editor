import React, { useState } from 'react';
import { Radio, Checkbox } from 'antd';
import './style.less';
import classNames from 'classnames';
interface TreeItemProps {
  label: string;
  id: number | string;
  selection?: boolean;
  multiple?: boolean;
  group?: any;
  onChange?: (group: any) => void;
  allChecked?: any;
  searchText: string;
}
const TreeItem: React.FC<TreeItemProps> = ({
  label,
  id,
  children,
  selection,
  multiple,
  onChange,
  group,
  allChecked,
  searchText,
}) => {
  const [hidden, setHidden] = useState(false);
  const handleClick = () => {
    setHidden(!hidden);
    if (onChange) {
      onChange(group);
    }
  };
  const searchTextRender = () => {
    if (label.includes(searchText)) {
      let replaceLabel = `<span class="sign">${searchText}</span>`;
      return label.replaceAll(searchText, replaceLabel);
    } else {
      return label;
    }
  };
  return (
    <div className="tree-item">
      <div className="tree-item-label" onClick={handleClick}>
        {!selection ? (
          <i
            className={classNames(`iconfont icon-arrowdown`, {
              active: hidden,
            })}
          />
        ) : multiple ? (
          <Checkbox
            checked={
              allChecked.findIndex((item: any) => item[2].id === id) > -1
            }
          />
        ) : (
          <Radio
            checked={
              allChecked.findIndex((item: any) => item[2].id === id) > -1
            }
          />
        )}

        <div
          className="text"
          dangerouslySetInnerHTML={{ __html: searchTextRender() }}
        />
      </div>
      {!hidden && <div className="tree-item-content">{children}</div>}
    </div>
  );
};

export default TreeItem;
