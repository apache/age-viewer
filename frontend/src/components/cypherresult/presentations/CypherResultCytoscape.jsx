import React, {forwardRef, useRef, useImperativeHandle} from 'react';
import CypherResultCytoscapeChart from './CypherResultCytoscapeChart'
import CypherResultCytoscapeLegend from './CypherResultCytoscapeLegend'
import CypherResultCytoscapeFooter from './CypherResultCytoscapeFooter'


const CypherResultCytoscape = forwardRef(( props, ref ) => {
  const chartRef = useRef()

  useImperativeHandle(ref, () => ({

    getCy() {
      return chartRef.current.getCy();
    },

    resetChart() {
      return chartRef.current.resetChart();
    }

  }));

  return <div className="chart-frame-area">
    <CypherResultCytoscapeLegend legendData={props.data['legend']} />
    <CypherResultCytoscapeChart ref={chartRef} elements={props.data.elements} />
    <CypherResultCytoscapeFooter />
  </div>
})


export default CypherResultCytoscape