import React, {Component} from 'react';
import cytoscape from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';


cytoscape.use(COSEBilkent);

const getLabel = (data) => {
  const props = data.data('properties')
  if (props.name) {
    return props.name
  } else if (props.id) {
    return props.id
  } else {
    return data.data('id')
  }
}

const stylesheet = [
  {
    selector: 'node', 
    style: {
      width: 70,
      height: 70,
      label: function (ele) { return ele == null ? '' : getLabel(ele); },
      'background-color': function (ele) { return ele == null ? '#FFF' : ele.data('backgroundColor'); },
      'border-width': "3px",
      'border-color': function (ele) { return ele == null ? '#FFF' : ele.data('borderColor'); },
      'border-opacity': 0.6,
      "text-valign": "center",
      "text-halign": "center"
    }
  },
  {
    selector: 'node.highlight',
    style: {
      label: function (ele) { return ele == null ? '' : getLabel(ele); },
      'border-width': "10px",
      'border-color': "#B2EBF4",
      'border-opacity': 0.9
    }
  },
  {
    selector: 'edge',
    style: {
      width: 3,
      'line-color': function (ele) { return ele == null ? '#FFF' : ele.data('backgroundColor'); },
      'target-arrow-color': function (ele) { return ele == null ? '#FFF' : ele.data('backgroundColor'); },
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier'
    }
  },
  {
    selector: 'edge.highlight',
    style: {
      width: 6,
      'line-color': "#B2EBF4",
      'target-arrow-color': "#B2EBF4",
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier'
    }
  }
]

const layout = { name: 'cose-bilkent' }

const conf = {
  // Common Options
  style: stylesheet,
  layout: layout,
  // Viewport Options
  zoom: 1,
  // Interaction Options
  minZoom: 0.5,
  maxZoom: 4,
  zoomingEnabled: false, //true
  userZoomingEnabled: false, //true
  panningEnabled: true,
  userPanningEnabled: true,
  boxSelectionEnabled: false, //true
  selectionType: 'single',
  touchTapThreshold: 8,
  desktopTapThreshold: 4,
  autolock: false,
  autoungrabify: false,
  autounselectify: false,
  // Rendering Options
  headless: false,
  styleEnabled: true,
  hideEdgesOnViewport: false,
  textureOnViewport: false,
  motionBlur: false,
  motionBlurOpacity: 0.2,
  wheelSensitivity: 1,
  pixelRatio: 'auto'
};



class CytoscapeComponent extends Component{
  cy = null;

  componentDidMount(){
    conf.container = this.refs.cyelement;
    conf.pan = { x: this.refs.cyelement.offsetWidth / 3, y: 50 }
    let cy = cytoscape(conf);

    this.cy = cy;
  }

  shouldComponentUpdate(){
    return false;
  }

  componentWillReceiveProps(nextProps){
    if (this.props.elements.nodes.length === 0) {
      this.cy.add(nextProps.elements)
      this.cy.layout(layout).run()
      
      this.cy.elements().bind('mouseover', (e) => {
        nextProps.onElementsMouseover({type:'elements', data:e.target.data()})
        e.target.addClass('highlight')
      })
      this.cy.elements().bind('mouseout', (e) => {
        nextProps.onElementsMouseover({type:'background', data:{nodeCount: this.cy.nodes().size(), edgeCount: this.cy.edges().size()}})
        e.target.removeClass('highlight')
      })
      
    } else {
      this.cy.resize()
    }
  }

  componentWillUnmount(){
    this.cy.destroy();
  }
  

  resetChart() {
    this.props.elements.nodes = []
    this.props.elements.edges = []
  }

  getCy(){
    return this.cy;
  }

  render(){
    return <div className="chart-area" ref="cyelement" />
  }
}

export default CytoscapeComponent;