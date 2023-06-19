import React from "react";
import {useDrag} from "react-dnd";
interface ElementItemProps{
  title:string,
  type:string
  icon:React.ReactElement
}
const ElementItem:React.FC<ElementItemProps>=({title,type,icon})=>{
  const [{}, drag] = useDrag({
    type: 'ELEMENT',
    item: { type },
    collect: (monitor: { isDragging: () => any; }) => ({

    }),
  });
  return <div className="element-item" ref={drag}>
    <div className="icon-content">
      {icon}
    </div>
    <div className="item-text">
      {title}
    </div>
  </div>
}

export default ElementItem
