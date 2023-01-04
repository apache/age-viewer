import { Drawer, Space } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from 'antd/lib/input/Input';
import BuilderSelection from './BuilderSelection';

const BuilderContainer = ({ open, setOpen, queryOptions }) => {
  // eslint-disable-next-line no-unused-vars
  const [query, setQuery] = useState(0);
  return (
    <Drawer
      title="Query Generator"
      open={open}
      onClose={() => setOpen(!open)}
      placement="left"
    >
      <Space />
      <Input placeholder="query" />
      <Space />
      <div>
        <BuilderSelection queryOptions={queryOptions} />
      </div>
    </Drawer>
  );
};
BuilderContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  queryOptions: PropTypes.shape({
    kw: PropTypes.objectOf.isRequired,
    relationships: PropTypes.objectOf.isRequired,
  }).isRequired,
};
export default BuilderContainer;
