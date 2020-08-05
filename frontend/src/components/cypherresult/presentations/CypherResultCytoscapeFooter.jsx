import React from 'react';
import { Badge } from 'react-bootstrap'
import uuid from 'react-uuid'

const CypherResultCytoscapeFooter = ({ footerData }) => {
  const extractData = (d) => {
    let extractedData = []
    for (const [alias, val] of Object.entries(d)) {
      extractedData.push(<span key={uuid()} className="label"><strong className="pl-3">{alias} : </strong> {val}</span>)
    }
    return extractedData
  }
  const displayFooterData = () => {

    if (footerData.type === 'elements') {
      const isEdge = footerData.data.source ? {} : { pill: true }

      return (
        <div className="pl-3">
          <Badge className="px-3 py-1" {...isEdge} style={{ backgroundColor: footerData.data.backgroundColor, fontSize: '0.9rem' }}>{footerData.data.label}</Badge>
          <span className="label"><strong className="pl-3">&lt;gid&gt; : </strong> {footerData.data.id}</span>
          {extractData(footerData.data.properties)}
        </div>
      )

    } else if (footerData.type === 'background') {
      return <span className="label pl-3">Displaying <strong>{footerData.data.nodeCount}</strong> nodes, <strong>{footerData.data.edgeCount}</strong> edges</span>
    }
  }

  return <div className="chart-footer-area">
    {displayFooterData()}
  </div>
}


export default CypherResultCytoscapeFooter