import React, {useState} from 'react';
import { Badge } from 'react-bootstrap'
import uuid from 'react-uuid'
import { updateLabelColor, updateNodeLabelSize, updateEdgeLabelSize, updateLabelCaption } from '../../../features/cypher/CypherUtil'

const CypherResultCytoscapeFooter = ({ footerData, edgeLabelColors, nodeLabelColors, nodeLabelSizes, edgeLabelSizes, colorChange, sizeChange, captionChange }) => {
  const [footerExpanded, setFooterExpanded] = useState(false)

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
        <div className="d-flex pl-3">
            <div className={"mr-auto graphFrameFooter "+ (footerExpanded ? "expandedGraphFrameFooter" : "" )}> 
              <Badge className="px-3 py-1" {...isEdge} style={{ backgroundColor: footerData.data.backgroundColor, color: footerData.data.fontColor }}>{footerData.data.label}</Badge>
              <span className="label"><strong className="pl-3">&lt;gid&gt; : </strong> {footerData.data.id}</span>
              {extractData(footerData.data.properties)}
            </div>
            <button className="frame-head-button btn btn-link px-3" onClick={() => setFooterExpanded(!footerExpanded)}>
              <span className={"fas " + ((footerExpanded ? "fa-angle-up" : "fa-angle-down" ))} aria-hidden="true" ></span>
            </button>
        </div>
      )

    } else if (footerData.type === 'background') {
      return <span className="label pl-3">Displaying <strong>{footerData.data.nodeCount}</strong> nodes, <strong>{footerData.data.edgeCount}</strong> edges</span>
    } else if (footerData.type === 'labels') {
      const isEdge = footerData.data.type === 'edge' ? {} : { pill: true }


      const generateButton = () => {
          if (footerData.data.type === 'node') {
            return nodeLabelSizes.map((labelSize, i) => {
              return nodeSizeButton(labelSize.size, i)
            })
          } else if (footerData.data.type === 'edge') {
            return edgeLabelSizes.map((labelSize, i) => {
              return edgeSizeButton(labelSize.size, i)
            })
          }           
      }
      
      const nodeSizeButton = (nodeSize, i) => {
        let size = (i * 3) + 12; 
        return <button onClick={() => [updateNodeLabelSize(footerData.data.label, nodeSize), sizeChange(footerData.data.type, footerData.data.label, nodeSize)]} 
        key={uuid()} 
        type="button" 
        className={"btn sizeSelector node " + (footerData.data.size >= nodeSize ? " selectedSize " : "")} 
        style={{width: size+'px', height: size+'px'}} />
      }

      const edgeSizeButton = (edgeSize, i) => {
        let size = (i * 3) + 12; 
        return <button onClick={() => [updateEdgeLabelSize(footerData.data.label, edgeSize), sizeChange(footerData.data.type, footerData.data.label, edgeSize)]} 
        key={uuid()} 
        type="button" 
        className={"btn sizeSelector edge " + (footerData.data.size >= edgeSize ? " selectedSize " : "")} 
        style={{width: size+18+'px', height: size+'px'}} />
      }

      const generateColors = () => {
        if (footerData.data.type === 'node') {
          return nodeLabelColors.map((color, i) => {
            return <button onClick={() => [updateLabelColor(footerData.data.type, footerData.data.label, color), colorChange(footerData.data.type, footerData.data.label, color)]} 
              key={uuid()} 
              type="button" 
              className={"btn colorSelector " + (footerData.data.backgroundColor === color.color ? " selectedColor " : "")} 
              style={{backgroundColor:color.color}}></button> 
          })
        } else if (footerData.data.type === 'edge') {          
          return edgeLabelColors.map((color, i) => {
            return <button onClick={() => [updateLabelColor(footerData.data.type, footerData.data.label, color), colorChange(footerData.data.type, footerData.data.label, color)]} 
              key={uuid()} 
              type="button" 
              className={"btn colorSelector " + (footerData.data.backgroundColor === color.color ? " selectedColor " : "")} 
              style={{backgroundColor:color.color}}></button> 
          })
        }           
    }

      return (
        <div className="d-flex pl-3">
          <div className={"mr-auto graphFrameFooter "+ (footerExpanded ? "expandedGraphFrameFooter" : "" )}> 
          <Badge className="px-3 py-1" {...isEdge} style={{ backgroundColor: footerData.data.backgroundColor, color: footerData.data.fontColor }}>{footerData.data.label}</Badge>
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
            {footerData.data.captions.map((caption) => {
              return <button onClick={() => [updateLabelCaption(footerData.data.type, footerData.data.label, caption), captionChange(footerData.data.type, footerData.data.label, caption)]} key={uuid()} type="button" class={"btn captionSelector " + (footerData.data.selectedCaption === caption ? " btn-secondary " : " btn-outline-dark ")}><strong>&lt;{caption}&gt;</strong></button>
            })}

          </span>
            </div>
            <button className="frame-head-button btn btn-link px-3" onClick={() => setFooterExpanded(!footerExpanded)}>
              <span className={"fas " + ((footerExpanded ? "fa-angle-up" : "fa-angle-down" ))} aria-hidden="true" ></span>
            </button>
        </div>
      )
    }
  }

  return <div className="chart-footer-area text-muted">
    {displayFooterData()}
  </div>
}


export default CypherResultCytoscapeFooter