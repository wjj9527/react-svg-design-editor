import React from 'react';
import './style.less';
interface Props {
  title: string;
}
const TitleBlock: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="title-block">
      <div className="title-text">{title}</div>
      <div className="title-block-content">{children}</div>
    </div>
  );
};

export default TitleBlock;
