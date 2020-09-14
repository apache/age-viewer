import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';
import cola from 'cytoscape-cola'
import dagre from 'cytoscape-dagre'
import klay from 'cytoscape-klay'
import euler from 'cytoscape-euler'
import avsdf from 'cytoscape-avsdf'
import spread from 'cytoscape-spread'
import { defaultLayout } from './CytoscapeLayouts'
import { stylesheet } from './CytoscapeStyleSheet'
import { conf } from './CytoscapeConfig'

cytoscape.use(COSEBilkent);
cytoscape.use(cola);
cytoscape.use(dagre);
cytoscape.use(klay);
cytoscape.use(euler);
cytoscape.use(avsdf);
cytoscape.use(spread);

class CytoscapeComponent extends Component {
  constructor(props) {
    super(props);
    this.cy = ''
    this.menu = ''
  }

  componentDidMount() {
    conf.container = this.refs.cyelement;
    conf.pan = { x: this.refs.cyelement.offsetWidth / 3, y: 50 } 
    conf.style = stylesheet
    conf.layout = defaultLayout
    let initCy = cytoscape(conf);
    this.cy = initCy
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    console.log("this.props >>>>>>>>>", this.props.elements.nodes.length)
    console.log("nextProps >>>>>>>>>>>", nextProps.elements)
    if (this.props.elements.nodes.length === 0) {
      this.cy.add(nextProps.elements)
      this.cy.layout(defaultLayout).run()
    }
  }

  componentWillUnmount() {
    this.cy.destroy()
  }

  render() {
    return <div id="cyto" className="chart-area" ref="cyelement" />
  }
}

export default CytoscapeComponent;