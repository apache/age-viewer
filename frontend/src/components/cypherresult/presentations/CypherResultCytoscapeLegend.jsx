import React, {Component} from 'react';
import {Badge} from 'react-bootstrap'
import uuid from 'react-uuid'

class CypherResultCytoscapeLegend extends Component{

  nodeBadges = []
  edgeBadges = []

  componentDidMount(){
  }

  shouldComponentUpdate(){
    return true;
  }

  componentWillReceiveProps(nextProps){
    if (Object.keys(this.props.legendData.nodeLegend).length === 0 && Object.keys(this.props.legendData.edgeLegend).length === 0) {
        console.log("nextProps.legendData.nodeLegend >> " , nextProps.legendData.nodeLegend)
        for (const [label, color] of Object.entries(nextProps.legendData.nodeLegend)) {
          this.nodeBadges.push(<Badge className="px-3 py-2 mx-1 my-2" pill key={uuid()} style={{ backgroundColor : color[0], fontSize : '0.9rem' }}>{label}</Badge>)
          
        }
      
  
        for (const [label, color] of Object.entries(nextProps.legendData.edgeLegend)) {
          this.edgeBadges.push(<Badge className="px-3 py-2 mx-1 my-2" key={uuid()} style={{ backgroundColor : color[0], fontSize : '0.9rem' }}>{label}</Badge>)
        }

    }

  }

  componentWillUnmount(){
  }


  render(){
    return <div className="legend-area" style={{ width: '100%'}}>
      <div className="nodeLegend">
      {this.nodeBadges}
      </div>
      <div className="edgeLegend">
      {this.edgeBadges}
      </div>
      
    </div>
  }
}
export default CypherResultCytoscapeLegend

