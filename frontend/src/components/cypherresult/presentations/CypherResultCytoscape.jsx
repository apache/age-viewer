import React, {useRef, useLayoutEffect, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import CytoscapeComponent from 'react-cytoscapejs';

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

      const dispatch = useDispatch();
      const [queryResult, setQueryResult] = useState({})
  
      console.log("data>> ", data)

      const elements = [
        { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
        { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
        { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
    ]

    return <div className="chart-area" ref={targetRef}><CytoscapeComponent elements={elements} style={ { width: dimensions.width , height: dimensions.height  } } /></div>;
}


export default CypherResultCytoscape