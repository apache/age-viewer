import { connect } from 'react-redux'
import CypherResultCytoscape from '../presentations/CypherResultCytoscape'

const labelColors = [
    {color: '#664B00', borderColor: '#662500', labels : new Set([]), index : 0},  
    {color: '#D1B2FF', borderColor: '#A566FF', labels : new Set([]), index : 1}, 
    {color: '#FFC19E', borderColor: '#F29661', labels : new Set([]), index : 2}, 
    {color: '#B5B2FF', borderColor: '#6B66FF', labels : new Set([]), index : 3}, 
    {color: '#F15F5F', borderColor: '#CC3D3D', labels : new Set([]), index : 4}, 
    {color: '#C4B73B', borderColor: '#998A00', labels : new Set([]), index : 5}, 
    {color: '#9FC93C', borderColor: '#6B9900', labels : new Set([]), index : 6}, 
    {color: '#FFD9EC', borderColor: '#FFB2D9', labels : new Set([]), index : 7}, 
    {color: '#6799FF', borderColor: '#4374D9', labels : new Set([]), index : 8}, 
    {color: '#FFBB00', borderColor: '#DB9700', labels : new Set([]), index : 9}, 
    {color: '#FFB2D9', borderColor: '#F361A6', labels : new Set([]), index : 10}, 
    {color: '#6B9900', borderColor: '#476600', labels : new Set([]), index : 11}
  ]

const mapStateToProps = (state, ownProps) => {
    const { refKey } = ownProps

    const getRandomColor = (labelName) => {
        let selectedColor = []
        labelColors.forEach((labelColor) => {
            if (labelColor.labels.has(labelName) ) {
                selectedColor.push(labelColor.color)
                selectedColor.push(labelColor.borderColor)
                return
            }
        })
        
        if (selectedColor.length === 0) {
            const randomIndex = Math.floor(Math.random() * (11 - 0 + 1)) + 0
            labelColors[randomIndex].labels.add(labelName)
            selectedColor.push(labelColors[randomIndex].color)
            selectedColor.push(labelColors[randomIndex].borderColor)
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
                        if (!edgeLegend.hasOwnProperty(labelName)) { edgeLegend[labelName] = getRandomColor(labelName) }
                        edges.push(
                            { group: 'edges', data: { id: val.id, source: val.start, target: val.end, label: val.label, backgroundColor: edgeLegend[labelName][0], borderColor: edgeLegend[labelName][1], properties: val.properties }, alias: alias, classes: ['node'] }
                        )
                    } else {
                        if (!nodeLegend.hasOwnProperty(labelName)) { nodeLegend[labelName] = getRandomColor(labelName) }
                        nodes.push(
                            { group: 'nodes', data: { id: val.id, label: val.label, backgroundColor: nodeLegend[labelName][0], borderColor: nodeLegend[labelName][1], properties: val.properties }, alias: alias,  classes: ['node'] }
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
