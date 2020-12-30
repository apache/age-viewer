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

import React, {}  from 'react';
import CodeMirror from '@uiw/react-codemirror'
import 'codemirror/keymap/sublime';
import 'codemirror/theme/ambiance-mobile.css';

const CodeMirrorWapper = ({ reqString, onClick, setReqString }) => {
    return (
        <CodeMirror id="test"
                    value={reqString}
                    options={{
                        keyMap: 'sublime',
                        mode: 'cypher',
                        tabSize: 4,
                        lineNumbers: true,
                        lineNumberFormatter: () => '$',
                        extraKeys: {
                            'Shift-Enter': (editor) => {
                                onClick()
                                editor.setValue('')
                            },
                            'Ctrl-Enter': (editor) => {
                                onClick()
                                editor.setValue('')
                            },
                        }
                    }}
                    onChange={(editor, change) => {
                        setReqString(editor.getValue());
                        editor.lineCount() <= 1 ? editor.setOption('lineNumberFormatter', (number) => '$') : editor.setOption('lineNumberFormatter', (number) => number)
                        editor.lineCount() <= 5 ? editor.setSize(null, (editor.lineCount() * 39) + 'px') : editor.setSize(null, '190px')
                    }}
                    />
    );
}



export default CodeMirrorWapper