import React, {forwardRef, useEffect, useRef, useState, useImperativeHandle} from 'react';
import CypherResultCytoscapeChart from './CypherResultCytoscapeChart'
import CypherResultCytoscapeLegend from './CypherResultCytoscapeLegend'
import CypherResultCytoscapeFooter from './CypherResultCytoscapeFooter'


const CypherResultCytoscape = forwardRef(( props, ref ) => {
  const [footerData, setFooterData] = useState({})
  const [legendData, setLegendData] = useState(props.data.legend)
  const [elements, setElements] = useState(props.data.elements)
  const chartRef = useRef()

  useEffect(() => {
    if (props.data['legend'] !== undefined && Object.keys(props.data['legend']['nodeLegend']).length > 0){
      setLegendData(props.data['legend'])
      setElements(props.data.elements)
    }
  })
  const getFooterData = (props) => {
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
    <CypherResultCytoscapeLegend onLabelClick={getFooterData} legendData={legendData} />
    <CypherResultCytoscapeChart onElementsMouseover={getFooterData} ref={chartRef} elements={elements} />
    <CypherResultCytoscapeFooter footerData={footerData} labelColors={props.labelColors}/>
  </div>
})


export default CypherResultCytoscape