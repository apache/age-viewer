import React from 'react';
import PropTypes from 'prop-types';

const StyleTextRight = {
  marginBottom: '10px', textAlign: 'right', fontSize: '13px', fontWeight: 'bold',
};
const StyleTextLeft = { fontSize: '13px', fontWeight: 'bold' };

export const ColoredLine = () => (
  <hr
    style={{
      color: '#B0B0B0',
      backgroundColor: '#B0B0B0',
      marginTop: 0,
      height: 0.3,
    }}
  />
);

const SubLabelRight = ({ label, classes }) => (
  <div className={classes} style={StyleTextRight}>{label}</div>
);
SubLabelRight.propTypes = {
  classes: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const SubLabelLeft = ({ label, classes }) => (
  <div className={classes} style={StyleTextLeft}>{label}</div>
);
SubLabelLeft.propTypes = {
  classes: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const SubLabelLeftWithLink = ({ label, classes }) => (
  <div className={classes} style={StyleTextLeft}><pre>{label}</pre></div>
);
SubLabelLeftWithLink.propTypes = {
  classes: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export { SubLabelRight, SubLabelLeft, SubLabelLeftWithLink };
