import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';
import uuid from 'react-uuid';

const CypherResultCytoscapeFooter = ({
  footerData, edgeLabelColors, nodeLabelColors, nodeLabelSizes, edgeLabelSizes, colorChange, sizeChange, captionChange, layoutChange,
}) => {
  const [footerExpanded, setFooterExpanded] = useState(false);
  const [layout, setLayout] = useState('coseBilkent');

  const extractData = (d) => {
    const extractedData = [];
    for (let [alias, val] of Object.entries(d)) {
      val = typeof val === 'object' ? JSON.stringify(val) : val;
      extractedData.push(<span key={uuid()} className="label">
        <strong className="pl-3">
          {alias}
          {' '}
          :
          {' '}
        </strong>
        {' '}
        {val}
                         </span>);
    }
    return extractedData;
  };

  const displayFooterData = () => {
    if (footerData.type === 'elements') {
      const isEdge = footerData.data.source ? {} : { pill: true };

      return (
        <div className="d-flex pl-3">
          <div className={`mr-auto graphFrameFooter ${footerExpanded ? 'expandedGraphFrameFooter' : ''}`}>
            <Badge className="px-3 py-1" {...isEdge} style={{ backgroundColor: footerData.data.backgroundColor, color: footerData.data.fontColor }}>{footerData.data.label}</Badge>
            <span className="label">
              <strong className="pl-3">&lt;gid&gt; : </strong>
              {' '}
              {footerData.data.id}
            </span>
            {extractData(footerData.data.properties)}
          </div>
          <button className="frame-head-button btn btn-link px-3" onClick={() => setFooterExpanded(!footerExpanded)}>
            <span className={`fas ${footerExpanded ? 'fa-angle-up' : 'fa-angle-down'}`} aria-hidden="true" />
          </button>
        </div>
      );
    } if (footerData.type === 'background') {
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
        </div>
      );
    }
  };

  return (
    <div className="chart-footer-area text-muted">
      {displayFooterData()}
    </div>
  );
};

export default CypherResultCytoscapeFooter;
