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
    console.log(e.target.files);
    const files = Array.from(e.target.files).map((file) => (
      {
        data: file,
        name: '',
      }
    ));
    console.log(files);
    setNodeFiles([...nodeFiles, ...files]);
    nodeInputRef.current.value = '';
  };

  const handleSelectEdgeFiles = (e) => {
    const files = Array.from(e.target.files).map((file) => (
      {
        data: file,
        name: '',
      }
    ));
    setEdgeFiles([...edgeFiles, ...files]);
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
  const setName = (name, index, type) => {
    if (type === 'node') {
      const fileProps = nodeFiles[index];
      fileProps.name = name;
    }
    if (type === 'edge') {
      const fileProps = edgeFiles[index];
      fileProps.name = name;
    }
  };

  const handleSubmit = () => {
    console.log(nodeFiles, edgeFiles);
  };

  return (
    <div>
      <Modal className="ModalContainer" show={show} onHide={() => setShow(!show)}>
        <Modal.Header id="modalHeader" closeButton>
          <h2>Create Graph</h2>
        </Modal.Header>
        <Modal.Body>
          <Col className="modalCol">
            <Row id="graphNameInputRow">
              <input
                id="graphNameInput"
                type="text"
                placeholder="graph name"
                onChange={(val) => setGraphName(val)}
              />
            </Row>
            <Divider />
            <Row className="modalRow">
              <Button onClick={() => nodeInputRef.current.click()}>
                Upload Nodes
                <input type="file" ref={nodeInputRef} onChange={handleSelectNodeFiles} multiple hidden />
              </Button>
              <Button onClick={() => edgeInputRef.current.click()}>
                Upload Edges
                <input type="file" ref={edgeInputRef} onChange={handleSelectEdgeFiles} multiple hidden />
              </Button>
            </Row>
            <Row className="modalRow">
              <Col>
                <ListGroup className="readyFiles">
                  {
                    nodeFiles.map(({ data: file }, i) => (
                      <ListGroup.Item key={uuid()}>
                        <Row className="modalRow">
                          <input
                            id="graphNameInput"
                            placeholder="label name"
                            data-index={i}
                            onChange={(e) => {
                              setName(e.target.value, i, 'node');
                            }}
                            required
                          />
                        </Row>
                        <Row className="modalRow">
                          <span>{file.name}</span>
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
                <ListGroup className="readyFiles">
                  {
                    edgeFiles.map(({ data: file }, i) => (
                      <ListGroup.Item key={uuid()}>
                        <Row className="modalRow">
                          <input
                            id="graphNameInput"
                            data-index={i}
                            onChange={(e) => {
                              setName(e.target.value, i, 'edge');
                            }}
                            placeholder="edge name"
                            required
                          />
                        </Row>
                        <Row className="modalRow">
                          <span>{file.name}</span>
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
          </Col>
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