import React, { useRef,  useEffect } from 'react';
import Cytoscape from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';
import CypherResultCytoscapeLegend from './CypherResultCytoscapeLegend'
import CypherResultCytoscapeFooter from './CypherResultCytoscapeFooter'

Cytoscape.use(COSEBilkent);

const CypherResultCytoscape = ({ data }) => {

  const targetRef = useRef();
  useEffect(() => {

    const stylesheet = [
      {
        selector: 'node',
        style: {
          width: 70,
          height: 70,
          label: 'data(label)',
          'background-color': function (ele) { return ele == null ? '#FFF' : ele.data('backgroundColor'); },
          "text-valign": "center",
          "text-halign": "center"
        }
      },
      {
        selector: 'edge',
        style: {
          width: 6,
          'line-color': function (ele) { return ele == null ? '#FFF' : ele.data('backgroundColor'); }
        }
      }
    ]

    const layout = { name: 'cose-bilkent' }

    const config = {
      // Common Options
      container: targetRef.current,
      style: stylesheet,
      elements: data['elements'],
      layout: layout,
      // Viewport Options
      zoom: 1,
      pan: { x: targetRef.current.offsetWidth / 3, y: 0 },
      // Interaction Options
      minZoom: 1e-50,
      maxZoom: 1e50,
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

    const cy = Cytoscape(config);
    cy.resize()
    cy.fit()


  }, [data]);

  return <div className="chart-frame-area">
    <CypherResultCytoscapeLegend legendData={data['legend']} />
    <div id="chart-area" ref={targetRef} ></div>
    <CypherResultCytoscapeFooter />
  </div>
}


export default CypherResultCytoscape