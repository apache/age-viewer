import React, { useState, useEffect } from 'react';
import {
  /* Form, */ Modal, Col, Button, Dropdown, InputGroup, Form, DropdownButton, Row, Spinner,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const generateNewNode = () => ({
  label: null,
  value: null,
  hasChild: false,
});

const InitLabel = ({
  showLB,
  setLBShow,
  showPR,
  setPRShow,
  graphName,
  graphs,
  setGlobalNodeList,
  setGraphName,
}) => {
  const [propertyElements, setPropertyElements] = useState([]);
  const [nodeList, setNodeList] = useState([
    generateNewNode(),
  ]);
  const [nodeElements, setNodeElements] = useState(null);
  const [currentInput, setCurrentInput] = useState(null);
  useEffect(() => {
    const getMetadata = async () => {
      const res = await fetch('/api/v1/db/meta',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ currentGraph: graphName }),
        });
      if (res.ok) {
        const ret = await res.json();
        setPropertyElements(ret[graphName].nodes);
      }
    };
    if (graphs.includes(graphName)) {
      getMetadata();
    }
  }, [graphs]);

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
      setLBShow(!showLB);
      setGlobalNodeList(nodeList);
    }
  };

  const onListAdd = (index) => {
    if (!nodeList[index].label) {
      document.getElementById(`input-${index}`).style.borderColor = 'red';
    } else {
      nodeList[index].hasChild = true;
      const newNodeList = [...nodeList];
      newNodeList.splice(index + 1, 0, generateNewNode());
      setNodeList(newNodeList);
      setCurrentInput(null);
      document.getElementById(`input-${index}`).style.borderColor = '#ced4da';
    }
  };

  const onListDelete = (index) => {
    if (index > 0) nodeList[index - 1].hasChild = false;
    const newNodeList = [...nodeList];
    newNodeList.splice(index, 1);
    setNodeList(newNodeList);
  };

  useEffect(() => {
    setNodeElements(
      nodeList.map((_, index) => (
        <InputGroup className="mb-3">
          <DropdownButton
            variant="outline-secondary"
            id="input-group-dropdown-1"
          >
            {propertyElements?.map((property) => {
              const curLabel = property.label;
              return (
                <Dropdown.Item
                  href="#"
                  onClick={() => {
                    nodeList[index].label = curLabel;
                    setNodeList(nodeList);
                    setCurrentInput(curLabel);
                  }}
                >
                  {curLabel}
                </Dropdown.Item>
              );
            })}
            <Dropdown.Item
              href="#"
              onClick={() => {
                nodeList[index].label = null;
                setNodeList(nodeList);
                setCurrentInput();
              }}
            >
              New Label
            </Dropdown.Item>
          </DropdownButton>
          <Form.Control
            aria-label="Text input with dropdown button"
            placeholder={nodeList[index].label}
            readOnly={nodeList[index].label}
            id={`input-${index}`}
            onChange={(event) => {
              nodeList[index].label = event.target.value;
              setNodeList(nodeList);
            }}
          />
          { !nodeList[index].hasChild ? (
            <Button style={{ marginLeft: '1rem' }} variant="info" onClick={() => onListAdd(index)}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          ) : null}
          {index > 0 && index === nodeList.length - 1 ? (
            <Button style={{ marginLeft: '1rem' }} onClick={() => onListDelete(index)}>
              <FontAwesomeIcon icon={faMinus} />
            </Button>
          ) : null}
        </InputGroup>
      )),
    );
  }, [nodeList, propertyElements, currentInput]);

  return (
    <div>
      { !nodeElements ? <Spinner animation="border" /> : (
        <>
          <Modal className="ModalContainer" show={showLB} onHide={() => { setLBShow(!showLB); setGraphName(); }}>
            <Modal.Header closeButton style={{ textAlign: 'center' }}>
              <Row id="headerRow" style={{ width: '100%' }}>
                <Modal.Title style={{ width: '100%' }}>Create labels</Modal.Title>
              </Row>
            </Modal.Header>
            <Modal.Body>
              <Col className="modalCol">
                {nodeElements}
              </Col>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  setLBShow(!showLB);
                  setGraphName();
                }}
                variant="secondary"
              >
                Close
              </Button>
              <Button onClick={() => checkCondition()} variant="success">
                Next
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) }
    </div>
  );
};

InitLabel.propTypes = {
  showLB: PropTypes.bool.isRequired,
  setLBShow: PropTypes.func.isRequired,
  showPR: PropTypes.bool.isRequired,
  setPRShow: PropTypes.func.isRequired,
  graphName: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  graphs: PropTypes.any.isRequired,
  setGlobalNodeList: PropTypes.func.isRequired,
  setGraphName: PropTypes.func.isRequired,
};

export default InitLabel;
