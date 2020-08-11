import React, {forwardRef, useEffect, useRef, useState, useImperativeHandle} from 'react';
import CypherResultCytoscapeChart from './CypherResultCytoscapeChart'
import CypherResultCytoscapeLegend from './CypherResultCytoscapeLegend'
import CypherResultCytoscapeFooter from './CypherResultCytoscapeFooter'


const CypherResultCytoscape = forwardRef(( props, ref ) => {
  const [footerData, setFooterData] = useState({})
  const [legendData, setLegendData] = useState({edgeLegend:{}, nodeLegend:{}})
  const [elements, setElements] = useState({edges:[], nodes:[]})
  const chartRef = useRef()

  useEffect(() => {
    if (props.data['legend'] !== undefined && Object.keys(props.data['legend']['nodeLegend']).length > 0){

      if (Object.keys(legendData.edgeLegend).length === 0 && Object.keys(legendData.nodeLegend).length === 0) {
        setLegendData(props.data['legend'])
      }
      
      if (elements.edges.length === 0 && elements.nodes.length === 0) {
        setElements(props.data.elements)
      }      
    }
  })

  const getFooterData = (props) => {
    if (props.type === 'labels') {
      props.data['captions'] = ['gid', 'label'].concat(Array.from(chartRef.current.getCaptions(props.data.type, props.data.label)))
      props.data['selectedCaption'] = chartRef.current.getCurrecntCaption(props.data.type, props.data.label)
    }
    
    setFooterData(props)
  }

  const addLegendData = (addedLegendData) => {
    setLegendData(addedLegendData)
  }

  const colorChange = (elementType, label, color) => {          
    let footerObj = footerData.data
    footerObj.backgroundColor = color.color
    footerObj.fontColor = color.fontColor
    setFooterData(Object.assign({}, footerData, {data: footerObj}))

    if (elementType === 'node') {
      let nodeLegendObj = legendData.nodeLegend
      if (nodeLegendObj.hasOwnProperty(label)) {
        nodeLegendObj[label].color = [color.color, color.borderColor, color.fontColor]
      }
      setLegendData(Object.assign({}, legendData, {nodeLegend : nodeLegendObj}))
      chartRef.current.colorChange(elementType, label, color);
      
    } else if (elementType === 'edge') {
      let edgeLegendObj = legendData.edgeLegend
      if (edgeLegendObj.hasOwnProperty(label)) {
        edgeLegendObj[label].color = [color.color, color.borderColor, color.fontColor]
      }
      setLegendData(Object.assign({}, legendData, {edgeLegend : edgeLegendObj}))
      chartRef.current.colorChange(elementType, label, Object.assign(color, {fontColor: '#2A2C34'}));
    }
  }

  const sizeChange = (elementType, label, size) => {          
    let footerObj = footerData.data
    footerObj.size = size
    setFooterData(Object.assign({}, footerData, {data: footerObj}))
    chartRef.current.sizeChange(elementType, label, size);

    if (elementType === 'node') {
      let nodeLegendObj = legendData.nodeLegend
      if (nodeLegendObj.hasOwnProperty(label)) {
        nodeLegendObj[label].size = size
      }      
      setLegendData(Object.assign({}, legendData, {nodeLegend : nodeLegendObj}))
    } else if (elementType === 'edge') {
      let edgeLegendObj = legendData.edgeLegend
      if (edgeLegendObj.hasOwnProperty(label)) {
        edgeLegendObj[label].size = size
      }
      setLegendData(Object.assign({}, legendData, {edgeLegend : edgeLegendObj}))
    }
  }

  const captionChange = (elementType, label, caption) => {
    chartRef.current.captionChange(elementType, label, caption);    
    let footerObj = footerData.data
    footerObj.captions = ['gid', 'label'].concat(Array.from(chartRef.current.getCaptions(elementType, label)))
    footerObj.selectedCaption = chartRef.current.getCurrecntCaption(elementType, label)
    setFooterData(Object.assign({}, footerData, {caption: caption}))
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
    <CypherResultCytoscapeChart onElementsMouseover={getFooterData} ref={chartRef} elements={elements} addLegendData={addLegendData}/>
    <CypherResultCytoscapeFooter colorChange={colorChange} sizeChange={sizeChange} captionChange={captionChange} footerData={footerData} labelColors={props.labelColors}/>
  </div>
})


export default CypherResultCytoscape