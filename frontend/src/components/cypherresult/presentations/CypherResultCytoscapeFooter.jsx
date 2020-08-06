import React, {useState} from 'react';
import { Badge } from 'react-bootstrap'
import uuid from 'react-uuid'

const CypherResultCytoscapeFooter = ({ footerData, labelColors, colorChange }) => {

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
          <Badge className="px-3 py-1" {...isEdge} style={{ backgroundColor: footerData.data.backgroundColor, color: footerData.data.fontColor }}>{footerData.data.label}</Badge>
          <span className="label"><strong className="pl-3">&lt;gid&gt; : </strong> {footerData.data.id}</span>
          {extractData(footerData.data.properties)}
        </div>
      )

    } else if (footerData.type === 'background') {
      return <span className="label pl-3">Displaying <strong>{footerData.data.nodeCount}</strong> nodes, <strong>{footerData.data.edgeCount}</strong> edges</span>
    } else if (footerData.type === 'labels') {
      const isEdge = footerData.data.type === 'edge' ? {} : { pill: true }

      return (
        <div className="pl-3">
          <Badge className="px-3 py-1" {...isEdge} style={{ backgroundColor: footerData.data.backgroundColor, color: footerData.data.fontColor }}>{footerData.data.label}</Badge>
          <span className="label">
            <span className="pl-3">Color : </span> 
            {labelColors.map((color)=>{return <button onClick={() => colorChange(footerData.data.type, footerData.data.label, color)} key={uuid()} type="button" className={"btn colorSelector " + (footerData.data.backgroundColor === color.color ? " selectedColor " : "")} style={{backgroundColor:color.color}}></button> })}
          </span>
          <span className="label">
            <span className="pl-3">Size : </span> 
            {Array(5).fill().map((_, i) => {let size = (i * 3) + 12; return <button key={uuid()} type="button" className={"btn sizeSelector"} style={{width: size+'px', height: size+'px'}}></button>})}
          </span>
          <span className="label">
            <span className="pl-3">Caption : </span> 
            <button type="button" class="btn btn-outline-dark captionSelector"><strong>&lt;id&gt;</strong></button>
            <button type="button" class="btn btn-outline-dark captionSelector"><strong>&lt;name&gt;</strong></button>

          </span>
        </div>
      )
    }
  }

  return <div className="chart-footer-area text-muted">
    {displayFooterData()}
  </div>
}


export default CypherResultCytoscapeFooter