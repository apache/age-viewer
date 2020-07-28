import React, {useRef, useLayoutEffect, useEffect, useState} from 'react';
import Cytoscape from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';

Cytoscape.use(COSEBilkent);

const CypherResultCytoscape = ({data}) => {

    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({width: 0 , height: 0});

    useLayoutEffect(() => {
        if (targetRef.current) {
          setDimensions({
            width: targetRef.current.offsetWidth,
            height: targetRef.current.offsetHeight
          });
        }
    }, []);  


    const containerRef = useRef();

    useEffect(() => {

      const stylesheet = [
        {
          selector: 'node',
          style: {
            width: 70,
            height: 70,
            label: 'data(label)'
          }
        },
        {
          selector: 'edge',
          style: {
            width: 6
          }
        }
      ]
      const layout = { name : 'cose-bilkent' }
      console.log(data)
      const config = {
        // Common Options
        container: containerRef.current,
        style: stylesheet,
        elements: data,
        layout: layout,
        // Viewport Options
        zoom: 1,
        pan: { x: 0, y: 0 },
        // Interaction Options
        minZoom: 1e-50,
        maxZoom: 1e50,
        zoomingEnabled: true,
        userZoomingEnabled: true,
        panningEnabled: true,
        userPanningEnabled: true,
        boxSelectionEnabled: true,
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
  
      Cytoscape(config);
    }, [data]);



    return <div className="chart-area" ref={targetRef}><div ref={containerRef} style={ { width: dimensions.width , height: dimensions.height  } } /></div>
}


export default CypherResultCytoscape