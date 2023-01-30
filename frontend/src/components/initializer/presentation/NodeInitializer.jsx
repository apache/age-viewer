import React, { useState, useEffect } from 'react';
import {
  /* Form, */ Modal, Col, Button, Row, Spinner,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getMetaData } from '../../../features/database/MetadataSlice';

const InitNode = ({
  showDone,
  setDoneShow,
  globalNodeList,
  graphs,
  graphName,
  setGraphName,
}) => {
  const [graphLoading, setGraphLoading] = useState(true);
  const [nodeLoading, setNodeLoading] = useState(true);
  const [newGraph, setNewGraph] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const createGraph = async () => {
      const res = await fetch('/api/v1/cypher',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cmd: `SELECT * FROM ag_catalog.create_graph('${graphName}');` }),
        });
      if (res.ok) {
        setGraphLoading(false);
        dispatch(getMetaData({ graphName }));
      }
    };
    if (!graphs.includes(graphName) && graphName) {
      createGraph();
      setNewGraph(true);
    } else setGraphLoading(false);
  }, [graphName]);

  useEffect(() => {
    const createNodes = async () => {
      let query = '';
      globalNodeList.forEach((node, index) => {
        query += `(:${node.label}{${node.value}})`;
        if (index !== globalNodeList.length - 1) {
          query += ',\n';
        }
      });
      const res = await fetch('/api/v1/cypher',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cmd: `SELECT * FROM cypher('${graphName}', $$ CREATE ${query} $$) as (v agtype);` }),
        });
      if (res.ok) {
        dispatch(getMetaData({ graphName }));
        setNodeLoading(false);
        setError(newGraph ? `Graph: ${graphName} has been successfully created.` : `Graph: ${graphName} has been successfully updated.`);
        setGraphName();
      } else {
        setError('An error occurred. Please check the format of properties and retry.');
        setNodeLoading(false);
      }
    };
    if (!graphLoading) {
      createNodes();
    }
  }, [graphLoading]);

  return (
    <div>
      <Modal className="ModalContainer" show={showDone} onHide={() => setDoneShow(!showDone)}>
        <Modal.Header closeButton style={{ textAlign: 'center' }}>
          <Row id="headerRow" style={{ width: '100%' }}>
            <Modal.Title style={{ width: '100%' }}>Creating graph</Modal.Title>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <Col className="modalCol">
            {nodeLoading ? <Spinner animation="border" /> : <></>}
            {!error ? <></> : error}
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setDoneShow()} variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

InitNode.propTypes = {
  showDone: PropTypes.bool.isRequired,
  setDoneShow: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  globalNodeList: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  graphs: PropTypes.any.isRequired,
  graphName: PropTypes.string.isRequired,
  setGraphName: PropTypes.func.isRequired,
};

export default InitNode;
