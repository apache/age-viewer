import React, { useState, useRef } from 'react';
import {
  /* Form, */ Modal, Row, Col, Button, ListGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import style from './GraphInit.scss';

const InitGraphModal = ({ show, setShow }) => {
  const [nodeFiles, setNodeFiles] = useState([]);
  const [edgeFiles, setEdgeFiles] = useState([]);
  const edgeInputRef = useRef();
  const nodeInputRef = useRef();

  const handleSelectNodeFiles = (e) => {
    console.log(e.target.files);
    setNodeFiles([...nodeFiles, ...e.target.files]);
  };

  const handleSelectEdgeFiles = (e) => {
    setEdgeFiles([...edgeFiles, ...e.target.files]);
  };

  const removeNodeFile = (e) => {
    const index = e.target['data-index'];
    nodeFiles.splice(index, 1);
    setNodeFiles([...nodeFiles]);
  };

  const removeEdgeFile = (e) => {
    const index = e.target['data-index'];
    edgeFiles.splice(index, 1);
    setEdgeFiles([...edgeFiles]);
  };
  return (
    <div className={style.ModalContainer}>
      <Modal className={style.Modal} show={show} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          Upload Files
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Button onClick={() => nodeInputRef.current.click()}>
                Upload Nodes
                <input type="file" ref={nodeInputRef} onChange={handleSelectNodeFiles} multiple hidden />
              </Button>
              <Button onClick={() => edgeInputRef.current.click()}>
                Upload Edges
                <input type="file" ref={edgeInputRef} onChange={handleSelectEdgeFiles} multiple hidden />
              </Button>
            </Col>
          </Row>
          <ListGroup>
            {
              nodeFiles.map((file, i) => (
                <ListGroup.Item>
                  {file.name}
                  <Button size="small" data-index={i} onClick={removeNodeFile}> x </Button>
                </ListGroup.Item>
              ))
          }
            {
              edgeFiles.map((file, i) => (
                <ListGroup.Item>
                  {file.name}
                  <Button size="small" data-index={i} onClick={removeEdgeFile}> x </Button>
                </ListGroup.Item>
              ))
          }
          </ListGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button>
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
