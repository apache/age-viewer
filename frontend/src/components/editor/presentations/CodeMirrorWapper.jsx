import React, {useState}  from 'react';
import CodeMirror from '@uiw/react-codemirror'
import 'codemirror/keymap/sublime';
import 'codemirror/theme/ambiance-mobile.css';

const CodeMirrorWapper = ({ reqString, onClick, setReqString, commandHistroy}) => {
    const [commandHistoryIndex, setCommandHistoryIndex] = useState(commandHistroy.length)
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
                                setCommandHistoryIndex(-1)
                            },
                            'Ctrl-Enter': (editor) => {
                                onClick()
                                editor.setValue('')
                                setCommandHistoryIndex(-1)
                            },
                            'Ctrl-Up': (editor) => {    
                                if (commandHistroy.length === 0) {
                                    return
                                }                
                                else if (commandHistoryIndex === -1) {
                                    const currentIdx = commandHistroy.length -1
                                    editor.setValue(commandHistroy[currentIdx])
                                    setCommandHistoryIndex(currentIdx)
                                    return
                                } 
                                else if (commandHistoryIndex === 0){
                                    editor.setValue(commandHistroy[0])
                                    setCommandHistoryIndex(0)
                                    return
                                }
                                
                                editor.setValue(commandHistroy[commandHistoryIndex -1])
                                setCommandHistoryIndex(commandHistoryIndex -1)
                            },
                            'Ctrl-Down': (editor) => {                             
                                if (commandHistroy.length === 0) {
                                    return
                                }                
                                else if (commandHistoryIndex === -1) {
                                    editor.setValue('')
                                    return
                                } 

                                else if (commandHistoryIndex === (commandHistroy.length -1)) {
                                    editor.setValue('')
                                    setCommandHistoryIndex(-1)
                                    return
                                }

                                editor.setValue(commandHistroy[commandHistoryIndex +1])
                                setCommandHistoryIndex(commandHistoryIndex +1)
                            }
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