import React from 'react';
import {Badge} from 'react-bootstrap'

const CypherResultCytoscapeLegend = ({legendData}) => {
  const {nodeColors, edgeColors} = legendData

  const nodeBadges = []
  const edgeBadges = []


  for (const [label, color] of Object.entries(nodeColors)) {
    nodeBadges.push(<Badge className="px-3 mx-1" pill key={label} style={{ backgroundColor : color, fontSize : '0.9rem' }}>{label}</Badge>)
  }

  for (const [label, color] of Object.entries(edgeColors)) {
    edgeBadges.push(<Badge className="px-3 mx-1" key={label} style={{ backgroundColor : color, fontSize : '0.9rem' }}>{label}</Badge>)
  }
  
    return <div className="legend-area pt-2" style={{ width: '100%', height:'50px', position:'absolute', 'zIndex':100}}>
      <div className="nodeLegend" style={{ width: '100%' }}>
      {nodeBadges}
      </div>
      <div className="edgeLegend" style={{ width: '100%' }}>
      {edgeBadges}
      </div>
    </div>
}


export default CypherResultCytoscapeLegend