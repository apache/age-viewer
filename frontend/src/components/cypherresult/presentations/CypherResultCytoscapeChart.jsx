import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import cxtmenu from 'cytoscape-cxtmenu'
import { generateCytoscapeElement } from '../../../features/cypher/CypherUtil'
import COSEBilkent from 'cytoscape-cose-bilkent';


cytoscape.use(COSEBilkent);
cytoscape.use(cxtmenu);

const getLabel = (ele, captionProp) => {
  if (captionProp === 'gid') {
    ele.isNode() ? selectedLabel.node[ele.data('label')] = 'gid' : selectedLabel.edge[ele.data('label')] = 'gid'
    return "[ " + ele.data('id') + " ]"
  } else if (captionProp === 'label') {
    ele.isNode() ? selectedLabel.node[ele.data('label')] = 'label' : selectedLabel.edge[ele.data('label')] = 'label'
    return "[ :" + ele.data('label') + " ]"
  } else {
    const props = ele.data('properties')
    if (props[captionProp] === undefined) { 
      ele.isNode() ? selectedLabel.node[ele.data('label')] = 'gid' : selectedLabel.edge[ele.data('label')] = 'gid'
      return "[ " + ele.data('id') + " ]"
    }
    else { 
      ele.isNode() ? selectedLabel.node[ele.data('label')] = captionProp : selectedLabel.edge[ele.data('label')] = captionProp
      return props[captionProp] 
    }
  }

  console.log("getLabel!!")
}

let selectedLabel = {
  node: {},
  edge: {}
}

let initLocation = {}

const stylesheet = [
  {
    selector: 'node',
    style: {
      width: function (ele) { return ele == null ? 55 : ele.data('size'); },
      height: function (ele) { return ele == null ? 55 : ele.data('size'); },
      label: function (ele) { const captionProp = ele.data('caption'); return ele == null ? '' : getLabel(ele, captionProp); },
      'background-color': function (ele) { return ele == null ? '#FFF' : ele.data('backgroundColor'); },
      'border-width': "3px",
      'border-color': function (ele) { return ele == null ? '#FFF' : ele.data('borderColor'); },
      'border-opacity': 0.6,
      "text-valign": "center",
      "text-halign": "center",
      color: function (ele) { return ele == null ? '#FFF' : ele.data('fontColor'); },
      "font-size": "10px",
      "text-wrap": "ellipsis",
      "text-max-width": function (ele) { return ele == null ? 55 : ele.data('size'); }
    }
  },
  {
    selector: 'node.highlight',
    style: {
      'border-width': "6px",
      'border-color': "#B2EBF4"
    }
  },
  {
    selector: 'node:selected',
    style: {
      'border-width': "6px",
      'border-color': "#B2EBF4"
    }
  },
  {
    selector: 'edge',
    style: {
      width: function (ele) { return ele == null ? 1 : ele.data('size'); },
      label: function (ele) { const captionProp = ele.data('caption'); return ele == null ? '' : getLabel(ele, captionProp); },
      'text-background-color': '#FFF',
      'text-background-opacity': 1,
      'text-background-padding': '3px',
      'line-color': function (ele) { return ele == null ? '#FFF' : ele.data('backgroundColor'); },
      'target-arrow-color': function (ele) { return ele == null ? '#FFF' : ele.data('backgroundColor'); },
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      color: function (ele) { return ele == null ? '#FFF' : ele.data('fontColor'); },
      "font-size": "10px",
      "text-rotation": "autorotate"
    }
  },
  {
    selector: 'edge.highlight',
    style: {
      width: function (ele) { return ele == null ? 1 : ele.data('size'); },
      'line-color': "#B2EBF4",
      'target-arrow-color': "#B2EBF4",
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier'
    }
  },
  {
    selector: 'edge:selected',
    style: {
      width: function (ele) { return ele == null ? 1 : ele.data('size'); },
      'line-color': "#B2EBF4",
      'target-arrow-color': "#B2EBF4",
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier'
    }
  }
]

const coseBilkentLayout = {
  name: 'cose-bilkent'
  , idealEdgeLength: 100
  , nodeDimensionsIncludeLabels: true
  , fit: true
  , padding: 10
  , stop: function (event) {
    event.cy.nodes().forEach(function (ele) {
      initLocation[ele.id()] = { x: ele.position().x, y: ele.position().y }
    });
  }
}

const ciseLayout = {
  name: 'cise',
  animate: true
}

const d3Layout = {
  name: 'd3-force',
  animate: true, // whether to show the layout as it's running; special 'end' value makes the layout animate like a discrete layout
  fit: false,
  fixedAfterDragging: true,
  linkId: function id(d) {
    return d.id;
  },
  linkDistance: 80,
  linkStrength: -300,
  manyBodyStrength: 0,
  ready: function () { },
  stop: function (event) {
    event.cy.nodes().forEach(function (ele) {
      initLocation[ele.id()] = { x: ele.position().x, y: ele.position().y }
    });
  },
  randomize: true,
  infinite: false
  // some more options here...
}

const conf = {
  // Common Options
  style: stylesheet,
  layout: coseBilkentLayout,
  // Viewport Options
  zoom: 1,
  // Interaction Options
  minZoom: 0.5,
  maxZoom: 4,
  zoomingEnabled: false, //true
  userZoomingEnabled: false, //true
  panningEnabled: true,
  userPanningEnabled: true,
  boxSelectionEnabled: false, //true
  selectionType: 'single',
  touchTapThreshold: 8,
  desktopTapThreshold: 4,
  autolock: false,
  autoungrabify: false,
  autounselectify: false,
  // Rendering Options
  headless: false,
  styleEnabled: true,
  hideEdgesOnViewport: false,
  textureOnViewport: false,
  motionBlur: false,
  motionBlurOpacity: 0.2,
  wheelSensitivity: 1,
  pixelRatio: 'auto'
};




class CytoscapeComponent extends Component {
  constructor(props) {
    super(props);
    this.cy = ''
    this.menu = ''
    this.addElements = this.addElements.bind(this)
  }

  closeCxtmenu() {
    this.menu.destroy()
  }

  addElements(d) {
    const generatedData = generateCytoscapeElement({ response: d })
    if (generatedData.elements.nodes.length === 0) {
      alert("No data to extend.")
      return
    }
    this.cy.add(generatedData.elements, generatedData.legend)
    this.cy.layout(coseBilkentLayout).run()

    this.handleUserAction(this.props)
    this.props.addLegendData(generatedData.legend)
  }

  handleUserAction(props) {
    this.cy.elements().bind('mouseover', (e) => {
      props.onElementsMouseover({ type: 'elements', data: e.target.data() })
      e.target.addClass('highlight')
    })

    this.cy.elements().bind('mouseout', (e) => {
      if (this.cy.elements(':selected').length === 0) {
        props.onElementsMouseover({ type: 'background', data: { nodeCount: this.cy.nodes().size(), edgeCount: this.cy.edges().size() } })
      } else {
        props.onElementsMouseover({ type: 'elements', data: this.cy.elements(':selected')[0].data() })
      }

      e.target.removeClass('highlight')
    })

    this.cy.elements().bind('click', (e) => {
      const ele = e.target
      this.cy.elements(':selected').unselect()
      ele.select()
    })

    this.cy.bind('click', (e) => {
      if (e.target === this.cy) {
        props.onElementsMouseover({ type: 'background', data: { nodeCount: this.cy.nodes().size(), edgeCount: this.cy.edges().size() } })
      }
    })
  }

  componentDidMount() {
    conf.container = this.refs.cyelement;
    conf.pan = { x: this.refs.cyelement.offsetWidth / 3, y: 50 }
    let initCy = cytoscape(conf);
    this.cy = initCy


    this.cxtMenuConf = {
      menuRadius: 75,
      selector: 'node',
      commands: [
        {
          content: '<span class=""  ><i class="fas fa-lock-open fa-lg"></i></span>',
          select: function (ele) {
            ele.animate({ position: initLocation[ele.id()] })
          }
        },

        {
          content: '<span class=""><i class="fas fa-project-diagram fa-lg"></i></span>',
          select: function (ele) {
            fetch('/api/v1/cypher',
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cmd: 'MATCH (S)-[R]-(T) WHERE id(S) = \'' + ele.id() + '\' RETURN S, R, T' })
              })
              .then(res => res.json())
              .then(data => {
                this.addElements(data)
              })
          }.bind(this)
        },

        {
          content: '<span class=""><i class="fas fa-eye-slash fa-lg"></i></span>',
          select: function (ele) {
            ele.remove()
          }
        },

        {
          content: '<span class=""><i class="far fa-window-close fa-lg"></i></span>',
          select: function (ele) {
          }
        }
      ],
      fillColor: 'rgba(210, 213, 218, 1)',
      activeFillColor: 'rgba(166, 166, 166, 1)',
      activePadding: 0,
      indicatorSize: 0,
      separatorWidth: 4,
      spotlightPadding: 3,
      minSpotlightRadius: 11,
      maxSpotlightRadius: 99,
      openMenuEvents: 'click',
      itemColor: '#2A2C34',
      itemTextShadowColor: 'transparent',
      zIndex: 9999,
      atMouse: false
    }
    this.menu = initCy.cxtmenu(this.cxtMenuConf)
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.elements.nodes.length === 0) {
      this.cy.add(nextProps.elements)
      this.cy.layout(coseBilkentLayout).run()

      this.handleUserAction(nextProps)

    } else {
      if (nextProps.legendData !== undefined) {

        for (const [label, legend] of Object.entries(nextProps.legendData.nodeLegend)) {  
          console.log(label, legend)
          this.colorChange('node', label, {color : legend.color, borderColor : legend.borderColor, fontColor : legend.fontColor})
          this.sizeChange('node', label, legend.size)
          this.captionChange('node', label, legend.caption)
        }
        
        for (const [label, legend] of Object.entries(nextProps.legendData.edgeLegend)) {
          this.colorChange('edge', label, {color : legend.color, borderColor : legend.borderColor, fontColor : legend.fontColor})
          this.sizeChange('edge', label, legend.size)
          this.captionChange('edge', label, legend.caption)
        }
      }
      this.cy.resize()
    }
  }

  componentWillUnmount() {
    this.menu.destroy()
    this.cy.destroy()
  }


  resetChart() {
    this.props.elements.nodes = []
    this.props.elements.edges = []
    this.cy.elements().remove()
  }

  getCaptions(elementType, label) {
    const eles = this.cy.elements(elementType + '[label = "' + label + '"]').jsons()
    let extendedSet = new Set([])
    eles.forEach((ele) => {
      extendedSet = new Set([...extendedSet, ...Object.keys(ele.data.properties)])
    })
    return extendedSet
  }

  getCurrecntCaption(elementType, label) {
    if (elementType === 'edge' && selectedLabel[elementType][label] === undefined) {
      selectedLabel[elementType][label] = 'label'
    }

    return selectedLabel[elementType][label]
  }

  getCy() {
    return this.cy;
  }

  colorChange(elementType, label, color) {
    let c = {}

    if (Array.isArray(color)) {
      c['color'] = color[0]
      c['borderColor'] = color[1]
      c['fontColor'] = color[2]
    } else {
      c = color
    }

    if (elementType === 'node') {
      this.cy.nodes('[label = "' + label + '"]').data("backgroundColor", c.color).data("borderColor", c.borderColor).data("fontColor", c.fontColor)
    } else if (elementType === 'edge') {
      this.cy.edges('[label = "' + label + '"]').data("backgroundColor", c.color).data("fontColor", c.fontColor)
    }

  }

  sizeChange(elementType, label, size) {
    const changedData = this.cy.elements(elementType + '[label = "' + label + '"]').data("size", size)

    if (size > 6) {
      changedData.style('text-background-opacity', 0)
    } else {
      changedData.style('text-background-opacity', 1)
    }
  }

  captionChange(elementType, label, caption) {
    console.log("captionchange elementType, label, caption >>", elementType, label, caption)
    if (caption === 'gid') {
      this.cy.elements(elementType + '[label = "' + label + '"]').style('label', function (ele) { return ele == null ? '' : "[ " + ele.data('id') + " ]"; })
    } else if (caption === 'label') {
      this.cy.elements(elementType + '[label = "' + label + '"]').style('label', function (ele) { return ele == null ? '' : "[ :" + ele.data('label') + " ]"; })
    } else {
      this.cy.elements(elementType + '[label = "' + label + '"]').style('label', function (ele) { return ele == null ? '' : (ele.data('properties')[caption] == null ? '' : ele.data('properties')[caption]) })
    }
  }

  render() {
    return <div id="cyto" className="chart-area" ref="cyelement" />
  }
}

export default CytoscapeComponent;