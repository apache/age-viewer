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
import { Collapse, Nav, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleUp,
  faCompressAlt,
  faExpandAlt,
  faPaperclip,
  faTable,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import CypherResultTableContainer from '../../cypherresult/containers/CypherResultTableContainer';
import CypherResultMetaContainer from '../../cypherresult/containers/CypherResultMetaContainer';

const CypherResultFrame = ({
  refKey, isPinned, reqString, removeFrame, pinFrame,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const expandFrame = () => {
    setIsFullScreen(!isFullScreen);
  };

  const setIconForIsExpanded = () => (
    <FontAwesomeIcon
      icon={isExpanded ? faAngleUp : faAngleDown}
      size="lg"
    />
  );

  const setIconForIsFullscreen = () => (
    <FontAwesomeIcon
      icon={isFullScreen ? faCompressAlt : faExpandAlt}
      size="lg"
    />
  );

  return (
    <div className={`card ${isFullScreen ? ' fullscreen ' : 'mt-3'}`}>
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
            className={`frame-head-button btn btn-link px-3${isFullScreen ? ' selected ' : ''}`}
            onClick={() => expandFrame()}
          >
            {setIconForIsFullscreen(isExpanded)}
          </button>
          <button
            type="button"
            className={`frame-head-button btn btn-link px-3${isPinned ? ' selected ' : ''}`}
            onClick={() => pinFrame(refKey)}
          >
            <FontAwesomeIcon
              icon={faPaperclip}
              size="lg"
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
            {setIconForIsExpanded()}
          </button>
          <button
            type="button"
            className="frame-head-button btn btn-link pl-3"
            onClick={() => removeFrame(refKey)}
          >
            <FontAwesomeIcon
              icon={faTimes}
              size="lg"
            />
          </button>
        </div>
      </div>
      <Collapse in={isExpanded}>
        <div className="card-body card-body-graph" id={refKey}>
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
        </div>
      </Collapse>
    </div>

  );
};

CypherResultFrame.propTypes = {
  refKey: PropTypes.string.isRequired,
  isPinned: PropTypes.bool.isRequired,
  reqString: PropTypes.string.isRequired,
  removeFrame: PropTypes.func.isRequired,
  pinFrame: PropTypes.func.isRequired,
};

export default CypherResultFrame;
