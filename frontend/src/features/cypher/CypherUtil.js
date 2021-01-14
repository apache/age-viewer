/*
 * Copyright 2020 Bitnine Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




export const nodeLabelColors = [
    { color: '#604A0E', borderColor: '#423204', fontColor: '#FFF', nodeLabels: new Set([]), index: 0 },
    { color: '#C990C0', borderColor: '#B261A5', fontColor: '#FFF', nodeLabels: new Set([]), index: 1 },
    { color: '#F79767', borderColor: '#F36924', fontColor: '#FFF', nodeLabels: new Set([]), index: 2 },
    { color: '#57C7E3', borderColor: '#23B3D7', fontColor: '#2A2C34', nodeLabels: new Set([]), index: 3 },
    { color: '#F16667', borderColor: '#EB2728', fontColor: '#FFF', nodeLabels: new Set([]), index: 4 },
    { color: '#D9C8AE', borderColor: '#C0A378', fontColor: '#2A2C34', nodeLabels: new Set([]), index: 5 },
    { color: '#8DCC93', borderColor: '#5DB665', fontColor: '#2A2C34', nodeLabels: new Set([]), index: 6 },
    { color: '#ECB5C9', borderColor: '#DA7298', fontColor: '#2A2C34', nodeLabels: new Set([]), index: 7 },
    { color: '#498EDA', borderColor: '#2870C2', fontColor: '#FFF', nodeLabels: new Set([]), index: 8 },
    { color: '#FFC454', borderColor: '#D7A013', fontColor: '#2A2C34', nodeLabels: new Set([]), index: 9 },
    { color: '#DA7194', borderColor: '#CC3C6C', fontColor: '#FFF', nodeLabels: new Set([]), index: 10 },
    { color: '#569480', borderColor: '#447666', fontColor: '#FFF', nodeLabels: new Set([]), index: 11 }
]

export const edgeLabelColors = [
    { color: '#CCA63D', borderColor: '#997000', fontColor: '#2A2C34', edgeLabels: new Set([]), index: 0 },
    { color: '#C990C0', borderColor: '#B261A5', fontColor: '#2A2C34', edgeLabels: new Set([]), index: 1 },
    { color: '#F79767', borderColor: '#F36924', fontColor: '#2A2C34', edgeLabels: new Set([]), index: 2 },
    { color: '#57C7E3', borderColor: '#23B3D7', fontColor: '#2A2C34', edgeLabels: new Set([]), index: 3 },
    { color: '#F16667', borderColor: '#EB2728', fontColor: '#2A2C34', edgeLabels: new Set([]), index: 4 },
    { color: '#D9C8AE', borderColor: '#C0A378', fontColor: '#2A2C34', edgeLabels: new Set([]), index: 5 },
    { color: '#8DCC93', borderColor: '#5DB665', fontColor: '#2A2C34', edgeLabels: new Set([]), index: 6 },
    { color: '#ECB5C9', borderColor: '#DA7298', fontColor: '#2A2C34', edgeLabels: new Set([]), index: 7 },
    { color: '#498EDA', borderColor: '#2870C2', fontColor: '#2A2C34', edgeLabels: new Set([]), index: 8 },
    { color: '#FFC454', borderColor: '#D7A013', fontColor: '#2A2C34', edgeLabels: new Set([]), index: 9 },
    { color: '#DA7194', borderColor: '#CC3C6C', fontColor: '#2A2C34', edgeLabels: new Set([]), index: 10 },
    { color: '#569480', borderColor: '#447666', fontColor: '#2A2C34', edgeLabels: new Set([]), index: 11 }
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
    } else if (valType === 'edge' && edgelabelCaptions.hasOwnProperty(val.label)) {
        return edgelabelCaptions[val.label]

    }

    let caption = valType === 'node' ? 'gid' : 'label'
    const properties = val.properties
    if (properties !== undefined) {
        if (properties.hasOwnProperty('name')) { caption = 'name' }
        else if (properties.hasOwnProperty('id')) { caption = 'id' }
    }

    return caption
}

const getNodeColor = (labelName) => {
    let selectedColor = {}
    nodeLabelColors.forEach((labelColor) => {
        if (labelColor.nodeLabels.has(labelName)) {
            selectedColor = { color: labelColor.color, borderColor: labelColor.borderColor, fontColor: labelColor.fontColor }
        }
    })

    if (Object.keys(selectedColor).length === 0) {
        const randomIndex = Math.floor(Math.random() * (11 - 0 + 1)) + 0
        nodeLabelColors[randomIndex].nodeLabels.add(labelName)
        selectedColor = { color: nodeLabelColors[randomIndex].color, borderColor: nodeLabelColors[randomIndex].borderColor, fontColor: nodeLabelColors[randomIndex].fontColor }
    }
    return selectedColor
}

const getEdgeColor = (labelName) => {
    let selectedColor = {}
    edgeLabelColors.forEach((labelColor) => {
        if (labelColor.edgeLabels.has(labelName)) {
            selectedColor = { color: labelColor.color, borderColor: labelColor.borderColor, fontColor: labelColor.fontColor }
        }
    })

    if (Object.keys(selectedColor).length === 0) {
        const randomIndex = Math.floor(Math.random() * (11 - 0 + 1)) + 0
        edgeLabelColors[randomIndex].edgeLabels.add(labelName)
        selectedColor = { color: edgeLabelColors[randomIndex].color, borderColor: edgeLabelColors[randomIndex].borderColor, fontColor: edgeLabelColors[randomIndex].fontColor }
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

    if (selectedSize === 0) {
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

    if (selectedSize === 0) {
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
    Object.keys(data).sort().forEach(function (key) {
        sorted[key] = data[key];
    });
    return sorted;
}

export const updateLabelColor = (labelType, labelName, newLabelColor) => {
    if (labelType === 'node') {
        nodeLabelColors.forEach((labelColor) => {
            if (labelColor.nodeLabels.has(labelName)) {
                labelColor.nodeLabels.delete(labelName)
            }

            if (labelColor.color === newLabelColor.color) {
                labelColor.nodeLabels.add(labelName)
            }
        })
    } else {
        edgeLabelColors.forEach((labelColor) => {
            if (labelColor.edgeLabels.has(labelName)) {
                labelColor.edgeLabels.delete(labelName)
            }

            if (labelColor.color === newLabelColor.color) {
                labelColor.edgeLabels.add(labelName)
            }
        })
    }
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

export const generateCytoscapeElement = (data, maxDataOfGraph, isNew) => {
    let nodes = []
    let edges = []
    let nodeLegend = {}
    let edgeLegend = {}

    if (data) {
        data.forEach((row, index) => {
            if (index >= maxDataOfGraph) { return }
            for (const [alias, val] of Object.entries(row)) {
                if (Array.isArray(val)) {
                    // val이 Path인 경우 ex) MATCH P = (V)-[R]->(V2) RETURN P;
                    for (const [pathAlias, pathVal] of Object.entries(val)) {
                        generateElements(nodeLegend, edgeLegend, nodes, edges, pathAlias, pathVal, isNew)
                    }
                } else {
                    generateElements(nodeLegend, edgeLegend, nodes, edges, alias, val, isNew)
                }


            }
        });
    }

    return { legend: { nodeLegend: sortByKey(nodeLegend), edgeLegend: sortByKey(edgeLegend) }, elements: { nodes: nodes, edges: edges } }

}

const generateElements = (nodeLegend, edgeLegend, nodes, edges, alias, val, isNew) => {
    let labelName = val['label']
    if (val['start'] && val['end']) {
        if (!edgeLegend.hasOwnProperty(labelName)) { edgeLegend[labelName] = Object.assign({ size: getEdgeSize(labelName), caption: getCaption('edge', val) }, getEdgeColor(labelName)) }
        if (!edgelabelCaptions.hasOwnProperty(labelName)) { edgelabelCaptions[labelName] = 'label' }
        if (!val.properties.hasOwnProperty(edgeLegend.caption)) { edgeLegend[labelName].caption = getCaption('edge', val) }
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
                , classes: isNew ? 'new node' : 'edge'
            }
        )
    } else {
        if (!nodeLegend.hasOwnProperty(labelName)) { nodeLegend[labelName] = Object.assign({ size: getNodeSize(labelName), caption: getCaption('node', val) }, getNodeColor(labelName)) }
        if (!nodelabelCaptions.hasOwnProperty(labelName)) { nodelabelCaptions[labelName] = 'gid' }
        if (!val.properties.hasOwnProperty(nodeLegend.caption)) { nodeLegend[labelName].caption = getCaption('node', val) }
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
                , classes: isNew ? 'new node' : 'node'
            }
        )
    }
}



export const generateCytoscapeMetadataElement = (data) => {
    let nodes = []
    let edges = []
    let nodeLegend = {}
    let edgeLegend = {}

    if (data) {
        data.forEach((val, index) => {
            if (!val.hasOwnProperty('la_count')) { return }
            if (val.hasOwnProperty('la_count') && val['la_count'] <= 0 ) { return }
            generateMetadataElements(nodeLegend, edgeLegend, nodes, edges, val)
        });
    }

    return { legend: { nodeLegend: sortByKey(nodeLegend), edgeLegend: sortByKey(edgeLegend) }, elements: { nodes: nodes, edges: edges } }

}

const generateMetadataElements = (nodeLegend, edgeLegend, nodes, edges, val) => {
    let labelName = val['la_name']
    if (val['la_start'] && val['la_end']) {
        //if (!edgeLegend.hasOwnProperty(labelName)) { edgeLegend[labelName] = Object.assign({ size: Math.log10(val['la_count']) * 10, caption: 'name' }, getEdgeColor(labelName)) }
        if (!edgeLegend.hasOwnProperty(labelName)) { edgeLegend[labelName] = Object.assign({ size: 15, caption: 'name' }, getEdgeColor(labelName)) }
        edges.push(
            {
                group: 'edges'
                , data: {
                    id: val.la_oid
                    , source: val.la_start
                    , target: val.la_end
                    , label: val.la_name
                    , backgroundColor: edgeLegend[labelName].color
                    , borderColor: edgeLegend[labelName].borderColor
                    , fontColor: edgeLegend[labelName].fontColor
                    , size: edgeLegend[labelName].size
                    , properties: {count : val.la_count, id : val.la_oid, name : val.la_name}
                    , caption: edgeLegend[labelName].caption
                }
                , classes: 'edge'
            }
        )
    } else {
        //if (!nodeLegend.hasOwnProperty(labelName)) { nodeLegend[labelName] = Object.assign({ size: Math.log10(val['la_count']) * 30, caption: 'name' }, getNodeColor(labelName)) }
        if (!nodeLegend.hasOwnProperty(labelName)) { nodeLegend[labelName] = Object.assign({ size: 70, caption: 'name' }, getNodeColor(labelName)) }
        nodes.push(
            {
                group: 'nodes'
                , data: {
                    id: val.la_oid
                    , label: val.la_name
                    , backgroundColor: nodeLegend[labelName].color
                    , borderColor: nodeLegend[labelName].borderColor
                    , fontColor: nodeLegend[labelName].fontColor
                    , size: nodeLegend[labelName].size
                    , properties: {count : val.la_count, id : val.la_oid, name : val.la_name}
                    , caption: nodeLegend[labelName].caption
                }
                , classes: 'node'
            }
        )
    }
}