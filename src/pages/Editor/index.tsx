import React from "react";
import './style.less'
import EditorView from "@/pages/Editor/plugin/EditorView";
import HeaderBar from "@/pages/Editor/plugin/HeaderBar";
import { DndProvider,} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {Store, } from "@/store";
const Editor:React.FC=()=> {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="editor-container page-root">
        <HeaderBar/>
        <div className="content-view">
          <div className="left-drawer"></div>
          <div className="editor-view-container">
            <div className="editor-view-box">
              <EditorView/>
            </div>
            <div className="bottom-bar">

            </div>
          </div>
          <div className="right-drawer">

          </div>
        </div>
      </div>
    </DndProvider>
  );
}
export default ()=>{
  return <Store>
    <Editor/>
  </Store>
}
