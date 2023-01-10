import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import PropTypes from 'prop-types';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/ambiance-mobile.css';

const BuilderInput = ({ value, handleChange }) => (
  <CodeMirror
    id="editor"
    value={value}
    options={{
      keyMap: 'sublime',
      mode: 'cypher',
      tabSize: 4,
      lineNumbers: true,
      spellcheck: false,
      autocorrect: false,
      autocapitalize: false,
      lineNumberFormatter: () => '$',
      extraKeys: {
        Enter: (editor) => {
          editor.replaceSelection('\n', 'end');
        },
      },
    }}
    onChange={(editor) => handleChange(editor.getValue())}
  />
);

BuilderInput.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default BuilderInput;
