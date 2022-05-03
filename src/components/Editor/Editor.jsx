import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './editor.css';


const TextEditor=({onEditorStateChange})=> {
  const [editorState, setEditorState]= useState( EditorState.createEmpty())
  const handleChange=(newState) => {
    onEditorStateChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    setEditorState(newState)
  }
  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

 
    return (
      <>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={handleChange}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        ></textarea>

        <div dangerouslySetInnerHTML={{__html: `${draftToHtml(convertToRaw(editorState.getCurrentContent()))}`}}/> */}
      </>
    );
  }

export default TextEditor