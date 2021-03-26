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

import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import CypherResultTableContainer from '../../cypherresult/containers/CypherResultTableContainer';
import CypherResultMetaContainer from '../../cypherresult/containers/CypherResultMetaContainer';
import Frame from '../Frame';

const CypherResultFrame = ({
  refKey, isPinned, reqString, removeFrame, pinFrame,
}) => (
  <Frame
    reqString={reqString}
    isPinned={isPinned}
    pinFrame={pinFrame}
    removeFrame={removeFrame}
    refKey={refKey}
    bodyNoPadding
    content={(
      <div className="d-flex h-100">
        <Tab.Container defaultActiveKey="table">

          <Nav variant="pills" className="flex-column graph-card-nav">
            <Nav.Item>
              <Nav.Link eventKey="table">
                <FontAwesomeIcon
                  icon={faTable}
                  size="lg"
                />
                <br />
                Table
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="code">
                <FontAwesomeIcon
                  icon={faTable}
                  size="lg"
                />
                <br />
                Meta
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content className="graph-card-content container-fluid graph-tabpanel">

            <Tab.Pane eventKey="table">
              <CypherResultTableContainer refKey={refKey} />
            </Tab.Pane>

            <Tab.Pane eventKey="code">
              <CypherResultMetaContainer refKey={refKey} />
            </Tab.Pane>

          </Tab.Content>
        </Tab.Container>
      </div>
      )}
  />
);

CypherResultFrame.propTypes = {
  refKey: PropTypes.string.isRequired,
  isPinned: PropTypes.bool.isRequired,
  reqString: PropTypes.string.isRequired,
  removeFrame: PropTypes.func.isRequired,
  pinFrame: PropTypes.func.isRequired,
};

export default CypherResultFrame;
