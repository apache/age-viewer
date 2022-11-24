import React, { useState, useRef } from 'react';
import {
  /* Form, */ Modal, Row, Col, Button, ListGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import './GraphInit.scss';
import { Divider } from 'antd';

const InitGraphModal = ({ show, setShow }) => {
  const [nodeFiles, setNodeFiles] = useState([]);
  const [edgeFiles, setEdgeFiles] = useState([]);
  const [/* graphName */, setGraphName] = useState('');
  const edgeInputRef = useRef();
  const nodeInputRef = useRef();

  const handleSelectNodeFiles = (e) => {
    setNodeFiles([...nodeFiles, ...e.target.files]);
    nodeInputRef.current.value = '';
  };

  const handleSelectEdgeFiles = (e) => {
    setEdgeFiles([...edgeFiles, ...e.target.files]);
    edgeInputRef.current.value = '';
  };

  const removeNodeFile = (e) => {
    const index = e.target.getAttribute('data-index');
    nodeFiles.splice(index, 1);
    setNodeFiles([...nodeFiles]);
  };

  const removeEdgeFile = (e) => {
    const index = e.target.getAttribute('data-index');
    edgeFiles.splice(index, 1);
    setEdgeFiles([...edgeFiles]);
  };

  const handleSubmit = () => {
    // implement body

  };

  return (
    <div>
      <Modal className="ModalContainer" show={show} onHide={() => setShow(!show)}>
        <Modal.Header id="modalHeader" closeButton>
          <h2>Create Graph</h2>
        </Modal.Header>
        <Modal.Body id="modalBody">
          <Row id="graphNameInput">
            <span>Graph Name</span>
            <input type="text" onChange={(val) => setGraphName(val)} />
          </Row>
          <Divider />
          <Row id="modalRow">
            <Col>
              <Button onClick={() => nodeInputRef.current.click()}>
                Upload Nodes
                <input type="file" ref={nodeInputRef} onChange={handleSelectNodeFiles} multiple hidden />
              </Button>
            </Col>
            <Col>
              <Button onClick={() => edgeInputRef.current.click()}>
                Upload Edges
                <input type="file" ref={edgeInputRef} onChange={handleSelectEdgeFiles} multiple hidden />
              </Button>
            </Col>
          </Row>
          <Row id="modalRow">
            <Col>
              <ListGroup>
                {
                  nodeFiles.map((file, i) => (
                    <ListGroup.Item key={uuid()}>
                      <Row id="modalRow">
                        <input placeholder="label name" required />
                        {file.name}
                        <FontAwesomeIcon
                          id="removeFile"
                          data-index={i}
                          onClick={removeNodeFile}
                          icon={faMinusCircle}
                        />
                      </Row>
                    </ListGroup.Item>
                  ))
              }
              </ListGroup>
            </Col>
            <Col>
              <ListGroup>

                {
                  edgeFiles.map((file, i) => (
                    <ListGroup.Item key={uuid()}>
                      <Row id="modalRow">
                        {file.name}
                        <FontAwesomeIcon
                          id="removeFile"
                          data-index={i}
                          onClick={removeEdgeFile}
                          icon={faMinusCircle}
                        />
                      </Row>
                    </ListGroup.Item>
                  ))
              }
              </ListGroup>
            </Col>

          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
};

InitGraphModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default InitGraphModal;
