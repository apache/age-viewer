import React, { useState } from 'react';
import {
  /* Form, */ Modal, Row, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import './GraphInit.scss';
import InitCSVGraphModal from './GraphCSVInitializer';
import InitInputGraphModal from './GraphInputInitializer';

const InitGraphModal = ({ show, setShow, graphs }) => {
  const [option, setOption] = useState();
  const [showCSVInitModal, setCSVSInitShow] = useState(false);
  const [showInputInitModal, setInputIniSthow] = useState(false);
  return (
    <>
      <div>
        <Modal className="ModalContainer" show={show} onHide={() => setShow(!show)}>
          <Modal.Header closeButton style={{ textAlign: 'center' }}>
            <Row id="headerRow" style={{ width: '100%' }}>
              <Modal.Title style={{ width: '100%' }}>Create a Graph</Modal.Title>
            </Row>
          </Modal.Header>
          <Modal.Body>
            <Row className="modalRow">
              <Button onClick={() => { setOption('CSV'); setCSVSInitShow(!showCSVInitModal); setShow(!show); }}>
                Using CSV file
              </Button>
              <Button onClick={() => { setOption('Input'); setInputIniSthow(!showInputInitModal); setShow(!show); }}>
                Using Input field
              </Button>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
      {(option && option === 'CSV') ? <InitCSVGraphModal show={showCSVInitModal} setShow={setCSVSInitShow} /> : <InitInputGraphModal show={showInputInitModal} setShow={setInputIniSthow} graphs={graphs} />}
    </>
  );
};

InitGraphModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  graphs: PropTypes.any.isRequired,
};

export default InitGraphModal;
