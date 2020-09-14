import React, { Component } from 'react';
import { Badge } from 'react-bootstrap'
import uuid from 'react-uuid'

class CypherResultCytoscapeLegend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeBadges: new Map(),
      edgeBadges: new Map(),
      nodeLegendExpanded: false,
      edgeLegendExpanded: false
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
      newNodeBadges.set(label, <Badge className="nodeLabel px-3 py-2 mx-1 my-2" pill key={uuid()} onClick={() => nextProps.onLabelClick({ type: 'labels', data: { type: 'node', backgroundColor: legend.color, fontColor: legend.fontColor, size: legend.size, label: label } })} style={{ backgroundColor: legend.color, color: legend.fontColor }}>{label}</Badge>)
    }
    

    for (const [label, legend] of Object.entries(nextProps.legendData.edgeLegend)) {
      newEdgeBadges.set(label, <Badge className="edgeLabel px-3 py-2 mx-1 my-2" key={uuid()} onClick={() => nextProps.onLabelClick({ type: 'labels', data: { type: 'edge', backgroundColor: legend.color, fontColor: legend.fontColor, size: legend.size, label: label } })} style={{ backgroundColor: legend.color, color: legend.fontColor }}>{label}</Badge>)
    }

    this.setState({nodeBadges : newNodeBadges})
    this.setState({edgeBadges : newEdgeBadges})
  }

  componentWillUnmount() {
  }

  componentDidUpdate() {
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
      <div className="d-flex nodeLegend">
        <div className={"mr-auto legends legend " + (this.state.nodeLegendExpanded ? "expandedLegend" : "" )}>
        {nodeLedgend}
        </div>
        <button className="frame-head-button btn btn-link px-3" onClick={() => this.setState({nodeLegendExpanded : !this.state.nodeLegendExpanded})}>
          <span className={"fas " + ((this.state.nodeLegendExpanded ? "fa-angle-up" : "fa-angle-down" ))} aria-hidden="true" ></span>
        </button>
      </div>
      <div className="d-flex edgeLegend">
        <div className={"mr-auto legends legend " + (this.state.edgeLegendExpanded ? "expandedLegend" : "" )}>
        {edgeLedgend}
        </div>
        <button className="frame-head-button btn btn-link px-3" onClick={() => this.setState({edgeLegendExpanded : !this.state.edgeLegendExpanded})}>
          <span className={"fas " + ((this.state.edgeLegendExpanded ? "fa-angle-up" : "fa-angle-down" ))} aria-hidden="true" ></span>
        </button>
      </div>

    </div>
  }
}
export default CypherResultCytoscapeLegend

