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
  forwardRef, useEffect, useImperativeHandle, useRef, useState,
} from 'react';
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
  const chartRef = useRef();

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

  const getFooterData = (props) => {
    if (props.type === 'labels') {
      props.data.captions = ['gid', 'label'].concat(Array.from(chartRef.current.getCaptions(props.data.type, props.data.label)));

      if (props.data.type === 'node') {
        props.data.selectedCaption = legendData.nodeLegend[props.data.label].caption;
      } else {
        props.data.selectedCaption = legendData.edgeLegend[props.data.label].caption;
      }
    }

    setFooterData(props);
  };

  const addLegendData = (addedLegendData) => {
    setIsReloading(false);
    setLegendData(addedLegendData);
  };

  const colorChange = (elementType, label, color) => {
    const footerObj = footerData.data;
    footerObj.backgroundColor = color.color;
    footerObj.fontColor = color.fontColor;
    setIsReloading(false);
    setFooterData(Object.assign(footerData, { data: footerObj }));

    if (elementType === 'node') {
      const nodeLegendObj = legendData.nodeLegend;

      if (nodeLegendObj.hasOwnProperty(label)) {
        nodeLegendObj[label].color = color.color;
        nodeLegendObj[label].borderColor = color.borderColor;
        nodeLegendObj[label].fontColor = color.fontColor;
      }

      setLegendData(Object.assign(legendData, { nodeLegend: nodeLegendObj }));
      chartRef.current.colorChange(elementType, label, color);
    } else if (elementType === 'edge') {
      const edgeLegendObj = legendData.edgeLegend;
      if (edgeLegendObj.hasOwnProperty(label)) {
        edgeLegendObj[label].color = color.color;
        edgeLegendObj[label].borderColor = color.borderColor;
        edgeLegendObj[label].fontColor = color.fontColor;
      }
      setLegendData(Object.assign(legendData, { edgeLegend: edgeLegendObj }));
      chartRef.current.colorChange(elementType, label, color);
    }

    dispatch(() => props.setLabels(elementType, label, {
      borderColor: color.borderColor,
      color: color.color,
      fontColor: color.fontColor,
    }));
  };

  const sizeChange = (elementType, label, size) => {
    const footerObj = footerData.data;
    footerObj.size = size;
    setFooterData({ ...footerData, data: footerObj });
    setIsReloading(false);
    chartRef.current.sizeChange(elementType, label, size);

    if (elementType === 'node') {
      const nodeLegendObj = legendData.nodeLegend;
      if (nodeLegendObj.hasOwnProperty(label)) {
        nodeLegendObj[label].size = size;
      }
      setLegendData({ ...legendData, nodeLegend: nodeLegendObj });
    } else if (elementType === 'edge') {
      const edgeLegendObj = legendData.edgeLegend;
      if (edgeLegendObj.hasOwnProperty(label)) {
        edgeLegendObj[label].size = size;
      }
      setLegendData({ ...legendData, edgeLegend: edgeLegendObj });
    }
    dispatch(() => props.setLabels(elementType, label, { size }));
  };

  const captionChange = (elementType, label, caption) => {
    chartRef.current.captionChange(elementType, label, caption);
    const footerObj = footerData.data;
    footerObj.captions = ['gid', 'label'].concat(Array.from(chartRef.current.getCaptions(elementType, label)));
    footerObj.selectedCaption = caption;
    setFooterData({ ...footerData, data: footerObj });

    if (elementType === 'node') {
      const nodeLegendObj = legendData.nodeLegend;
      if (nodeLegendObj.hasOwnProperty(label)) {
        nodeLegendObj[label].caption = caption;
      }
      setLegendData({ ...legendData, nodeLegend: nodeLegendObj });
    } else if (elementType === 'edge') {
      const edgeLegendObj = legendData.edgeLegend;
      if (edgeLegendObj.hasOwnProperty(label)) {
        edgeLegendObj[label].caption = caption;
      }
      setLegendData({ ...legendData, edgeLegend: edgeLegendObj });
    }
    dispatch(() => props.setLabels(elementType, label, { caption }));
  };

  const layoutChange = (layoutName) => {
    chartRef.current.layoutChange(layoutName);
  };

  useImperativeHandle(ref, () => ({

    getCy() {
      return chartRef.current.getCy();
    },

    resetChart() {
      return chartRef.current.resetChart();
    },
  }));

  return (
    <div className="chart-frame-area">
      <CypherResultCytoscapeLegend
        onLabelClick={getFooterData}
        isReloading={isReloading}
        legendData={legendData}
      />
      <CypherResultCytoscapeChart
        onElementsMouseover={getFooterData}
        ref={chartRef}
        legendData={legendData}
        elements={elements}
        addLegendData={addLegendData}
        maxDataOfGraph={maxDataOfGraph}
      />
      <CypherResultCytoscapeFooter
        colorChange={colorChange}
        sizeChange={sizeChange}
        captionChange={captionChange}
        layoutChange={layoutChange}
        footerData={footerData}
        nodeLabelSizes={nodeLabelSizes}
        edgeLabelSizes={edgeLabelSizes}
        edgeLabelColors={edgeLabelColors}
        nodeLabelColors={nodeLabelColors}
      />
    </div>
  );
});

export default CypherResultCytoscape;
