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

  const colorChange = (elementType, label, color) => {
    if (elementType === 'node') {
      let nodeLegendObj = legendData.nodeLegend
      if (nodeLegendObj.hasOwnProperty(label)) {
        nodeLegendObj[label] = [color.color, color.borderColor, color.fontColor]
      }      
      setLegendData(Object.assign({}, legendData, {nodeLegend : nodeLegendObj}))
      setFooterData({ type: 'labels', data: { type: 'node', backgroundColor: color.color, fontColor: color.fontColor, label: label } })
    } else if (elementType === 'edge') {
      let edgeLegendObj = legendData.edgeLegend
      if (edgeLegendObj.hasOwnProperty(label)) {
        edgeLegendObj[label] = [color.color, color.borderColor, color.fontColor]
      }
      setLegendData(Object.assign({}, legendData, {edgeLegend : edgeLegendObj}))
      setFooterData({ type: 'labels', data: { type: 'edge', backgroundColor: color.color, fontColor: color.fontColor, label: label } })

    }
    chartRef.current.colorChange(elementType, label, color);
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
    <CypherResultCytoscapeFooter colorChange={colorChange} footerData={footerData} labelColors={props.labelColors}/>
  </div>
})


export default CypherResultCytoscape