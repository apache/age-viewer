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

import React, {
  forwardRef, useEffect, useImperativeHandle, useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  edgeLabelColors, edgeLabelSizes, nodeLabelColors, nodeLabelSizes,
} from '../../../features/cypher/CypherUtil';
import CypherResultCytoscapeChart from '../../cytoscape/CypherResultCytoscapeChart';
import CypherResultCytoscapeLegend from '../../cytoscape/CypherResultCytoscapeLegend';
import CypherResultCytoscapeFooter from '../../cytoscape/CypherResultCytoscapeFooter';

const CypherResultCytoscape = forwardRef((props, ref) => {
  const [footerData, setFooterData] = useState({});
  const [legendData, setLegendData] = useState({ edgeLegend: {}, nodeLegend: {} });
  const [elements, setElements] = useState({ edges: [], nodes: [] });
  const [isReloading, setIsReloading] = useState(false);
  const [maxDataOfGraph] = useState(props.maxDataOfGraph);
  const dispatch = useDispatch();
  const [selectedCaption, setSelectedCaption] = useState(null);
  const [captions, setCaptions] = useState([]);

  const [cytoscapeObject, setCytoscapeObject] = useState(null);
  const [cytoscapeLayout, setCytoscapeLayout] = useState('coseBilkent');

  useEffect(() => {
    if (props.data.legend !== undefined && Object.keys(props.data.legend.nodeLegend).length > 0) {
      if (Object.keys(legendData.edgeLegend).length === 0
          && Object.keys(legendData.nodeLegend).length === 0) {
        setIsReloading(false);
      }

      setLegendData(props.data.legend);
      setElements(props.data.elements);
    }
  }, [
    setIsReloading,
    elements.edges.length,
    elements.nodes.length,
    legendData.edgeLegend,
    legendData.nodeLegend,
    props.data,
  ]);

  const getCaptionsFromCytoscapeObject = (elementType, label) => {
    const elementsObject = cytoscapeObject.elements(`${elementType}[label = "${label}"]`).jsons();
    let extendedSet = new Set([]);
    elementsObject.forEach((ele) => {
      extendedSet = new Set([...extendedSet, ...Object.keys(ele.data.properties)]);
    });
    return extendedSet;
  };

  const getFooterData = (event) => {
    if (event.type === 'labels') {
      setCaptions(['gid', 'label'].concat(Array.from(getCaptionsFromCytoscapeObject(event.data.type, event.data.label))));

      if (event.data.type === 'node') {
        setSelectedCaption(legendData.nodeLegend[event.data.label].caption);
      } else {
        setSelectedCaption(legendData.edgeLegend[event.data.label].caption);
      }
    }

    setFooterData(event);
  };

  const addLegendData = (addedLegendData) => {
    setIsReloading(false);
    setLegendData(addedLegendData);
  };

  const changeColorOnCytoscapeElements = (elementType, label, color) => {
    const colorObject = Array.isArray(color) ? {
      color: color[0],
      borderColor: color[1],
      fontColor: color[2],
    } : color;

    if (elementType === 'node') {
      cytoscapeObject.nodes(`[label = "${label}"]`).data('backgroundColor', colorObject.color)
        .data('borderColor', colorObject.borderColor).data('fontColor', colorObject.fontColor);
    } else if (elementType === 'edge') {
      cytoscapeObject.edges(`[label = "${label}"]`).data('backgroundColor', colorObject.color)
        .data('fontColor', colorObject.fontColor).data('fontColor', '#2A2C34');
    }
  };

  const colorChange = (elementType, label, color) => {
    const footerObj = footerData.data;
    footerObj.backgroundColor = color.color;
    footerObj.fontColor = color.fontColor;
    setIsReloading(false);
    setFooterData(Object.assign(footerData, { data: footerObj }));

    if (elementType === 'node') {
      const nodeLegendObj = legendData.nodeLegend;

      if (Object.prototype.hasOwnProperty.call(nodeLegendObj, label)) {
        nodeLegendObj[label].color = color.color;
        nodeLegendObj[label].borderColor = color.borderColor;
        nodeLegendObj[label].fontColor = color.fontColor;
      }

      setLegendData(Object.assign(legendData, { nodeLegend: nodeLegendObj }));
      changeColorOnCytoscapeElements(elementType, label, color);
    } else if (elementType === 'edge') {
      const edgeLegendObj = legendData.edgeLegend;
      if (Object.prototype.hasOwnProperty.call(edgeLegendObj, label)) {
        edgeLegendObj[label].color = color.color;
        edgeLegendObj[label].borderColor = color.borderColor;
        edgeLegendObj[label].fontColor = color.fontColor;
      }
      setLegendData(Object.assign(legendData, { edgeLegend: edgeLegendObj }));
      changeColorOnCytoscapeElements(elementType, label, color);
    }

    dispatch(() => props.setLabels(elementType, label, {
      borderColor: color.borderColor,
      color: color.color,
      fontColor: color.fontColor,
    }));
  };

  const changeSizeOnCytoscapeElements = (elementType, label, size) => {
    const changedData = cytoscapeObject.elements(`${elementType}[label = "${label}"]`).data('size', size);

    if (size > 6) {
      changedData.style('text-background-opacity', 0);
    } else {
      changedData.style('text-background-opacity', 1);
    }
  };

  const sizeChange = (elementType, label, size) => {
    const footerObj = footerData.data;
    footerObj.size = size;
    setFooterData({ ...footerData, data: footerObj });
    setIsReloading(false);
    changeSizeOnCytoscapeElements(elementType, label, size);

    if (elementType === 'node') {
      const nodeLegendObj = legendData.nodeLegend;
      if (Object.prototype.hasOwnProperty.call(nodeLegendObj, label)) {
        nodeLegendObj[label].size = size;
      }
      setLegendData({ ...legendData, nodeLegend: nodeLegendObj });
    } else if (elementType === 'edge') {
      const edgeLegendObj = legendData.edgeLegend;
      if (Object.prototype.hasOwnProperty.call(edgeLegendObj, label)) {
        edgeLegendObj[label].size = size;
      }
      setLegendData({ ...legendData, edgeLegend: edgeLegendObj });
    }
    dispatch(() => props.setLabels(elementType, label, { size }));
  };

  const changeCaptionOnCytoscapeElements = (elementType, label, caption) => {
    cytoscapeObject.elements(`${elementType}[label = "${label}"]`).style('label', (ele) => {
      let displayValue = '< NULL >';
      if (caption === 'gid') {
        const idValue = ele.data('id');
        if (idValue !== null && idValue !== undefined) {
          displayValue = `[ ${idValue} ]`;
        }
      } else if (caption === 'label') {
        const labelValue = ele.data('label');
        if (labelValue !== null && labelValue !== undefined) {
          displayValue = `[ :${labelValue} ]`;
        }
      } else if (ele !== null && ele !== undefined) {
        const anonValue = ele.data('properties')[caption];
        if (anonValue !== null && anonValue !== undefined) {
          displayValue = anonValue;
        }
      }
      return displayValue;
    });
  };

  const applyFilterOnCytoscapeElements = (filters) => {
    const gFilteredClassName = 'g-filtered';
    cytoscapeObject.elements(`.${gFilteredClassName}`).style('opacity', '1.0').removeClass(gFilteredClassName);

    let notFilteredNodeLength = 0;
    const notFilteredNodes = [];
    const filterLength = filters.length;
    let nullFilterCount = 0;
    for (let i = 0; i < filterLength; i += 1) {
      const { keyword } = filters[i];
      if (keyword === null || keyword === '') {
        nullFilterCount += 1;
      }
    }
    if (nullFilterCount === 1 && filterLength === 1) {
      // if null filter size is 1 and filter length is 1 -> not filtering.
      return;
    }
    cytoscapeObject.nodes().filter((ele) => {
      let notIncluded = true;
      const currentLabel = ele.data('label');
      for (let i = 0; i < filterLength; i += 1) {
        const { keyword } = filters[i];
        const { label, property } = filters[i].property;

        if (currentLabel === label) {
          const propertyValue = ele.data('properties')[property];
          if (keyword === null || keyword === '') {
            notIncluded = false;
          } else if (propertyValue === undefined || propertyValue === null) {
            notIncluded = true;
          } else if (propertyValue.toString().includes(keyword)) {
            notIncluded = false;
          }
        }
        if (!notIncluded) {
          break;
        }
      }
      if (!notIncluded) {
        notFilteredNodeLength += 1;
        notFilteredNodes.push(ele);
      }
      return notIncluded;
    }).addClass(gFilteredClassName);

    // Step2. Edge Highlight from not filtered nodes.
    for (let nodeIndex = 0; nodeIndex < notFilteredNodeLength; nodeIndex += 1) {
      const currentNode = notFilteredNodes[nodeIndex];
      const edges = currentNode.connectedEdges();
      const edgesSize = edges.length;
      for (let edgeIndex = 0; edgeIndex < edgesSize; edgeIndex += 1) {
        const currentEdge = edges[edgeIndex];
        const connectedWithHighlightNode = currentEdge.connectedNodes().not(`.${gFilteredClassName}`).filter((ele) => ele !== currentNode);
        if (connectedWithHighlightNode.length === 0) currentEdge.addClass(gFilteredClassName);
      }
    }

    cytoscapeObject.elements(`.${gFilteredClassName}`).style('opacity', '0.5');
  };

  const captionChange = (elementType, label, caption) => {
    changeCaptionOnCytoscapeElements(elementType, label, caption);
    setSelectedCaption(caption);

    if (elementType === 'node') {
      const nodeLegendObj = legendData.nodeLegend;
      if (Object.prototype.hasOwnProperty.call(nodeLegendObj, label)) {
        nodeLegendObj[label].caption = caption;
      }
      setLegendData({ ...legendData, nodeLegend: nodeLegendObj });
    } else if (elementType === 'edge') {
      const edgeLegendObj = legendData.edgeLegend;
      if (Object.prototype.hasOwnProperty.call(edgeLegendObj, label)) {
        edgeLegendObj[label].caption = caption;
      }
      setLegendData({ ...legendData, edgeLegend: edgeLegendObj });
    }
    dispatch(() => props.setLabels(elementType, label, { caption }));
  };

  useImperativeHandle(ref, () => ({
    getCy() {
      return cytoscapeObject;
    },
    getLabels() {
      return Object.keys(props.data.legend.nodeLegend);
    },
    getCaptionsFromCytoscapeObject,
    applyFilterOnCytoscapeElements,
  }));

  const activeTab = (refKey, tabType) => {
    if (tabType === 'graph') {
      document.getElementById(`${refKey}-${tabType}`).classList.add('selected-frame-tab');
      document.getElementById(`${refKey}-${tabType}`).classList.remove('deselected-frame-tab');
      document.getElementById(`${refKey}-table`).classList.add('deselected-frame-tab');
      document.getElementById(`${refKey}-table`).classList.remove('selected-frame-tab');
    } else if (tabType === 'table') {
      document.getElementById(`${refKey}-${tabType}`).classList.add('selected-frame-tab');
      document.getElementById(`${refKey}-${tabType}`).classList.remove('deselected-frame-tab');
      document.getElementById(`${refKey}-graph`).classList.add('deselected-frame-tab');
      document.getElementById(`${refKey}-graph`).classList.remove('selected-frame-tab');
    }
  };

  return (
    <div className="chart-frame-area">
      <div className="contianer-frame-tab">
        <CypherResultCytoscapeLegend
          onLabelClick={getFooterData}
          isReloading={isReloading}
          legendData={legendData}
        />
        <div style={{
          display: 'flex', flexDirection: 'row', width: '20%', height: '96px', border: 'solid 1px #C4C4C4',
        }}
        >
          <button
            className="btn"
            type="button"
            style={{ width: '50%', fontSize: '18px', color: '#142B80' }}
            onClick={() => activeTab(props.refKey, 'graph')}
          >
            <i className="icon-graph" />
            <br />
            Graph
          </button>
          <div
            style={{
              backgroundColor: '#C4C4C4',
              width: '1px',
              height: '76px',
              marginTop: '20px',
            }}
          />
          <button
            className="btn"
            type="button"
            style={{ width: '50%', fontSize: '18px' }}
            onClick={() => activeTab(props.refKey, 'table')}
          >
            <FontAwesomeIcon icon={faTable} />
            <br />
            Table
          </button>
        </div>
      </div>
      <CypherResultCytoscapeChart
        onElementsMouseover={getFooterData}
        legendData={legendData}
        elements={elements}
        setCytoscapeObject={setCytoscapeObject}
        cytoscapeObject={cytoscapeObject}
        cytoscapeLayout={cytoscapeLayout}
        addLegendData={addLegendData}
        maxDataOfGraph={maxDataOfGraph}
      />
      <CypherResultCytoscapeFooter
        captions={captions}
        colorChange={colorChange}
        sizeChange={sizeChange}
        captionChange={captionChange}
        setCytoscapeLayout={setCytoscapeLayout}
        cytoscapeLayout={cytoscapeLayout}
        selectedCaption={selectedCaption}
        footerData={footerData}
        nodeLabelSizes={nodeLabelSizes}
        edgeLabelSizes={edgeLabelSizes}
        edgeLabelColors={edgeLabelColors}
        nodeLabelColors={nodeLabelColors}
      />
    </div>
  );
});

CypherResultCytoscape.propTypes = {
  maxDataOfGraph: PropTypes.number.isRequired,
  data: PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.string,
    legend: PropTypes.shape({
      // eslint-disable-next-line react/forbid-prop-types
      nodeLegend: PropTypes.any,
      // eslint-disable-next-line react/forbid-prop-types
      edgeLegend: PropTypes.any,
    }).isRequired,
    elements: PropTypes.shape({
      // eslint-disable-next-line react/forbid-prop-types
      edges: PropTypes.any,
      // eslint-disable-next-line react/forbid-prop-types
      nodes: PropTypes.any,
    }).isRequired,
  }).isRequired,
  setLabels: PropTypes.func.isRequired,
  refKey: PropTypes.string.isRequired,
};

export default CypherResultCytoscape;
