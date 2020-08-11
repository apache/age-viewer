import React, {useState} from 'react';
import { Badge } from 'react-bootstrap'
import uuid from 'react-uuid'
import { updateLabelColor } from '../../../features/cypher/CypherUtil'

const CypherResultCytoscapeFooter = ({ footerData, labelColors, colorChange, sizeChange, captionChange }) => {

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
      const nodeSizeButton = (i) => {
        let size = (i * 3) + 12; 
        return <button onClick={() => sizeChange(footerData.data.type, footerData.data.label, ((i * 2 + 1) * 11))} 
        key={uuid()} 
        type="button" 
        className={"btn sizeSelector node " + (footerData.data.size >= (i * 2 + 1) * 11 ? " selectedSize " : "")} 
        style={{width: size+'px', height: size+'px'}} />
      }

      const edgeSizeButton = (i) => {
        let size = (i * 3) + 12; 
        return <button onClick={() => sizeChange(footerData.data.type, footerData.data.label, (i * 4 + i + 1))} 
        key={uuid()} 
        type="button" 
        className={"btn sizeSelector edge " + (footerData.data.size >= (i * 4 + i + 1) ? " selectedSize " : "")} 
        style={{width: size+18+'px', height: size+'px'}} />
      }

      return (
        <div className="pl-3">
          <Badge className="px-3 py-1" {...isEdge} style={{ backgroundColor: footerData.data.backgroundColor, color: footerData.data.fontColor }}>{footerData.data.label}</Badge>
          <span className="label">
            <span className="pl-3">Color : </span> 
            {labelColors.map((color)=>{return <button onClick={() => [updateLabelColor(footerData.data.label, color), colorChange(footerData.data.type, footerData.data.label, color)]} key={uuid()} type="button" className={"btn colorSelector " + (footerData.data.backgroundColor === color.color ? " selectedColor " : "")} style={{backgroundColor:color.color}}></button> })}
          </span>
          <span className="label">
            <span className="pl-3">Size : </span> 
            {Array(5).fill().map((_, i) => {
              if (footerData.data.type === 'node') {
                return nodeSizeButton(i)
              } else if (footerData.data.type === 'edge') {
                return edgeSizeButton(i)
              } 
              
            })}
          </span>
          <span className="label">
            <span className="pl-3">Caption : </span> 
            {footerData.data.captions.map((caption) => {
              return <button onClick={() => captionChange(footerData.data.type, footerData.data.label, caption)} key={uuid()} type="button" class={"btn captionSelector " + (footerData.data.selectedCaption === caption ? " btn-secondary " : " btn-outline-dark ")}><strong>&lt;{caption}&gt;</strong></button>
            })}

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