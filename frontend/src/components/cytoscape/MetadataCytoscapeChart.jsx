import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cytoscape from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';
import cola from 'cytoscape-cola';
import dagre from 'cytoscape-dagre';
import klay from 'cytoscape-klay';
import euler from 'cytoscape-euler';
import avsdf from 'cytoscape-avsdf';
import spread from 'cytoscape-spread';
import { defaultLayout } from './CytoscapeLayouts';
import { stylesheet } from './CytoscapeStyleSheet';
import conf from './CytoscapeConfig';

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

    this.state = {
      cytoscapeElement: null,
      cy: null,
      handleUserAction: this.handleUserAction.bind(this),
    };
  }

  componentDidMount() {
    const { cytoscapeElement } = this.state;

    conf.container = cytoscapeElement;
    conf.pan = { x: cytoscapeElement.offsetWidth / 3, y: 50 };
    conf.style = stylesheet;
    conf.layout = defaultLayout;

    this.setState({
      cy: cytoscape(conf),
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.elements.nodes.length === 0) {
      this.cy.add(nextProps.elements);
      this.cy.layout(defaultLayout).run();

      prevState.handleUserAction(nextProps, false);
    }
    return null;
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    const { cy } = this.state;
    cy.destroy();
  }

  handleUserAction(props, areNewElements) {
    const { cy } = this.state;
    const targetElements = areNewElements ? cy.elements('.new') : cy.elements();

    targetElements.bind('mouseover', (e) => {
      e.target.addClass('highlight');
    });

    targetElements.bind('mouseout', (e) => {
      e.target.removeClass('highlight');
    });

    targetElements.bind('click', (e) => {
      const ele = e.target;
      if (ele.selected() && ele.isNode()) {
        if (cy.nodes(':selected').size() === 1) {
          ele.neighborhood().selectify().select().unselectify();
        } else {
          cy.nodes(':selected').filter(`[id != "${ele.id()}"]`).neighborhood().selectify()
            .select()
            .unselectify();
        }
      } else {
        cy.elements(':selected').unselect().selectify();
      }
    });

    cy.bind('click', (e) => {
      if (e.target === cy) {
        cy.elements(':selected').unselect().selectify();
      }
    });
  }

  render() {
    return (
      <div
        className="chart-area metachart-area"
        ref={(el) => {
          this.setState({
            cytoscapeElement: el,
          });
        }}
      />
    );
  }
}

CytoscapeComponent.propTypes = {
  elements: PropTypes.shape({
    nodes: PropTypes.arrayOf(PropTypes.shape({
      // eslint-disable-next-line react/forbid-prop-types
      data: PropTypes.any,
    })),
    edges: PropTypes.arrayOf(PropTypes.shape({
      // eslint-disable-next-line react/forbid-prop-types
      data: PropTypes.any,
    })),
  }).isRequired,
};

export default CytoscapeComponent;
