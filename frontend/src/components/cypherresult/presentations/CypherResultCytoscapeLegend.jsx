import React from 'react';
import {Badge} from 'react-bootstrap'

const CypherResultCytoscapeLegend = ({legendData}) => {
  const {nodeLegend, edgeLegend} = legendData

  const nodeBadges = []
  const edgeBadges = []


  for (const [label, color] of Object.entries(nodeLegend)) {
    nodeBadges.push(<Badge className="px-3 py-2 mx-1 my-2" pill key={label} style={{ backgroundColor : color, fontSize : '0.9rem' }}>{label}</Badge>)
  }

  for (const [label, color] of Object.entries(edgeLegend)) {
    edgeBadges.push(<Badge className="px-3 py-2 mx-1 my-2" key={label} style={{ backgroundColor : color, fontSize : '0.9rem' }}>{label}</Badge>)
  }
  
    return <div className="legend-area" style={{ width: '100%'}}>
      <div className="nodeLegend">
      {nodeBadges}
      </div>
      {edgeBadges.length > 0 ? <div className="edgeLegend">{edgeBadges}</div> : ''}
      
    </div>
}


export default CypherResultCytoscapeLegend