/*
 * Copyright 2020 Bitnine Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
      if (this.props.legendData !== undefined && this.props.legendData.nodeLegend !== undefined) {
        let isChanged = false
        for (let [prevLabel, prevLegend] of Object.entries(this.props.legendData.nodeLegend)) {
          if (label === prevLabel && legend.color !== prevLegend.color) { isChanged = true }
          else if (label === prevLabel && legend.size !== prevLegend.size) { isChanged = true }
          else if (label === prevLabel && legend.caption !== prevLegend.caption) { isChanged = true }
        }

        if (isChanged) { nextProps.onLabelClick({ type: 'labels', data: { type: 'node', backgroundColor: legend.color, fontColor: legend.fontColor, size: legend.size, label: label } }) }
      }

      newNodeBadges.set(label, <Badge className="nodeLabel px-3 py-2 mx-1 my-2" pill key={uuid()} onClick={() => nextProps.onLabelClick({ type: 'labels', data: { type: 'node', backgroundColor: legend.color, fontColor: legend.fontColor, size: legend.size, label: label } })} style={{ backgroundColor: legend.color, color: legend.fontColor }}>{label}</Badge>)
    }


    for (const [label, legend] of Object.entries(nextProps.legendData.edgeLegend)) {
      if (this.props.legendData !== undefined && this.props.legendData.edgeLegend !== undefined) {
          let isChanged = false
          for (let [prevLabel, prevLegend] of Object.entries(this.props.legendData.edgeLegend)) {
            if (label === prevLabel && legend.color !== prevLegend.color) { isChanged = true }
            else if (label === prevLabel && legend.size !== prevLegend.size) { isChanged = true }
            else if (label === prevLabel && legend.caption !== prevLegend.caption) { isChanged = true }
          }

          if (isChanged) { nextProps.onLabelClick({ type: 'labels', data: { type: 'edge', backgroundColor: legend.color, fontColor: legend.fontColor, size: legend.size, label: label } }) }
      }
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

