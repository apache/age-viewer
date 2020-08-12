import React, { Component } from 'react';
import { Badge } from 'react-bootstrap'
import uuid from 'react-uuid'

class CypherResultCytoscapeLegend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeBadges: new Map(),
      edgeBadges: new Map()
    }
  }



  componentDidMount() {
  }

  shouldComponentUpdate() {
    return true;
  }

  componentWillReceiveProps(nextProps) {
    let newNodeBadges = this.state.nodeBadges
    let newEdgeBadges = this.state.edgeBadges
    if (nextProps.isReloading) {
      newNodeBadges =  new Map()
      newEdgeBadges =  new Map()
    }

    for (const [label, legend] of Object.entries(nextProps.legendData.nodeLegend)) {        
      newNodeBadges.set(label, <Badge className="nodeLabel px-3 py-2 mx-1 my-2" pill key={uuid()} onClick={() => nextProps.onLabelClick({ type: 'labels', data: { type: 'node', backgroundColor: legend.color[0], fontColor: legend.color[2], size: legend.size, label: label } })} style={{ backgroundColor: legend.color[0], color: legend.color[2] }}>{label}</Badge>)
    }
    
    for (const [label, legend] of Object.entries(nextProps.legendData.edgeLegend)) {
      newEdgeBadges.set(label, <Badge className="edgeLabel px-3 py-2 mx-1 my-2" key={uuid()} onClick={() => nextProps.onLabelClick({ type: 'labels', data: { type: 'edge', backgroundColor: legend.color[0], fontColor: legend.color[2], size: legend.size, label: label } })} style={{ backgroundColor: legend.color[0], color: legend.color[2] }}>{label}</Badge>)
    }

    this.setState({nodeBadges : newNodeBadges})
    this.setState({edgeBadges : newEdgeBadges})


  }

  componentWillUnmount() {
  }


  render() {
    let nodeLedgend = []
    let edgeLedgend = []

    this.state.nodeBadges.forEach((value, key, mapObj) => {
      return nodeLedgend.push(value)
    })

    this.state.edgeBadges.forEach((value, key, mapObj) => {
      return edgeLedgend.push(value)
    })

    return <div className="legend-area" style={{ width: '100%' }}>
      <div className="nodeLegend">
        {nodeLedgend}
      </div>
      <div className="edgeLegend">
        {edgeLedgend}
      </div>

    </div>
  }
}
export default CypherResultCytoscapeLegend

