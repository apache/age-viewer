import { Drawer, Space } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BuilderSelection from './BuilderSelection';
import KeyWordFinder from '../../features/query_builder/KeyWordFinder';
import CodeMirror from '../editor/containers/CodeMirrorWapperContainer';

const BuilderContainer = ({ open, setOpen, finder }) => {
  const [query, setQuery] = useState('');

  const handleSetQuery = (word) => {
    const fullQuery = query !== '' ? `${query}\n ${word}` : word;
    setQuery(fullQuery);
  };
  return (
    <Drawer
      title="Query Generator"
      open={open}
      onClose={() => setOpen(!open)}
      placement="left"
    >
      <Space />
      <CodeMirror onChange={setQuery} value={query} />
      <Space />
      <div>
        <BuilderSelection finder={finder} setQuery={handleSetQuery} />
      </div>
    </Drawer>
  );
};
BuilderContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  finder: PropTypes.shape(KeyWordFinder).isRequired,
};
export default BuilderContainer;
