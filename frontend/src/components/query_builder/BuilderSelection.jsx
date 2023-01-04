import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import React from 'react';

const BuilderSelection = ({ queryOptions }) => (
  <ListGroup>
    {queryOptions.kw.filter((element) => <ListGroup.Item>{element}</ListGroup.Item>)}
  </ListGroup>
);

BuilderSelection.propTypes = {
  queryOptions: PropTypes.shape({
    kw: PropTypes.objectOf.isRequired,
    relationships: PropTypes.objectOf.isRequired,
  }).isRequired,
};
export default BuilderSelection;
