import React, {Component} from 'react';
import cytoscape from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';
import cola from 'cytoscape-cola'
import dagre from 'cytoscape-dagre'
import klay from 'cytoscape-klay'
import euler from 'cytoscape-euler'
import avsdf from 'cytoscape-avsdf'
import spread from 'cytoscape-spread'
import {defaultLayout} from './CytoscapeLayouts'
import {stylesheet} from './CytoscapeStyleSheet'
import {conf} from './CytoscapeConfig'

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
    this.cyelement = null;
    this.cy = ''
    this.menu = ''
  }

  componentDidMount() {
    conf.container = this.cyelement;
    conf.pan = { x: this.cyelement.offsetWidth / 3, y: 50 }
    conf.style = stylesheet
    conf.layout = defaultLayout
    this.cy = cytoscape(conf)
  }

  handleUserAction(props, areNewElements) {
    const targetElements = areNewElements ? this.cy.elements('.new') : this.cy.elements()

    targetElements.bind('mouseover', (e) => {
      props.onElementsMouseover({ type: 'elements', data: e.target.data() })
      e.target.addClass('highlight')
    })

    targetElements.bind('mouseout', (e) => {
      if (this.cy.elements(':selected').length === 0) {
        props.onElementsMouseover({ type: 'background', data: { nodeCount: this.cy.nodes().size(), edgeCount: this.cy.edges().size() } })
      } else {
        props.onElementsMouseover({ type: 'elements', data: this.cy.elements(':selected')[0].data() })
      }

      e.target.removeClass('highlight')
    })

    targetElements.bind('click', (e) => {
      const ele = e.target
      if (ele.selected() && ele.isNode()) {
        if (this.cy.nodes(':selected').size() === 1) {
          ele.neighborhood().selectify().select().unselectify()
        } else {
          this.cy.nodes(':selected').filter('[id != "'+ele.id()+'"]').neighborhood().selectify().select().unselectify()
        }
      } else {
        this.cy.elements(':selected').unselect().selectify()
      }
    })

    this.cy.bind('click', (e) => {
      if (e.target === this.cy) {
        this.cy.elements(':selected').unselect().selectify()
        props.onElementsMouseover({ type: 'background', data: { nodeCount: this.cy.nodes().size(), edgeCount: this.cy.edges().size() } })
      }
    })
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.elements.nodes.length === 0) {
      try{
        // todo fix MetaData query throws something wrong
        this.cy.add(nextProps.elements)
      }catch (e) {
        console.error(e);
      }
      this.cy.layout(defaultLayout).run()

      this.handleUserAction(nextProps, false)
    }
  }

  componentWillUnmount() {
    this.cy.destroy()
  }

  render() {
    return <div className="chart-area metachart-area" ref={el => this.cyelement = el} />
  }
}

export default CytoscapeComponent;