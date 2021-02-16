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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-bootstrap';

const ServerConnectFrame = ({
  refKey,
  isPinned,
  reqString,
  connectToAgensGraph,
  addFrame,
  trimFrame,
  removeFrame,
  pinFrame,
  addAlert,
  getMetaData,
  getMetaChartData,
}) => {
  const [formData, setFormData] = useState({});
  const [isExpanded, setIsExpanded] = useState(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const setIconForIsExpanded = () => {
    if (isExpanded) {
      return <span className="fas fa-angle-up fa-lg" aria-hidden="true" />;
    }
    return <span className="fas fa-angle-down fa-lg" aria-hidden="true" />;
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
        <div className="card-body collapse" id={refKey}>
          <div className="row">
            <div className="col-3">
              <h3>Connect to AgensGraph</h3>
              <p>Database access might require and authenticated connection.</p>
            </div>
            <div className="col-9">
              <form>
                <fieldset className="form-group">
                  <label htmlFor="host">
                    Connect URL
                    <input type="text" className="form-control" name="host" onChange={handleChange} />
                  </label>
                </fieldset>
                <fieldset className="form-group">
                  <label htmlFor="port">
                    Connect Port
                    <input type="number" className="form-control" name="port" onChange={handleChange} />
                  </label>
                </fieldset>
                <fieldset className="form-group">
                  <label htmlFor="database">
                    Database Name
                    <input type="text" className="form-control" name="database" onChange={handleChange} />
                  </label>
                </fieldset>
                <fieldset className="form-group">
                  <label htmlFor="graph">
                    Graph Path
                    <input type="text" className="form-control" name="graph" onChange={handleChange} />
                  </label>
                </fieldset>
                <fieldset className="form-group">
                  <label htmlFor="user">
                    User Name
                    <input type="text" className="form-control" name="user" onChange={handleChange} />
                  </label>
                </fieldset>
                <fieldset className="form-group">
                  <label htmlFor="password">
                    Password
                    <input type="password" className="form-control" id="password" name="password" autoComplete="on" onChange={handleChange} />
                  </label>
                </fieldset>
              </form>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => connectToAgensGraph(formData).then((response) => {
                  if (response.type === 'database/connectToAgensGraph/fulfilled') {
                    addAlert('NoticeServerConnected');
                    trimFrame('ServerConnect');
                    getMetaData().then((metadataResponse) => {
                      if (metadataResponse.type === 'database/getMetaData/fulfilled') {
                        getMetaChartData();
                      } else if (metadataResponse.type === 'database/getMetaData/rejected') {
                        addAlert('ErrorMetaFail');
                      }
                    });

                    addFrame(':server status', 'ServerStatus');
                  } else if (response.type === 'database/connectToAgensGraph/rejected') {
                    addAlert('ErrorServerConnectFail', response.error.message);
                  }
                })}
              >
                CONNECT
              </button>
            </div>
          </div>
        </div>
      </Collapse>
      <div className="card-footer" />
    </div>
  );
};

ServerConnectFrame.propTypes = {
  refKey: PropTypes.string.isRequired,
  isPinned: PropTypes.bool.isRequired,
  reqString: PropTypes.string.isRequired,
  connectToAgensGraph: PropTypes.func.isRequired,
  addFrame: PropTypes.func.isRequired,
  trimFrame: PropTypes.func.isRequired,
  removeFrame: PropTypes.func.isRequired,
  pinFrame: PropTypes.func.isRequired,
  addAlert: PropTypes.func.isRequired,
  getMetaData: PropTypes.func.isRequired,
  getMetaChartData: PropTypes.func.isRequired,
};

export default ServerConnectFrame;
