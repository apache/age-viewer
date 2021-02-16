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
import CypherResultCytoscapeContainer from '../../cypherresult/containers/CypherResultCytoscapeContainer';
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
            title={<i className="fas fa-download fa-lg" />}
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
            { isFullScreen
              ? <span className="fas fa-compress-alt fa-lg" aria-hidden="true" />
              : <span className="fas fa-expand-alt fa-lg" aria-hidden="true" />}
          </button>
          <button
            type="button"
            className="frame-head-button btn btn-link px-3"
            onClick={() => refreshFrame()}
          >
            <span className="fas fa-sync fa-lg" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`frame-head-button btn btn-link px-3${isPinned ? ' selected ' : ''}`}
            onClick={() => pinFrame(refKey)}
          >
            <span className="fas fa-paperclip fa-lg" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="frame-head-button btn btn-link px-3"
            data-toggle="collapse"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-controls={refKey}
          >
            {
              isExpanded
                ? <span className="fas fa-angle-up fa-lg" aria-hidden="true" />
                : <span className="fas fa-angle-down fa-lg" aria-hidden="true" />
            }
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
        <div className="card-body card-body-graph" id={refKey}>
          <div className="d-flex h-100">
            <Tab.Container defaultActiveKey="graph">

              <Nav variant="pills" className="flex-column graph-card-nav">

                <Nav.Item>
                  <Nav.Link eventKey="graph">
                    <span className="fas fa-paperclip" aria-hidden="true" />
                    <br />
                    Graph
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="table">
                    <span className="fas fa-table" aria-hidden="true" />
                    <br />
                    Table
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="text">
                    <span className="fas fa-font" aria-hidden="true" />
                    <br />
                    Text
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="code">
                    <span className="fas fa-terminal" aria-hidden="true" />
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
