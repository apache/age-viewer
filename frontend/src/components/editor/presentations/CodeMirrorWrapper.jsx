/*
 * Copyright 2020 Bitnine Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {
  forwardRef, useImperativeHandle, useRef, useState,
} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/ambiance-mobile.css';
import PropTypes from 'prop-types';

const CodeMirrorWrapper = forwardRef((props, ref) => {
  const [commandHistoryIndex, setCommandHistoryIndex] = useState(props.commandHistory.length);
  const codeMirrorRef = useRef();

  useImperativeHandle(ref, () => ({
    resetReqString() {
      codeMirrorRef.current.editor.setValue('');
    },
  }));

  return (
    <CodeMirror
      id="editor"
      ref={codeMirrorRef}
      value={props.reqString}
      options={{
        keyMap: 'sublime',
        mode: 'cypher',
        tabSize: 4,
        lineNumbers: true,
        lineNumberFormatter: () => '$',
        extraKeys: {
          'Shift-Enter': (editor) => {
            props.onClick();
            editor.setValue('');
            setCommandHistoryIndex(-1);
          },
          'Ctrl-Enter': (editor) => {
            props.onClick();
            editor.setValue('');
            setCommandHistoryIndex(-1);
          },
          'Ctrl-Up': (editor) => {
            if (props.commandHistory.length === 0) {
              return;
            }
            if (commandHistoryIndex === -1) {
              const currentIdx = props.commandHistory.length - 1;
              editor.setValue(props.commandHistory[currentIdx]);
              setCommandHistoryIndex(currentIdx);
              return;
            }
            if (commandHistoryIndex === 0) {
              editor.setValue(props.commandHistory[0]);
              setCommandHistoryIndex(0);
              return;
            }

            editor.setValue(props.commandHistory[commandHistoryIndex - 1]);
            setCommandHistoryIndex(commandHistoryIndex - 1);
          },
          'Ctrl-Down': (editor) => {
            if (props.commandHistory.length === 0) {
              return;
            }
            if (commandHistoryIndex === -1) {
              editor.setValue('');
              return;
            }

            if (commandHistoryIndex === (props.commandHistory.length - 1)) {
              editor.setValue('');
              setCommandHistoryIndex(-1);
              return;
            }

            editor.setValue(props.commandHistory[commandHistoryIndex + 1]);
            setCommandHistoryIndex(commandHistoryIndex + 1);
          },
        },
      }}
      onChange={(editor) => {
        props.setReqString(editor.getValue());
        const lineCount = editor.lineCount();
        if (lineCount <= 1) {
          editor.setOption('lineNumberFormatter', () => '$');
        } else {
          editor.setOption('lineNumberFormatter', (number) => number);
        }
        if (lineCount <= 5) {
          editor.setSize(null, `${lineCount * 39}px`);
        } else {
          editor.setSize(null, '190px');
        }
        return true;
      }}
    />
  );
});

CodeMirrorWrapper.propTypes = {
  commandHistory: PropTypes.arrayOf(PropTypes.string).isRequired,
  setReqString: PropTypes.func.isRequired,
  reqString: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CodeMirrorWrapper;
