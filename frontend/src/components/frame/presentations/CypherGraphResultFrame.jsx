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

import React, { createRef, useState } from 'react';
import uuid from 'react-uuid';
import { saveAs } from 'file-saver';
import { Parser } from 'json2csv';
import {
  Collapse, Dropdown, DropdownButton, Nav, Tab,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleUp,
  faCompressAlt,
  faDownload,
  faExpandAlt,
  faFont,
  faPaperclip,
  faSync,
  faTable,
  faTerminal,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import CypherResultCytoscapeContainer
  from '../../cypherresult/containers/CypherResultCytoscapeContainer';
import CypherResultTableContainer from '../../cypherresult/containers/CypherResultTableContainer';
import CypherResultTextContainer from '../../cypherresult/containers/CypherResultTextContainer';
import CypherResultMetaContainer from '../../cypherresult/containers/CypherResultMetaContainer';

const CypherResultFrame = ({
  refKey, isPinned, reqString, removeFrame, pinFrame,
}) => {
  const chartAreaRef = createRef();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [cyZoomingEnabled, setCyZoomingEnabled] = useState(false);
  const [cytoscapeContainerKey, setCytoscapeContainerKey] = useState(uuid());

  const expandFrame = () => {
    setIsFullScreen(!isFullScreen);
    setCyZoomingEnabled(!cyZoomingEnabled);
    const ref = chartAreaRef.current;

    function resize() {
      const zoom = ref.getCy().zoom();
      ref.getCy().resize();
      ref.getCy().zoom({ level: zoom, position: { x: 0, y: 0 } });
    }

    window.setTimeout(resize, 500);
  };

  const refreshFrame = () => {
    setCytoscapeContainerKey(uuid());
  };

  const downloadPng = () => {
    const eleJson = chartAreaRef.current.getCy().elements().jsons();
    if (eleJson.length === 0) {
      alert('No data to download!');
      return;
    }

    const pngOption = {
      output: 'base64uri',
      bg: 'transparent',
      full: true,

    };
    saveAs(chartAreaRef.current.getCy().png(pngOption), `${reqString.replace(/ /g, '_')}.png`);
  };

  const downloadJson = () => {
    const eleJson = chartAreaRef.current.getCy().elements().jsons();
    if (eleJson.length === 0) {
      alert('No data to download!');
      return;
    }
    saveAs(new Blob([JSON.stringify(eleJson.map((ele) => ({
      label: ele.data.label,
      gid: ele.data.id,
      source: ele.data.source,
      target: ele.data.target,
      properties: ele.data.properties,
    })))], { type: 'application/json;charset=utf-8' }), `${reqString.replace(/ /g, '_')}.json`);
  };

  const downloadCsv = () => {
    const eleJson = chartAreaRef.current.getCy().elements().jsons();
    if (eleJson.length === 0) {
      alert('No data to download!');
      return;
    }

    const dataJson = eleJson.map((ele) => ({
      label: ele.data.label,
      gid: ele.data.id,
      source: ele.data.source,
      target: ele.data.target,
      properties: ele.data.properties,
    }));

    try {
      const json2csvParser = new Parser();
      saveAs(new Blob([`\uFEFF${json2csvParser.parse(dataJson)}`], { type: 'text/csv;charset=utf-8' }), `${reqString.replace(/ /g, '_')}.csv`);
    } catch (err) {
      alert('Unknown Error.');
    }
  };

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
          <DropdownButton
            bsPrefix="frame-head-button btn btn-link"
            title={(
              <FontAwesomeIcon
                icon={faDownload}
                size="lg"
              />
            )}
          >
            <Dropdown.Item onClick={() => downloadPng()}>Save as PNG</Dropdown.Item>
            <Dropdown.Item onClick={() => downloadJson()}>Save as JSON</Dropdown.Item>
            <Dropdown.Item onClick={() => downloadCsv()}>Save as CSV</Dropdown.Item>
          </DropdownButton>
          <button
            type="button"
            className={`frame-head-button btn btn-link px-3${isFullScreen ? ' selected ' : ''}`}
            onClick={() => expandFrame()}
          >
            <FontAwesomeIcon
              icon={isFullScreen ? faCompressAlt : faExpandAlt}
              size="lg"
            />
          </button>
          <button
            type="button"
            className="frame-head-button btn btn-link px-3"
            onClick={() => refreshFrame()}
          >
            <FontAwesomeIcon
              icon={faSync}
              size="lg"
            />
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
            <FontAwesomeIcon
              icon={isExpanded ? faAngleUp : faAngleDown}
              size="lg"
            />
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
            <Tab.Container defaultActiveKey="graph">

              <Nav variant="pills" className="flex-column graph-card-nav">

                <Nav.Item>
                  <Nav.Link eventKey="graph">
                    <FontAwesomeIcon
                      icon={faPaperclip}
                    />
                    <br />
                    Graph
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="table">
                    <FontAwesomeIcon
                      icon={faTable}
                    />
                    <br />
                    Table
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="text">
                    <FontAwesomeIcon
                      icon={faFont}
                    />
                    <br />
                    Text
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="code">
                    <FontAwesomeIcon
                      icon={faTerminal}
                    />
                    <br />
                    Meta
                  </Nav.Link>
                </Nav.Item>

              </Nav>
              <Tab.Content className="graph-card-content container-fluid graph-tabpanel">

                <Tab.Pane eventKey="graph" style={{ height: '100%' }}>
                  <CypherResultCytoscapeContainer
                    key={cytoscapeContainerKey}
                    ref={chartAreaRef}
                    refKey={refKey}
                    isFullScreen={isFullScreen}
                  />
                </Tab.Pane>

                <Tab.Pane eventKey="table" style={{ height: '450px' }}>
                  <CypherResultTableContainer refKey={refKey} />
                </Tab.Pane>

                <Tab.Pane eventKey="text" style={{ height: '450px' }}>
                  <CypherResultTextContainer refKey={refKey} />
                </Tab.Pane>

                <Tab.Pane eventKey="code" style={{ height: '450px' }}>
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
