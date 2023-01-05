import PropTypes from 'prop-types';
import { ListGroup, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import KeyWordFinder from '../../features/query_builder/KeyWordFinder';

const BuilderSelection = ({ finder, setQuery }) => {
  const [selectedKw, setSelected] = useState('');

  const handleClick = (e) => {
    const selectedVal = e.target.getAttribute('data-val');
    setSelected(selectedVal);
    setQuery(selectedVal);
  };
  return (
    <ListGroup>
      {
    finder.getConnectedNames(selectedKw).map(
      (element) => (
        <ListGroup.Item>
          <Button
            size="small"
            onClick={handleClick}
            data-val={element}
          >
            {element}
          </Button>
        </ListGroup.Item>
      ),
    )
    }
    </ListGroup>
  );
};

BuilderSelection.propTypes = {
  finder: PropTypes.shape(KeyWordFinder).isRequired,
  setQuery: PropTypes.func.isRequired,
};
export default BuilderSelection;
