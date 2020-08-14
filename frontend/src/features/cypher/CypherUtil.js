


export const labelColors = [
    { color: '#604A0E', borderColor: '#423204', fontColor: '#FFF', labels: new Set([]), index: 0 },
    { color: '#C990C0', borderColor: '#B261A5', fontColor: '#FFF', labels: new Set([]), index: 1 },
    { color: '#F79767', borderColor: '#F36924', fontColor: '#FFF', labels: new Set([]), index: 2 },
    { color: '#57C7E3', borderColor: '#23B3D7', fontColor: '#2A2C34', labels: new Set([]), index: 3 },
    { color: '#F16667', borderColor: '#EB2728', fontColor: '#FFF', labels: new Set([]), index: 4 },
    { color: '#D9C8AE', borderColor: '#C0A378', fontColor: '#2A2C34', labels: new Set([]), index: 5 },
    { color: '#8DCC93', borderColor: '#5DB665', fontColor: '#2A2C34', labels: new Set([]), index: 6 },
    { color: '#ECB5C9', borderColor: '#DA7298', fontColor: '#2A2C34', labels: new Set([]), index: 7 },
    { color: '#498EDA', borderColor: '#2870C2', fontColor: '#FFF', labels: new Set([]), index: 8 },
    { color: '#FFC454', borderColor: '#D7A013', fontColor: '#2A2C34', labels: new Set([]), index: 9 },
    { color: '#DA7194', borderColor: '#CC3C6C', fontColor: '#FFF', labels: new Set([]), index: 10 },
    { color: '#569480', borderColor: '#447666', fontColor: '#FFF', labels: new Set([]), index: 11 }
]

export const nodeLabelSizes = [
    { size: 11, labels: new Set([]), index: 0 },
    { size: 33, labels: new Set([]), index: 0 },
    { size: 55, labels: new Set([]), index: 0 },
    { size: 77, labels: new Set([]), index: 0 },
    { size: 99, labels: new Set([]), index: 0 }
]


export const edgeLabelSizes = [
    { size: 1, labels: new Set([]), index: 0 },
    { size: 6, labels: new Set([]), index: 0 },
    { size: 11, labels: new Set([]), index: 0 },
    { size: 16, labels: new Set([]), index: 0 },
    { size: 21, labels: new Set([]), index: 0 }
]

export let nodelabelCaptions = {}
export let edgelabelCaptions = {}


const getCaption = (valType, val) => {
    if (valType === 'node' && nodelabelCaptions.hasOwnProperty(val.label)) {
        return nodelabelCaptions[val.label]
    } else if (valType === 'edge' && nodelabelCaptions.hasOwnProperty(val.label)) {
        return edgelabelCaptions[val.label]
        
    }

    let caption = valType === 'node' ? 'gid' : 'label'
    const properties = val.properties
    if (properties !== undefined) {
        if (properties.hasOwnProperty('name')) {caption = 'name'}
        else if (properties.hasOwnProperty('id')) {caption = 'id'}
    } 

    return caption
}

const getColor = (labelName) => {
    let selectedColor = {}
    labelColors.forEach((labelColor) => {
        if (labelColor.labels.has(labelName)) {
            selectedColor = { color: labelColor.color, borderColor : labelColor.borderColor, fontColor : labelColor.fontColor}
        }
    })

    if (Object.keys(selectedColor).length === 0) {
        const randomIndex = Math.floor(Math.random() * (11 - 0 + 1)) + 0
        labelColors[randomIndex].labels.add(labelName)
        selectedColor = { color: labelColors[randomIndex].color, borderColor : labelColors[randomIndex].borderColor, fontColor : labelColors[randomIndex].fontColor}
    }
    return selectedColor
}

const getNodeSize = (labelName) => {
    let selectedSize = 0

    nodeLabelSizes.forEach((labelSize) => {
        if (labelSize.labels.has(labelName)) {
            selectedSize = labelSize.size
        }
    })
    
    if (selectedSize === 0 ) {
        nodeLabelSizes[2].labels.add(labelName)
        selectedSize = nodeLabelSizes[2].size
    }   

    return selectedSize
}

const getEdgeSize = (labelName) => {
    let selectedSize = 0

    edgeLabelSizes.forEach((labelSize) => {
        if (labelSize.labels.has(labelName)) {
            selectedSize = labelSize.size
        }
    })
    
    if (selectedSize === 0 ) {
        edgeLabelSizes[0].labels.add(labelName)
        selectedSize = edgeLabelSizes[0].size
    }   

    return selectedSize
}

const sortByKey = (data) => {    
    const sorted = {};
    if (data === undefined) {
        return sorted
    }
    Object.keys(data).sort().forEach(function(key) {
        sorted[key] = data[key];
    });
    return sorted;
}

export const updateLabelColor = (labelName, newLabelColor) => {
    labelColors.forEach((labelColor) => {
        if (labelColor.labels.has(labelName)) {
            labelColor.labels.delete(labelName)
        }

        if (labelColor.color === newLabelColor.color) {
            labelColor.labels.add(labelName)            
        }
    })
}

export const updateNodeLabelSize = (labelName, newLabelSize) => {
    nodeLabelSizes.forEach((labelSize) => {
        if (labelSize.labels.has(labelName)) {
            labelSize.labels.delete(labelName)
        }

        if (labelSize.size === newLabelSize) {
            labelSize.labels.add(labelName)            
        }
    })
}


export const updateEdgeLabelSize = (labelName, newLabelSize) => {
    edgeLabelSizes.forEach((labelSize) => {
        if (labelSize.labels.has(labelName)) {
            labelSize.labels.delete(labelName)
        }

        if (labelSize.size === newLabelSize) {
            labelSize.labels.add(labelName)            
        }
    })
}


export const updateLabelCaption = (labelType, labelName, newLabelCaption) => {
    if (labelType === 'node') {
        nodelabelCaptions[labelName] = newLabelCaption
    } else {
        edgelabelCaptions[labelName] = newLabelCaption
    }
}

export const reGenerateCytoscapeElements = (data, labels) => {
    let nodes = []
    let edges = []
    let nodeLegend = {}
    let edgeLegend = {}

    if (data) {
        data['rows'].forEach((row, index) => {
            for (const [alias, val] of Object.entries(row)) {
                let labelName = val['label']
                if (val['start'] && val['end']) {
                    if (!edgeLegend.hasOwnProperty(labelName)) { edgeLegend[labelName] = { color: '#8C8C8C', borderColor : '#8C8C8C', fontColor:'#2A2C34', size: getEdgeSize(labelName), caption: getCaption('edge', val)  } }
                    if (!edgelabelCaptions.hasOwnProperty(labelName)) {edgelabelCaptions[labelName] = 'label'}
                    edges.push(
                        {
                            group: 'edges'
                            , data: {
                                id: val.id
                                , source: val.start
                                , target: val.end
                                , label: val.label
                                , backgroundColor: edgeLegend[labelName].color
                                , borderColor: edgeLegend[labelName].borderColor
                                , fontColor: edgeLegend[labelName].fontColor
                                , size: edgeLegend[labelName].size
                                , properties: val.properties
                                , caption: edgeLegend[labelName].caption
                            }
                            , alias: alias
                            , classes: ['node']
                        }
                    )
                } else {
                    if (!nodeLegend.hasOwnProperty(labelName)) { nodeLegend[labelName] = Object.assign({size: getNodeSize(labelName), caption: getCaption('node', val)}, getColor(labelName)) } 
                    if (!nodelabelCaptions.hasOwnProperty(labelName)) {nodelabelCaptions[labelName] = 'gid'}
                    nodes.push(
                        {
                            group: 'nodes'
                            , data: {
                                id: val.id
                                , label: val.label
                                , backgroundColor: nodeLegend[labelName].color
                                , borderColor: nodeLegend[labelName].borderColor
                                , fontColor: nodeLegend[labelName].fontColor
                                , size: nodeLegend[labelName].size
                                , properties: val.properties
                                , caption: nodeLegend[labelName].caption
                            }
                            , alias: alias
                            , classes: ['node']
                        }
                    )
                }
            }
        });
    }
  
    return { legend: { nodeLegend: sortByKey(nodeLegend), edgeLegend: sortByKey(edgeLegend) }, elements: { nodes: nodes, edges: edges } }
}

export const generateCytoscapeElement = (data) => {
    let nodes = []
    let edges = []
    let nodeLegend = {}
    let edgeLegend = {}
    console.log("data>> " , data)

    if (data) {
        data['rows'].forEach((row, index) => {
            for (const [alias, val] of Object.entries(row)) {
                let labelName = val['label']
                if (val['start'] && val['end']) {
                    if (!edgeLegend.hasOwnProperty(labelName)) { edgeLegend[labelName] = { color: '#8C8C8C', borderColor : '#8C8C8C', fontColor:'#2A2C34', size: getEdgeSize(labelName), caption: getCaption('edge', val) } }
                    if (!edgelabelCaptions.hasOwnProperty(labelName)) {edgelabelCaptions[labelName] = 'label'}
                    edges.push(
                        {
                            group: 'edges'
                            , data: {
                                id: val.id
                                , source: val.start
                                , target: val.end
                                , label: val.label
                                , backgroundColor: edgeLegend[labelName].color
                                , borderColor: edgeLegend[labelName].borderColor
                                , fontColor: edgeLegend[labelName].fontColor
                                , size: edgeLegend[labelName].size
                                , properties: val.properties
                                , caption: edgeLegend[labelName].caption
                            }
                            , alias: alias
                            , classes: ['node']
                        }
                    )
                } else {
                    if (!nodeLegend.hasOwnProperty(labelName)) { nodeLegend[labelName] = Object.assign({size: getNodeSize(labelName), caption: getCaption('node', val)}, getColor(labelName)) } 
                    if (!nodelabelCaptions.hasOwnProperty(labelName)) {nodelabelCaptions[labelName] = 'gid'}
                    nodes.push(
                        {
                            group: 'nodes'
                            , data: {
                                id: val.id
                                , label: val.label
                                , backgroundColor: nodeLegend[labelName].color
                                , borderColor: nodeLegend[labelName].borderColor
                                , fontColor: nodeLegend[labelName].fontColor
                                , size: nodeLegend[labelName].size
                                , properties: val.properties
                                , caption: nodeLegend[labelName].caption
                            }
                            , alias: alias
                            , classes: ['node']
                        }
                    )
                }
            }
        });
    }
  
    return { legend: { nodeLegend: sortByKey(nodeLegend), edgeLegend: sortByKey(edgeLegend) }, elements: { nodes: nodes, edges: edges } }

}