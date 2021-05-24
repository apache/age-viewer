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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { Col, Row } from 'antd';
import MetadataCytoscapeChart from '../../cytoscape/MetadataCytoscapeChart';
import Frame from '../Frame';
import FrameStyles from '../Frame.module.scss';

const ServerStatusFrame = ({
  refKey, isPinned, reqString, serverInfo, data,
}) => {
  const [elements, setElements] = useState({ edges: [], nodes: [] });
  const {
    host, port, user, database, graph, status,
  } = serverInfo;

  useEffect(() => {
    if (elements.edges.length === 0 && elements.nodes.length === 0) {
      setElements(data.elements);
    }
  });

  const setContent = () => {
    if (status === 'connected') {
      return (
        <div className={FrameStyles.FlexContentWrapper}>
          <Row>
            <Col span={6}>
              <h3>Connection Status</h3>
              <p>This is your current connection information.</p>
            </Col>
            <Col span={18}>
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
            </Col>
          </Row>

          <hr style={{
            color: 'rgba(0,0,0,.125)',
            backgroundColor: '#fff',
            margin: '0px 10px 0px 10px',
            height: '0.3px',
          }}
          />

          <MetadataCytoscapeChart elements={elements} />
        </div>
      );
    }
    if (status === 'disconnected') {
      return (
        <>
          <Row>
            <Col span={6}>
              <h3>Connection Status</h3>
              <p>You are currently not connected to AgensGraph</p>
            </Col>
            <Col span={18}>
              <p>
                You may run
                <a href="/#" className="badge badge-light">
                  <FontAwesomeIcon
                    icon={faPlayCircle}
                    size="lg"
                  />
                  :server connect
                </a>
                {' '}
                to access to Agensgraph.
              </p>
            </Col>
          </Row>
        </>
      );
    }
    return null;
  };
  return (
    <Frame
      reqString={reqString}
      isPinned={isPinned}
      refKey={refKey}
    >
      {setContent()}
    </Frame>
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
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.any.isRequired,
};

export default ServerStatusFrame;
