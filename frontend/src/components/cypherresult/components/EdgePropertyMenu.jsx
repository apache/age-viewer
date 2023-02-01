/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import style from './popover.module.scss';

const EdgeProperySettingModal = ({
  show,
  setShow,
  edgeElements,
  edgeParams,
  setEdgeElements,
}) => {
  const [edgeLabel, setEdgeLabel] = useState(null);
  const [edgeProp, setEdgeProp] = useState(null);
  const checkCondition = () => {
    if (edgeLabel && edgeProp) {
      const newEdgeElements = {
        source: edgeParams.source,
        target: edgeParams.target,
        sourceLabel: edgeParams.sourceLabel,
        targetLabel: edgeParams.targetLabel,
        label: edgeLabel,
        properties: edgeProp,
      };
      edgeElements.push(newEdgeElements);
      setEdgeElements(edgeElements);
      setShow(false);
    }
  };
  return (
    <div className="modal-container">
      <Modal.Dialog
        show={show}
        keyboard={false}
        backdrop="static"
      >
        <Modal.Body style={{ padding: '0' }}>
          <div className={style.container}>
            <p className={style.title}>Add Edge Property</p>
            <input
              className={style.edgeInput}
              placeholder="Label Name ex) WORK_AT"
              style={{ marginBottom: '1rem' }}
              onChange={(event) => {
                setEdgeLabel(event.target.value);
              }}
            />
            <input
              className={style.edgeInput}
              placeholder="Properties ex) years: '3'"
              onChange={(event) => {
                setEdgeProp(event.target.value);
              }}
            />
            <div className={style.buttons}>
              <button className={style.btn} onClick={() => checkCondition()} type="button">Add</button>
            </div>
          </div>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};

export default EdgeProperySettingModal;
