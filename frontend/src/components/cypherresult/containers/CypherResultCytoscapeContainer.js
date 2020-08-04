import { connect } from 'react-redux'
import CypherResultCytoscape from '../presentations/CypherResultCytoscape'

const labelColors = [
    {color: '#664B00', labels : new Set([]), index : 0},  
    {color: '#D1B2FF', labels : new Set([]), index : 1}, 
    {color: '#FFC19E', labels : new Set([]), index : 2}, 
    {color: '#B2EBF4', labels : new Set([]), index : 3}, 
    {color: '#F15F5F', labels : new Set([]), index : 4}, 
    {color: '#C4B73B', labels : new Set([]), index : 5}, 
    {color: '#9FC93C', labels : new Set([]), index : 6}, 
    {color: '#FFD9EC', labels : new Set([]), index : 7}, 
    {color: '#6799FF', labels : new Set([]), index : 8}, 
    {color: '#FFBB00', labels : new Set([]), index : 9}, 
    {color: '#FFB2D9', labels : new Set([]), index : 10}, 
    {color: '#6B9900', labels : new Set([]), index : 11}
  ]

const mapStateToProps = (state, ownProps) => {
    const { refKey } = ownProps

    const getRandomColor = (labelName) => {
        let selectedColor = null
        labelColors.forEach((labelColor) => {
            if (labelColor.labels.has(labelName) ) {
                selectedColor = labelColor.color
                return
            }
        })
        
        if (!selectedColor) {
            const randomIndex = Math.floor(Math.random() * (11 - 0 + 1)) + 0
            labelColors[randomIndex].labels.add(labelName)
            selectedColor = labelColors[randomIndex].color
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
                            { group: 'edges', data: { id: val.id, source: val.start, target: val.end, label: val.label, backgroundColor: edgeLegend[labelName] }, alias: alias, classes: ['node'], properties: val.properties }
                        )
                    } else {
                        if (!nodeLegend.hasOwnProperty(labelName)) { nodeLegend[labelName] = getRandomColor(labelName) }
                        nodes.push(
                            { group: 'nodes', data: { id: val.id, label: val.label, backgroundColor: nodeLegend[labelName] }, alias: alias,  classes: ['node'], properties: val.properties }
                        )
                    }
                }
            });

        }
        return { legend : {nodeLegend: nodeLegend, edgeLegend: edgeLegend}, elements : { nodes: nodes, edges: edges }}

    }


    return {
        data: generateCytoscapeElement(state.cypher.queryResult[refKey]),
        isActive: state.navigator.isActive
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultCytoscape);
