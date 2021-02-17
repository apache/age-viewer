/*
 * Copyright 2020 Bitnine Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-bootstrap';
import MetadataCytoscapeChart from '../../cytoscape/MetadataCytoscapeChart';

const ServerStatusFrame = ({
  refKey, isPinned, reqString, serverInfo, removeFrame, pinFrame, data,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [elements, setElements] = useState({ edges: [], nodes: [] });
  const {
    host, port, user, database, graph, status,
  } = serverInfo;

  useEffect(() => {
    if (elements.edges.length === 0 && elements.nodes.length === 0) {
      setElements(data.elements);
    }
  });

  const setIconForIsExpanded = () => {
    if (isExpanded) {
      return <span className="fas fa-angle-up fa-lg" aria-hidden="true" />;
    }
    return <span className="fas fa-angle-down fa-lg" aria-hidden="true" />;
  };

  const setContent = () => {
    if (status === 'connected') {
      return (
        <div className="card-body card-body-graph collapse" id="connectStatusCardBody">
          <div className="row" style={{ padding: '15px 30px' }}>
            <div className="col-3">
              <h3>Connection Status</h3>
              <p>This is your current connection information.</p>
            </div>
            <div className="col-9">
              <p>
                You are connected as user&nbsp;
                <strong>{user}</strong>
              </p>
              <p>
                to&nbsp;
                <strong>
                  {host}
                  :
                  {port}
                  /
                  {database}
                </strong>
              </p>
              <p>
                Graph path has been set to&nbsp;
                <strong>{graph}</strong>
              </p>
            </div>
          </div>

          <hr style={{
            color: 'rgba(0,0,0,.125)',
            backgroundColor: '#fff',
            margin: '0px 10px 0px 10px',
            height: '0.3px',
          }}
          />
          <div className="chart-frame-area">
            <MetadataCytoscapeChart elements={elements} />
          </div>
        </div>
      );
    }
    if (status === 'disconnected') {
      return (
        <div className="card-body collapse" id="connectStatusCardBody">
          <div className="row">
            <div className="col-3">
              <h3>Connection Status</h3>
              <p>You are currently not connected to AgensGraph</p>
            </div>
            <div className="col-9">
              <p>
                You may run
                <a href="/#" className="badge badge-light">
                  <span
                    className="far fa-play-circle fa-lg pr-2"
                    aria-hidden="true"
                  />
                  :server connect
                </a>
                {' '}
                to access to Agensgraph.
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="card mt-3">
      <div className="card-header">
        <div className="d-flex card-title text-muted">
          <div className="mr-auto">
            <strong>
              {' '}
              $
              {reqString}
            </strong>
          </div>
          <button
            type="button"
            className={`frame-head-button btn btn-link px-3${isPinned ? ' selected ' : ''}`}
            onClick={() => pinFrame(refKey)}
          >
            <span
              className="fas fa-paperclip fa-lg"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            className="frame-head-button btn btn-link px-3"
            data-toggle="collapse"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-controls={refKey}
          >
            {setIconForIsExpanded(isExpanded)}
          </button>
          <button
            type="button"
            className="frame-head-button btn btn-link pl-3"
            onClick={() => removeFrame(refKey)}
          >
            <span className="fas fa-times fa-lg" aria-hidden="true" />
          </button>
        </div>
      </div>
      <Collapse in={isExpanded}>
        {setContent()}
      </Collapse>
    </div>
  );
};

ServerStatusFrame.propTypes = {
  refKey: PropTypes.string.isRequired,
  isPinned: PropTypes.bool.isRequired,
  reqString: PropTypes.string.isRequired,
  serverInfo: PropTypes.shape({
    host: PropTypes.string,
    port: PropTypes.string,
    user: PropTypes.string,
    database: PropTypes.string,
    graph: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  removeFrame: PropTypes.func.isRequired,
  pinFrame: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.any.isRequired,
};

export default ServerStatusFrame;
