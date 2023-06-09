import React from "react";
import './style.less'
import EditorView from "@/pages/Editor/plugin/EditorView";
import { DndProvider,} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {Store, } from "@/store";
const Editor:React.FC=()=> {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="editor-container page-root">
        <EditorView/>
      </div>
    </DndProvider>
  );
}
export default ()=>{
  return <Store>
    <Editor/>
  </Store>
}
