import { connect } from 'react-redux'
import CypherResultCytoscape from '../presentations/CypherResultCytoscape'

const labelColors = [
    {color: '#604A0E', borderColor: '#423204', fontColor: '#FFF', labels : new Set([]), index : 0},  
    {color: '#C990C0', borderColor: '#B261A5', fontColor: '#FFF', labels : new Set([]), index : 1}, 
    {color: '#F79767', borderColor: '#F36924', fontColor: '#FFF', labels : new Set([]), index : 2}, 
    {color: '#57C7E3', borderColor: '#23B3D7', fontColor: '#2A2C34', labels : new Set([]), index : 3}, 
    {color: '#F16667', borderColor: '#EB2728', fontColor: '#FFF', labels : new Set([]), index : 4}, 
    {color: '#D9C8AE', borderColor: '#C0A378', fontColor: '#2A2C34', labels : new Set([]), index : 5}, 
    {color: '#8DCC93', borderColor: '#5DB665', fontColor: '#2A2C34', labels : new Set([]), index : 6}, 
    {color: '#ECB5C9', borderColor: '#DA7298', fontColor: '#2A2C34', labels : new Set([]), index : 7}, 
    {color: '#498EDA', borderColor: '#2870C2', fontColor: '#FFF', labels : new Set([]), index : 8}, 
    {color: '#FFC454', borderColor: '#D7A013', fontColor: '#2A2C34', labels : new Set([]), index : 9}, 
    {color: '#DA7194', borderColor: '#CC3C6C', fontColor: '#FFF', labels : new Set([]), index : 10}, 
    {color: '#569480', borderColor: '#447666', fontColor: '#FFF', labels : new Set([]), index : 11}
  ]

const mapStateToProps = (state, ownProps) => {
    const { refKey } = ownProps

    const getRandomColor = (labelName) => {
        let selectedColor = []
        labelColors.forEach((labelColor) => {
            if (labelColor.labels.has(labelName) ) {
                selectedColor.push(labelColor.color)
                selectedColor.push(labelColor.borderColor)
                selectedColor.push(labelColor.fontColor)
                return
            }
        })
        
        if (selectedColor.length === 0) {
            const randomIndex = Math.floor(Math.random() * (11 - 0 + 1)) + 0
            labelColors[randomIndex].labels.add(labelName)
            selectedColor.push(labelColors[randomIndex].color)
            selectedColor.push(labelColors[randomIndex].borderColor)
            selectedColor.push(labelColors[randomIndex].fontColor)
        }

        return selectedColor;
    }

    const generateCytoscapeElement = (data) => {
        let nodes = []
        let edges = []
        let nodeLegend = {}
        let edgeLegend = {}

        if (data) {
            data['response']['data']['rows'].forEach((row, index) => {
                for (const [alias, val] of Object.entries(row)) {
                    let labelName = val['label']
                    if (val['start'] && val['end']) {
                        if (!edgeLegend.hasOwnProperty(labelName)) { edgeLegend[labelName] = ['#8C8C8C', '#8C8C8C', '#2A2C34'] }
                        edges.push(
                            { group: 'edges', data: { id: val.id, source: val.start, target: val.end, label: val.label, backgroundColor: edgeLegend[labelName][0], borderColor: edgeLegend[labelName][1], fontColor: edgeLegend[labelName][2], properties: val.properties }, alias: alias, classes: ['node'] }
                        )
                    } else {
                        if (!nodeLegend.hasOwnProperty(labelName)) { nodeLegend[labelName] = getRandomColor(labelName) }
                        nodes.push(
                            { group: 'nodes', data: { id: val.id, label: val.label, backgroundColor: nodeLegend[labelName][0], borderColor: nodeLegend[labelName][1], fontColor: nodeLegend[labelName][2], properties: val.properties }, alias: alias,  classes: ['node'] }
                        )
                    }
                }
            });

        }
        return { legend : {nodeLegend: nodeLegend, edgeLegend: edgeLegend}, elements : { nodes: nodes, edges: edges }}

    }


    return {
        data: generateCytoscapeElement(state.cypher.queryResult[refKey]),
        isActive: state.navigator.isActive,
        labelColors: labelColors
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultCytoscape);
