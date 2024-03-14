
//000000000000000000000
import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(() => {
    const savedData = localStorage.getItem('richTextEditorData');
    if (savedData) {
      return EditorState.createWithContent(convertFromRaw(JSON.parse(savedData)));
    } else {
      return EditorState.createEmpty();
    }
  });

  useEffect(() => {
    const saveData = () => {
      const contentState = editorState.getCurrentContent();
      const rawContentState = convertToRaw(contentState);
      localStorage.setItem('richTextEditorData', JSON.stringify(rawContentState));
    };

    saveData();
  }, [editorState]);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onStyleClick = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <div>
      <div>
        <button onClick={() => onStyleClick('BOLD')}>Bold</button>
        <button onClick={() => onStyleClick('ITALIC')}>Italic</button>
        <button onClick={() => onStyleClick('UNDERLINE')}>Underline</button>
        <button onClick={() => toggleBlockType('unordered-list-item')}>Bulleted List</button>
        <button onClick={() => toggleBlockType('ordered-list-item')}>Numbered List</button>
      </div>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={setEditorState}
      />
    </div>
  );
};

export default RichTextEditor;