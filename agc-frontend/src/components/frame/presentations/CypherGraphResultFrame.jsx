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

import React, { createRef, useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { saveAs } from 'file-saver';
import { Parser } from 'json2csv';
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTable } from '@fortawesome/free-solid-svg-icons';
import CypherResultCytoscapeContainer
  from '../../cypherresult/containers/CypherResultCytoscapeContainer';
import CypherResultTableContainer from '../../cypherresult/containers/CypherResultTableContainer';
import GraphFilterModal from '../../cypherresult/components/GraphFilterModal';
import Frame from '../Frame';

const CypherResultFrame = ({
  refKey,
  isPinned,
  reqString,
  removeFrame,
  pinFrame,
}) => {
  const chartAreaRef = createRef();
  const [cytoscapeContainerKey, setCytoscapeContainerKey] = useState(uuid());

  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const [filterProperties, setFilterProperties] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  useEffect(() => {
    if (chartAreaRef.current && filterModalVisible) {
      const labels = chartAreaRef.current.getLabels()
        .map(
          (label) => {
            const propertiesIter = Array.from(chartAreaRef.current.getCaptionsFromCytoscapeObject('node', label));
            return propertiesIter.map((value) => ({
              label,
              property: value,
            }));
          },
        ).flat();
      setFilterProperties(labels);
    }
  }, [filterModalVisible]);

  useEffect(() => {
    if (globalFilter) {
      chartAreaRef.current.applyFilterOnCytoscapeElements(globalFilter);
    } else {
      chartAreaRef.current.resetFilterOnCytoscapeElements();
    }
  }, [globalFilter]);

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
    <>
      <Frame
        bodyNoPadding
        onSearch={() => setFilterModalVisible(true)}
        onSearchCancel={() => setGlobalFilter(null)}
        onRefresh={refreshFrame}
        onDownload={(type) => {
          if (type === 'csv') {
            downloadCsv();
          } else if (type === 'json') {
            downloadJson();
          } else if (type === 'png') {
            downloadPng();
          }
        }}
        content={(
          <div className="d-flex h-100">
            <div style={{ height: '100%', width: '100%' }} id={`${refKey}-graph`} className="selected-frame-tab">
              <CypherResultCytoscapeContainer
                key={cytoscapeContainerKey}
                ref={chartAreaRef}
                refKey={refKey}
              />
            </div>
            <div style={{ height: '100%', width: '100%' }} id={`${refKey}-table`} className="deselected-frame-tab">
              <CypherResultTableContainer
                refKey={refKey}
              />
            </div>
          </div>
        )}
        reqString={reqString}
        isPinned={isPinned}
        pinFrame={pinFrame}
        removeFrame={removeFrame}
        refKey={refKey}
      />
      <GraphFilterModal
        onSubmit={(filters) => {
          setGlobalFilter(filters);
        }}
        visible={filterModalVisible}
        setVisible={setFilterModalVisible}
        properties={filterProperties}
        globalFilter={globalFilter}
      />
    </>

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
