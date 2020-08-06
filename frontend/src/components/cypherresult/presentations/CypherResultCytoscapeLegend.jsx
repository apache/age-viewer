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
    for (const [label, color] of Object.entries(nextProps.legendData.nodeLegend)) {
      this.state.nodeBadges.set(label, <Badge className="nodeLabel px-3 py-2 mx-1 my-2" pill key={uuid()} onClick={() => nextProps.onLabelClick({ type: 'labels', data: { type: 'node', backgroundColor: color[0], fontColor: color[2], label: label } })} style={{ backgroundColor: color[0], color: color[2] }}>{label}</Badge>)
    }


    for (const [label, color] of Object.entries(nextProps.legendData.edgeLegend)) {
      this.state.edgeBadges.set(label, <Badge className="edgeLabel px-3 py-2 mx-1 my-2" key={uuid()} onClick={() => nextProps.onLabelClick({ type: 'labels', data: { type: 'edge', backgroundColor: color[0], fontColor: color[2], label: label } })} style={{ backgroundColor: color[0], color: color[2] }}>{label}</Badge>)
    }


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

