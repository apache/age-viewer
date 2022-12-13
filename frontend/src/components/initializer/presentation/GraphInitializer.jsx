import React, { useState, useRef } from 'react';
import {
  /* Form, */ Modal, Row, Col, Button, ListGroup, Spinner, Alert,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import './GraphInit.scss';
import { Divider, Checkbox, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../../features/alert/AlertSlice';
import { changeGraph } from '../../../features/database/DatabaseSlice';
import { changeCurrentGraph, getMetaData } from '../../../features/database/MetadataSlice';

const InitGraphModal = ({ show, setShow }) => {
  const [nodeFiles, setNodeFiles] = useState({});
  const [edgeFiles, setEdgeFiles] = useState({});
  const [graphName, setGraphName] = useState('');
  const [dropGraph, setDropGraph] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const edgeInputRef = useRef();
  const nodeInputRef = useRef();
  const dispatch = useDispatch();

  const handleSelectNodeFiles = (e) => {
    console.log(e.target.files);
    Array.from(e.target.files).forEach((file) => {
      const key = uuid();
      nodeFiles[key] = {
        data: file,
        name: '',
      };
    });
    setNodeFiles({ ...nodeFiles });
    nodeInputRef.current.value = '';
  };

  const handleSelectEdgeFiles = (e) => {
    console.log(e.target.files);
    Array.from(e.target.files).forEach((file) => {
      const key = uuid();
      edgeFiles[key] = {
        data: file,
        name: '',
      };
    });
    setEdgeFiles({ ...edgeFiles });
    console.log(edgeFiles);
    edgeInputRef.current.value = '';
  };

  const removeNodeFile = (k) => {
    delete nodeFiles[k];
    console.log(nodeFiles);
    setNodeFiles({ ...nodeFiles });
  };

  const removeEdgeFile = (k) => {
    delete edgeFiles[k];
    setEdgeFiles({ ...edgeFiles });
  };
  const setName = (name, key, type) => {
    if (type === 'node') {
      const fileProps = nodeFiles[key];
      fileProps.name = name;
    }
    if (type === 'edge') {
      const fileProps = edgeFiles[key];
      fileProps.name = name;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const sendFiles = new FormData();

    Object.entries(nodeFiles).forEach(([, node]) => sendFiles.append('nodes', node.data, node.name));
    Object.entries(edgeFiles).forEach(([, edge]) => sendFiles.append('edges', edge.data, edge.name));
    sendFiles.append('graphName', graphName);
    sendFiles.append('dropGraph', dropGraph);
    const reqData = {
      method: 'POST',
      body: sendFiles,
      mode: 'cors',

    };
    fetch('/api/v1/cypher/init', reqData)
      .then(async (res) => {
        setLoading(false);

        if (res.status !== 204) {
          const resData = await res.json();
          console.log(resData);
          setError(resData);
        } else {
          setShow(false);
          dispatch(addAlert('CreateGraphSuccess'));
          getMetaData();
          changeCurrentGraph({ name: graphName });
          changeGraph(graphName);
        }
        // set success alert reducer
      })
      .catch((err) => {
        // setalert reducer
        setLoading(false);
        setError(err);
        console.log(err);
      });
  };

  const modalInputBody = () => (
    <>
      <Col className="graphInputCol">
        <Row id="graphInputRow">
          <Input
            id="graphNameInput"
            type="text"
            placeholder="graph name"
            onChange={(e) => setGraphName(e.target.value)}
            required
          />
        </Row>
        <Row id="graphInputRow">
          <Checkbox onChange={(e) => setDropGraph(e.target.checked)}>
            DROP graph if exists
          </Checkbox>
        </Row>
      </Col>
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
              Object.entries(nodeFiles).map(([k, { data: file, name }]) => (
                <ListGroup.Item key={k}>
                  <Row className="modalRow">
                    <Input
                      id="graphNameInput"
                      placeholder="label name"
                      data-key={k}
                      defaultValue={name}
                      onChange={(e) => {
                        setName(e.target.value, k, 'node');
                      }}
                      required
                    />
                  </Row>
                  <Row className="modalRow">
                    <span>{file.name}</span>
                    <FontAwesomeIcon
                      id="removeFile"
                      data-id={k}
                      onClick={() => removeNodeFile(k)}
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
              Object.entries(edgeFiles).map(([k, { data: file, name }]) => (
                <ListGroup.Item key={k}>
                  <Row className="modalRow">
                    <Input
                      id="graphNameInput"
                      data-key={k}
                      onChange={(e) => {
                        setName(e.target.value, k, 'edge');
                      }}
                      placeholder="edge name"
                      defaultValue={name}
                      required
                    />
                  </Row>
                  <Row className="modalRow">
                    <span>{file.name}</span>
                    <FontAwesomeIcon
                      id="removeFile"
                      data-id={k}
                      onClick={() => removeEdgeFile(k)}
                      icon={faMinusCircle}
                    />
                  </Row>
                </ListGroup.Item>
              ))
          }
          </ListGroup>
        </Col>
      </Row>
    </>
  );

  const modalBody = () => {
    if (loading) return <Spinner animation="border" />;
    if (error !== '') {
      return (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
          <Alert.Heading>
            An error occured
          </Alert.Heading>
          <p>
            {`Error Code: ${error.code}`}
          </p>
          <p>
            {`Error Details: ${error.details}`}
          </p>
        </Alert>
      );
    }
    return modalInputBody();
  };

  return (
    <div>
      <Modal className="ModalContainer" show={show} onHide={() => setShow(!show)}>
        <Modal.Header id="modalHeader" closeButton>
          <h2>Create Graph</h2>
        </Modal.Header>
        <Modal.Body>
          <Col className="modalCol">
            {modalBody()}
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
