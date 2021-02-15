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
import { Badge } from 'react-bootstrap';
import uuid from 'react-uuid';
import {
  updateEdgeLabelSize,
  updateLabelCaption,
  updateLabelColor,
  updateNodeLabelSize,
} from '../../features/cypher/CypherUtil';

const CypherResultCytoscapeFooter = ({
  footerData,
  edgeLabelColors,
  nodeLabelColors,
  nodeLabelSizes,
  edgeLabelSizes,
  colorChange,
  sizeChange,
  captionChange,
  layoutChange,
  selectedCaption,
  captions,
}) => {
  const [footerExpanded, setFooterExpanded] = useState(false);
  const [layout, setLayout] = useState('coseBilkent');

  const extractData = (d) => {
    const extractedData = [];
    for (let [alias, val] of Object.entries(d)) {
      val = typeof val === 'object' ? JSON.stringify(val) : val;
      extractedData.push(
        <span key={uuid()} className="label">
          <strong className="pl-3">
            {alias}
            {' '}
            :
            {' '}
          </strong>
          {' '}
          {val}
        </span>,
      );
    }
    return extractedData;
  };

  const displayFooterData = () => {
    if (footerData.type === 'elements') {
      const isEdge = footerData.data.source ? {} : { pill: true };

      return (
        <div className="d-flex pl-3">
          <div className={`mr-auto graphFrameFooter ${footerExpanded ? 'expandedGraphFrameFooter' : ''}`}>
            <Badge
              className="px-3 py-1"
              {...isEdge}
              style={{
                backgroundColor: footerData.data.backgroundColor,
                color: footerData.data.fontColor,
              }}
            >
              {footerData.data.label}
            </Badge>
            <span className="label">
              <strong className="pl-3">&lt;gid&gt; : </strong>
              {' '}
              {footerData.data.id}
            </span>
            {extractData(footerData.data.properties)}
          </div>
          <button
            className="frame-head-button btn btn-link px-3"
            onClick={() => setFooterExpanded(!footerExpanded)}
          >
            <span className={`fas ${footerExpanded ? 'fa-angle-up' : 'fa-angle-down'}`} aria-hidden="true" />
          </button>
        </div>
      );
    }
    if (footerData.type === 'background') {
      return (
        <div className="d-flex pl-3">
          <div className="mr-auto label pl-3">
            Displaying
            <strong>{footerData.data.nodeCount}</strong>
            {' '}
            nodes,
            <strong>{footerData.data.edgeCount}</strong>
            {' '}
            edges
          </div>
          <label htmlFor="selectLayout" className="col-form-label px-1">Layout : </label>
          <select
            id="selectLayout"
            className="col-1 custom-select custom-select-sm layout-select"
            defaultValue={layout}
            onChange={(e) => [setLayout(e.target.value), layoutChange(e.target.value)]}
          >
            <option value="random">Random</option>
            <option value="grid">Grid</option>
            <option value="breadthFirst">Breadth-First</option>
            <option value="concentric">Concentric</option>
            <option value="cola">Cola</option>
            <option value="cose">Cose</option>
            <option value="coseBilkent">Cose-Bilkent</option>
            <option value="dagre">Dagre</option>
            <option value="klay">Klay</option>
            <option value="euler">Euler</option>
            <option value="avsdf">Avsdf</option>
            <option value="spread">Spread</option>
          </select>
        </div>
      );
    }
    if (footerData.type === 'labels') {
      const isEdge = footerData.data.type === 'edge' ? {} : { pill: true };

      const generateButton = () => {
        if (footerData.data.type === 'node') {
          return nodeLabelSizes.map((labelSize, i) => nodeSizeButton(labelSize.size, i));
        }
        if (footerData.data.type === 'edge') {
          return edgeLabelSizes.map((labelSize, i) => edgeSizeButton(labelSize.size, i));
        }
      };

      const nodeSizeButton = (nodeSize, i) => {
        const size = (i * 3) + 12;
        return (
          <button
            onClick={() => [updateNodeLabelSize(footerData.data.label, nodeSize),
              sizeChange(footerData.data.type, footerData.data.label, nodeSize)]}
            key={uuid()}
            type="button"
            className={`btn sizeSelector node ${footerData.data.size >= nodeSize ? ' selectedSize ' : ''}`}
            style={{ width: `${size}px`, height: `${size}px` }}
          />
        );
      };

      const edgeSizeButton = (edgeSize, i) => {
        const size = (i * 3) + 12;
        return (
          <button
            onClick={() => [updateEdgeLabelSize(footerData.data.label, edgeSize),
              sizeChange(footerData.data.type, footerData.data.label, edgeSize)]}
            key={uuid()}
            type="button"
            className={`btn sizeSelector edge ${footerData.data.size >= edgeSize ? ' selectedSize ' : ''}`}
            style={{ width: `${size + 18}px`, height: `${size}px` }}
          />
        );
      };

      const generateColors = () => {
        if (footerData.data.type === 'node') {
          return nodeLabelColors.map((color, i) => (
            <button
              onClick={() => [
                updateLabelColor(footerData.data.type, footerData.data.label, color),
                colorChange(footerData.data.type, footerData.data.label, color)]}
              key={uuid()}
              type="button"
              className={`btn colorSelector ${footerData.data.backgroundColor === color.color ? ' selectedColor ' : ''}`}
              style={{ backgroundColor: color.color }}
            />
          ));
        }
        if (footerData.data.type === 'edge') {
          return edgeLabelColors.map((color, i) => (
            <button
              onClick={() => [
                updateLabelColor(footerData.data.type, footerData.data.label, color),
                colorChange(footerData.data.type, footerData.data.label, color)]}
              key={uuid()}
              type="button"
              className={`btn colorSelector ${footerData.data.backgroundColor === color.color ? ' selectedColor ' : ''}`}
              style={{ backgroundColor: color.color }}
            />
          ));
        }
      };

      return (
        <div className="d-flex pl-3">
          <div className={`mr-auto graphFrameFooter ${footerExpanded ? 'expandedGraphFrameFooter' : ''}`}>
            <Badge
              className="px-3 py-1"
              {...isEdge}
              style={{
                backgroundColor: footerData.data.backgroundColor,
                color: footerData.data.fontColor,
              }}
            >
              {footerData.data.label}
            </Badge>
            <span className="label">
              <span className="pl-3">Color : </span>
              {generateColors()}
            </span>
            <span className="label">
              <span className="pl-3">Size : </span>
              {generateButton()}
            </span>
            <span className="label">
              <span className="pl-3">Caption : </span>
              {captions.map((caption) => (
                <button
                  onClick={() => [
                    updateLabelCaption(footerData.data.type, footerData.data.label, caption),
                    captionChange(footerData.data.type, footerData.data.label, caption)]}
                  key={uuid()}
                  type="button"
                  className={`btn captionSelector ${selectedCaption === caption ? ' btn-secondary ' : ' btn-outline-dark '}`}
                >
                  <strong>
                    &lt;
                    {caption}
                    &gt;
                  </strong>
                </button>
              ))}

            </span>
          </div>
          <button
            className="frame-head-button btn btn-link px-3"
            onClick={() => setFooterExpanded(!footerExpanded)}
          >
            <span className={`fas ${footerExpanded ? 'fa-angle-up' : 'fa-angle-down'}`} aria-hidden="true" />
          </button>
        </div>
      );
    }
    return (
      <div className="d-flex pl-3">
        <div className="mr-auto label pl-3" />
        <label htmlFor="selectLayout" className="col-form-label px-1">Layout : </label>
        <select
          id="selectLayout"
          className="col-1 custom-select custom-select-sm layout-select"
          defaultValue={layout}
          onChange={(e) => [setLayout(e.target.value), layoutChange(e.target.value)]}
        >
          <option value="random">Random</option>
          <option value="grid">Grid</option>
          <option value="breadthFirst">Breadth-First</option>
          <option value="concentric">Concentric</option>
          <option value="cola">Cola</option>
          <option value="cose">Cose</option>
          <option value="coseBilkent">Cose-Bilkent</option>
          <option value="dagre">Dagre</option>
          <option value="klay">Klay</option>
          <option value="euler">Euler</option>
          <option value="avsdf">Avsdf</option>
          <option value="spread">Spread</option>
        </select>
      </div>
    );
  };

  return (
    <div className="chart-footer-area text-muted">
      {displayFooterData()}
    </div>
  );
};

export default CypherResultCytoscapeFooter;
