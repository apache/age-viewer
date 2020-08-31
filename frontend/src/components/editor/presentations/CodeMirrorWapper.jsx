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