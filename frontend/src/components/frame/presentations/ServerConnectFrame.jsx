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
import { Col, Row } from 'antd';
import Frame from '../Frame';

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  return (
    <Frame
      content={(
        <Row>
          <Col span={6}>
            <h3>Connect to AgensGraph</h3>
            <p>Database access might require and authenticated connection.</p>
          </Col>
          <Col span={18}>
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
          </Col>
        </Row>
)}
      reqString={reqString}
      isPinned={isPinned}
      pinFrame={pinFrame}
      removeFrame={removeFrame}
      refKey={refKey}
    />
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
