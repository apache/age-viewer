import React from 'react';
import PropTypes from 'prop-types';
import Frame from '../frame/Frame';

const CSV = ({
  reqString, refKey,
}) => (
  <Frame
    reqString={reqString}
    refKey={refKey}
  >
    <div />
  </Frame>
);

CSV.propTypes = {
  reqString: PropTypes.string.isRequired,
  refKey: PropTypes.string.isRequired,

};

export default CSV;
