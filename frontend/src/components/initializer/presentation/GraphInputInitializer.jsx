import React, { useState, useRef } from 'react';
import {
  /* Form, */ Modal, Col, Button, Dropdown, InputGroup, Form, DropdownButton, Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import InitLabel from './LabelInitializer';
import InitProperty from './PropertyInitializer';
import InitNode from './NodeInitializer';

const generateGlobalNewNode = () => ({
  label: null,
  value: null,
  hasChild: false,
});

const InitInputGraphModal = ({ show, setShow, graphs }) => {
  const [graphName, setGraphName] = useState();
  const [showLB, setLBShow] = useState(false);
  const [showPR, setPRShow] = useState(false);
  const [showDone, setDoneShow] = useState(false);
  const [globalNodeList, setGlobalNodeList] = useState([
    generateGlobalNewNode(),
  ]);
  const graphInput = useRef();
  const checkCondition = () => {
    if (graphName) {
      setLBShow(!showLB);
      setShow(!show);
      graphInput.current.value = '';
    } else if (graphInput.current.value) {
      setGraphName(graphInput.current.value);
      setLBShow(!showLB);
      setShow(!show);
      graphInput.current.value = '';
    } else {
      alert('Graph name should not be empty.');
    }
  };

  return (
    <div>
      <Modal className="ModalContainer" show={show} onHide={() => setShow(!show)}>
        <Modal.Header closeButton style={{ textAlign: 'center' }}>
          <Row id="headerRow" style={{ width: '100%' }}>
            <Modal.Title style={{ width: '100%' }}>Create a Graph Name</Modal.Title>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <Col className="modalCol">
            <InputGroup className="mb-3">
              <DropdownButton
                variant="outline-secondary"
                title={!graphName ? 'New Graph' : graphName}
                id="input-group-dropdown-1"
              >
                <Dropdown.Item href="#" onClick={() => setGraphName()}>New Graph</Dropdown.Item>
                {graphs?.map((graph) => {
                  const curGraph = graph;
                  return (
                    <Dropdown.Item
                      href="#"
                      onClick={() => {
                        graphInput.current.value = '';
                        setGraphName(curGraph);
                      }}
                    >
                      {curGraph}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
              <Form.Control
                aria-label="Text input with dropdown button"
                placeholder={graphName}
                readOnly={graphName ? 1 : 0}
                ref={graphInput}
              />
            </InputGroup>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setGraphName();
              setShow(!show);
            }}
          >
            Close
          </Button>
          <Button variant="success" onClick={() => checkCondition()}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
      {showLB
        && (
        <InitLabel
          showLB={showLB}
          setLBShow={setLBShow}
          showPR={showPR}
          setPRShow={setPRShow}
          graphName={graphName}
          graphs={graphs}
          setGlobalNodeList={setGlobalNodeList}
          setGraphName={setGraphName}
        />
        )}
      {showPR
        && (
        <InitProperty
          showPR={showPR}
          setPRShow={setPRShow}
          showDone={showDone}
          setDoneShow={setDoneShow}
          globalNodeList={globalNodeList}
          setGlobalNodeList={setGlobalNodeList}
          setGraphName={setGraphName}
        />
        )}
      {showDone
        && (
        <InitNode
          showDone={showDone}
          setDoneShow={setDoneShow}
          globalNodeList={globalNodeList}
          graphs={graphs}
          graphName={graphName}
          setGraphName={setGraphName}
        />
        )}
    </div>
  );
};

InitInputGraphModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  graphs: PropTypes.any.isRequired,
};

export default InitInputGraphModal;
