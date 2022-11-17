import {
  Form, Modal, Row, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const InitGraphModal = ({ show, setShow }) => {
  const [data] = useState(0);

  return (
    <Modal show={show} onHide={() => setShow(!show)}>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>
                Test
              </Form.Label>
              <Form.Text>
                Fill
              </Form.Text>
              <Form.Text>
                {data}
              </Form.Text>
            </Form.Group>
          </Form>
        </Col>

      </Row>

    </Modal>
  );
};

InitGraphModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default InitGraphModal;
