/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import style from './popover.module.scss';

const EdgeQuerySaveModal = ({
  show,
  setShow,
  edgeElements,
  setEdgeElements,
  graph,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState([]);
  const handleSave = async () => {
    const promises = edgeElements.map(async (ele) => {
      const res = await fetch('/api/v1/cypher',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cmd: `SELECT * FROM cypher('${graph}', $$ MATCH (a:${ele.sourceLabel}), (b:${ele.targetLabel}) WHERE ID(a) = ${ele.source} AND ID(b) = ${ele.target} CREATE (a)-[e:${ele.label} {${ele.properties}}]->(b) RETURN e $$) as (e agtype);` }),
        });
      return res;
    });
    const results = await Promise.all(promises);
    results.forEach((res, idx) => {
      if (!res.ok) {
        error.push(edgeElements[idx]);
        setError(error);
      }
    });
    setIsLoading(false);
    setEdgeElements([]);
  };

  return (
    <div className="modal-container" style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
      <Modal.Dialog
        show={show}
        keyboard={false}
        backdrop="static"
        style={{ width: '32rem' }}
      >
        <Modal.Body style={{ padding: '0' }}>
          <div className={style.container}>
            <p className={style.title}>Save all changes</p>
            {isLoading && edgeElements.map((ele, idx) => {
              const {
                source,
                target,
                sourceLabel,
                targetLabel,
                label,
                properties,
              } = ele;
              return (
                <div>
                  <p>
                    <strong>Added -</strong>
                    <strong>{idx + 1}</strong>
                  </p>
                  <p>
                    Start_id:
                    {source}
                    &emsp;
                    Label:
                    {sourceLabel}
                  </p>
                  <p>
                    End_id:
                    {target}
                    &emsp;
                    Label:
                    {targetLabel}
                  </p>
                  <p>
                    Label Name:
                    {label}
                  </p>
                  <p>
                    Properties:
                    {properties}
                  </p>
                </div>
              );
            })}
            {error.length >= 1 ? (
              <>
                <p>Error occured for the following edges</p>
                {error.map((err) => {
                  const { source, target } = err;
                  return (
                    <div>
                      <p>
                        Start_id:
                        {source}
                      </p>
                      <p>
                        End_id:
                        {target}
                      </p>
                    </div>
                  );
                })}
              </>
            ) : (!isLoading && <p>Changes have been successfully saved.</p>)}
            <div className={style.buttons} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className={style.btn} type="button" onClick={() => setShow(false)}>Cancle</button>
              {isLoading && <button className={style.btn} type="button" onClick={handleSave}>Save</button>}
            </div>
          </div>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};

export default EdgeQuerySaveModal;
