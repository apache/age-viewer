import React, { useState } from 'react';
import {
  /* Form, */ Modal, Col, Button, Row, Form, InputGroup, Badge,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const InitProperty = ({
  showPR,
  setPRShow,
  showDone,
  setDoneShow,
  globalNodeList,
  setGlobalNodeList,
  setGraphName,
}) => {
  const [nodeList, setNodeList] = useState(globalNodeList);
  const checkCondition = () => {
    let emptyField = false;
    nodeList.forEach((node, index) => {
      if (!node.label) {
        emptyField = true;
        document.getElementById(`input-${index}`).style.borderColor = 'red';
      } else document.getElementById(`input-${index}`).style.borderColor = '#ced4da';
    });
    if (!emptyField) {
      setPRShow(!showPR);
      setDoneShow(!showDone);
      setGlobalNodeList(nodeList);
    }
  };

  return (
    <div>
      <Modal className="ModalContainer" show={showPR} onHide={() => { setPRShow(!showPR); setGraphName(); }}>
        <Modal.Header closeButton style={{ textAlign: 'center' }}>
          <Row id="headerRow" style={{ width: '100%' }}>
            <Modal.Title style={{ width: '100%' }}>Create Properties</Modal.Title>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <Col className="modalCol">
            <h5 style={{ marginBottom: '2rem', fontSize: '1rem' }}>
              The format of adding properties should be
              <Badge bg="secondary">name: &apos;Andres&apos;</Badge>
            </h5>
            {nodeList.map((node, index) => {
              const curIndex = index;
              return (
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon3">
                    {node.label}
                  </InputGroup.Text>
                  <Form.Control
                    id={`input-${curIndex}`}
                    aria-describedby="basic-addon3"
                    onChange={(event) => {
                      nodeList[index].value = event.target.value;
                      setNodeList(nodeList);
                    }}
                  />
                </InputGroup>
              );
            })}
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setPRShow(!showPR);
              setGraphName();
            }}
            variant="secondary"
          >
            Close
          </Button>
          <Button onClick={() => checkCondition()} variant="success">
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

InitProperty.propTypes = {
  showPR: PropTypes.bool.isRequired,
  setPRShow: PropTypes.func.isRequired,
  showDone: PropTypes.bool.isRequired,
  setDoneShow: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  globalNodeList: PropTypes.any.isRequired,
  setGlobalNodeList: PropTypes.func.isRequired,
  setGraphName: PropTypes.func.isRequired,
};

export default InitProperty;
