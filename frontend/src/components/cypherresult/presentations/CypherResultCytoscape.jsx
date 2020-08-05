import React, {forwardRef, useRef, useState, useImperativeHandle} from 'react';
import CypherResultCytoscapeChart from './CypherResultCytoscapeChart'
import CypherResultCytoscapeLegend from './CypherResultCytoscapeLegend'
import CypherResultCytoscapeFooter from './CypherResultCytoscapeFooter'


const CypherResultCytoscape = forwardRef(( props, ref ) => {
  const [footerData, setFooterData] = useState({})
  const chartRef = useRef()

  const getElementProperties = (props) => {
    setFooterData(props)
  }

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
    <CypherResultCytoscapeChart onElementsMouseover={getElementProperties} ref={chartRef} elements={props.data.elements} />
    <CypherResultCytoscapeFooter footerData={footerData}/>
  </div>
})


export default CypherResultCytoscape