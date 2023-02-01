/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useCallback, useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import cytoscape from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';
import cola from 'cytoscape-cola';
import dagre from 'cytoscape-dagre';
import klay from 'cytoscape-klay';
import euler from 'cytoscape-euler';
import avsdf from 'cytoscape-avsdf';
import spread from 'cytoscape-spread';
import { useDispatch } from 'react-redux';
import CytoscapeComponent from 'react-cytoscapejs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEyeSlash,
  faLockOpen,
  faProjectDiagram,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import uuid from 'react-uuid';
import edgehandles from 'cytoscape-edgehandles';
import Form from 'react-bootstrap/Form';
import { Badge } from 'react-bootstrap';
import EdgeProperySettingModal from '../cypherresult/components/EdgePropertyMenu';
import cxtmenu from '../../lib/cytoscape-cxtmenu';
import { initLocation, seletableLayouts } from './CytoscapeLayouts';
import { stylesheet } from './CytoscapeStyleSheet';
import { generateCytoscapeElement } from '../../features/cypher/CypherUtil';
import IconFilter from '../../icons/IconFilter';
import IconSearchCancel from '../../icons/IconSearchCancel';
import styles from '../frame/Frame.module.scss';
import EdgeQuerySaveModal from '../cypherresult/components/EdgeQueryMenu';

cytoscape.use(COSEBilkent);
cytoscape.use(cola);
cytoscape.use(dagre);
cytoscape.use(klay);
cytoscape.use(euler);
cytoscape.use(avsdf);
cytoscape.use(spread);
cytoscape.use(cxtmenu);
cytoscape.use(edgehandles);
const CypherResultCytoscapeCharts = ({
  elements,
  setElements,
  cytoscapeObject,
  setCytoscapeObject,
  cytoscapeLayout,
  maxDataOfGraph,
  onElementsMouseover,
  addLegendData,
  graph,
  onAddSubmit,
  onRemoveSubmit,
  openModal,
  addGraphHistory,
  addElementHistory,
}) => {
  const [cytoscapeMenu, setCytoscapeMenu] = useState(null);
  const [cytoscapeEdgeHandle, setCytoscapeEdgeHandle] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [edgeElements, setEdgeElements] = useState([]);
  const [edgeParams, setEdgeParams] = useState({});
  const [edgeModal, setEdgeModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [entity, setEntity] = useState();
  const [generatedCount, setGeneratedCount] = useState(0);
  const dispatch = useDispatch();
  const addEventOnElements = (targetElements) => {
    targetElements.bind('mouseover', (e) => {
      onElementsMouseover({ type: 'elements', data: e.target.data() });
      e.target.addClass('highlight');
    });

    targetElements.bind('mouseout', (e) => {
      if (cytoscapeObject.elements(':selected').length === 0) {
        onElementsMouseover({
          type: 'background',
          data: {
            nodeCount: cytoscapeObject.nodes().size(),
            edgeCount: cytoscapeObject.edges().size(),
          },
        });
      } else {
        onElementsMouseover({
          type: 'elements',
          data: cytoscapeObject.elements(':selected')[0].data(),
        });
      }

      e.target.removeClass('highlight');
    });

    targetElements.bind('click', (e) => {
      const ele = e.target;
      if (ele.selected() && ele.isNode()) {
        if (cytoscapeObject.nodes(':selected').size() === 1) {
          ele.neighborhood().selectify().select().unselectify();
        } else {
          cytoscapeObject
            .nodes(':selected')
            .filter(`[id != "${ele.id()}"]`)
            .neighborhood()
            .selectify()
            .select()
            .unselectify();
        }
      } else {
        cytoscapeObject.elements(':selected').unselect().selectify();
      }
    });

    cytoscapeObject.bind('click', (e) => {
      if (e.target === cytoscapeObject) {
        cytoscapeObject.elements(':selected').unselect().selectify();
        onElementsMouseover({
          type: 'background',
          data: {
            nodeCount: cytoscapeObject.nodes().size(),
            edgeCount: cytoscapeObject.edges().size(),
          },
        });
      }
    });
  };

  const addElements = (centerId, d) => {
    const generatedData = generateCytoscapeElement(
      d.rows,
      maxDataOfGraph,
      true,
    );
    if (generatedData.elements.nodes.length === 0) {
      alert('No data to extend.');
      return;
    }

    cytoscapeObject.elements().lock();
    cytoscapeObject.add(generatedData.elements);

    const newlyAddedEdges = cytoscapeObject.edges('.new');
    const newlyAddedTargets = newlyAddedEdges.targets();
    const newlyAddedSources = newlyAddedEdges.sources();
    const rerenderTargets = newlyAddedEdges
      .union(newlyAddedTargets)
      .union(newlyAddedSources);

    const centerPosition = {
      ...cytoscapeObject.nodes().getElementById(centerId).position(),
    };
    cytoscapeObject.elements().unlock();
    rerenderTargets.layout(seletableLayouts.concentric).run();

    const centerMovedPosition = {
      ...cytoscapeObject.nodes().getElementById(centerId).position(),
    };
    const xGap = centerMovedPosition.x - centerPosition.x;
    const yGap = centerMovedPosition.y - centerPosition.y;
    rerenderTargets.forEach((ele) => {
      const pos = ele.position();
      ele.position({ x: pos.x - xGap, y: pos.y - yGap });
    });
    addEventOnElements(cytoscapeObject.elements('new'));

    addLegendData(generatedData.legend);
    rerenderTargets.removeClass('new');
    setEdgeElements([]);
  };

  useEffect(() => {
    if (cytoscapeMenu === null && cytoscapeObject !== null) {
      const cxtMenuConf = {
        menuRadius(ele) {
          return ele.cy().zoom() <= 1 ? 55 : 70;
        },
        selector: 'node',
        commands: [
          {
            content: ReactDOMServer.renderToString(
              <FontAwesomeIcon icon={faLockOpen} size="lg" />,
            ),
            select(ele) {
              ele.animate({ position: initLocation[ele.id()] });
            },
          },
          {
            content: ReactDOMServer.renderToString(
              <FontAwesomeIcon icon={faProjectDiagram} size="lg" />,
            ),
            select(ele) {
              const elAnimate = ele.animation({
                style: {
                  'border-color': 'green',
                  'border-width': '11px',
                },
                duration: 1000,
              });
              elAnimate.play();
              const animateTimer = setInterval(() => {
                if (elAnimate.complete()) {
                  elAnimate.reverse().play();
                }
              }, 1000);

              fetch('/api/v1/cypher', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  cmd: `SELECT * FROM cypher('${graph}', $$ MATCH (S)-[R]-(T) WHERE id(S) = ${ele.id()} RETURN S, R, T $$) as (S agtype, R agtype, T agtype);`,
                }),
              })
                .then((res) => res.json())
                .then((data) => {
                  elAnimate.rewind().stop();
                  clearInterval(animateTimer);
                  addElements(ele.id(), data);
                });
            },
          },
          {
            content: ReactDOMServer.renderToString(
              <FontAwesomeIcon icon={faEyeSlash} size="lg" />,
            ),
            select(ele) {
              ele.remove();
            },
          },
          {
            content: ReactDOMServer.renderToString(
              <FontAwesomeIcon icon={faTrash} size="lg" />,
            ),
            select(ele) {
              dispatch(openModal());
              dispatch(addGraphHistory(graph));
              dispatch(addElementHistory(ele.id()));
            },
          },
          {
            content: ReactDOMServer.renderToString(<IconFilter size="lg" />),
            select(ele) {
              const newFilterObject = {
                key: uuid(),
                keyword: ele.data().properties[ele.data().caption],
                property: {
                  label: ele.data().label,
                  property: ele.data().caption,
                },
              };
              onAddSubmit(newFilterObject);
            },
          },
          {
            content: ReactDOMServer.renderToString(
              <IconSearchCancel size="lg" />,
            ),
            select(ele) {
              const keywordObject = {
                keyword: ele.data().properties[ele.data().caption],
              };
              onRemoveSubmit(keywordObject);
            },
          },
        ],
        fillColor: 'rgba(210, 213, 218, 1)',
        activeFillColor: 'rgba(166, 166, 166, 1)',
        activePadding: 0,
        indicatorSize: 0,
        separatorWidth: 4,
        spotlightPadding: 3,
        minSpotlightRadius: 11,
        maxSpotlightRadius: 99,
        openMenuEvents: 'cxttap',
        itemColor: '#2A2C34',
        itemTextShadowColor: 'transparent',
        zIndex: 9999,
        atMouse: false,
      };
      setCytoscapeMenu(cytoscapeObject.cxtmenu(cxtMenuConf));
    }
    if (cytoscapeEdgeHandle === null && cytoscapeObject !== null) {
      const defaults = {
        complete: (sourceNode, targetNode, addedEntities) => {
          const source = sourceNode[0].data().id;
          const target = targetNode[0].data().id;
          let connected = false;
          cytoscapeObject.edges().forEach((ele) => {
            if (ele.data().size && ele.data().source === source && ele.data().target === target) {
              connected = true;
              addedEntities.remove();
            }
          });
          if (!connected) {
            const edgeParam = {
              source: sourceNode[0].data().id,
              target: targetNode[0].data().id,
              sourceLabel: sourceNode[0].data().label,
              targetLabel: targetNode[0].data().label,
            };
            setEdgeParams(edgeParam);
            setEdgeModal(true);
            setEntity(addedEntities);
          } else setEdgeModal(false);
        },
        preview: false,
        handleLineType: 'ghost',
        handleColor: '#ff0000',
        handleNodes: 'node',
        handlePosition: 'middle top',
        hoverDelay: 150,
        toggleOffOnLeave: true,
      };
      setCytoscapeEdgeHandle(cytoscapeObject.edgehandles(defaults));
      cytoscapeObject.edgehandles('disable');
    }
  }, [cytoscapeObject, cytoscapeMenu, cytoscapeEdgeHandle]);

  const edgeHanlder = (e) => {
    if (e.target.checked && cytoscapeObject) {
      cytoscapeObject.edgehandles('enable');
      cytoscapeObject.edgehandles('drawon');
    } else {
      cytoscapeObject.edgehandles('disable');
      cytoscapeObject.edgehandles('drawoff');
    }
  };

  const resetHandler = () => {
    for (let i = 0; i < generatedCount; i += 1) {
      elements.edges.pop();
    }
    setGeneratedCount(0);
    setElements(elements);
    setEdgeElements([]);
  };

  useEffect(() => {
    if (!edgeModal && edgeElements.length >= 1) {
      entity.remove();
      setEntity(entity);
      const { source, target, label } = edgeElements[edgeElements.length - 1];
      const alias = 'r';
      const generateEdge = {
        group: 'edges',
        data: {
          id: uuid(),
          source,
          target,
          label,
          properties: {},
          backgroundColor: '#F36924',
          borderColor: '#F36924',
          fontColor: '#2A2C34',
          size: 1,
          caption: 'label',
        },
        alias,
        classes: 'edge',
      };
      elements.edges.push(generateEdge);
      setGeneratedCount(generatedCount + 1);
      setElements(elements);
    }
  }, [edgeElements, edgeModal]);

  useEffect(() => {
    if (cytoscapeLayout && cytoscapeObject) {
      const selectedLayout = seletableLayouts[cytoscapeLayout];
      selectedLayout.animate = true;
      selectedLayout.fit = true;

      cytoscapeObject.minZoom(1e-1);
      cytoscapeObject.maxZoom(1.5);
      cytoscapeObject.layout(selectedLayout).run();
      cytoscapeObject.maxZoom(5);
      if (!initialized) {
        addEventOnElements(cytoscapeObject.elements());
        setInitialized(true);
      }
    }
  }, [cytoscapeObject, cytoscapeLayout]);

  const cyCallback = useCallback(
    (newCytoscapeObject) => {
      if (cytoscapeObject) return;
      setCytoscapeObject(newCytoscapeObject);
    },
    [cytoscapeObject],
  );

  return (
    <div className="cytoscape-component" style={{ position: 'relative' }}>
      <Form style={{
        position: 'absolute',
        right: '0.88rem',
        top: '0.88rem',
        zIndex: '9999',
      }}
      >
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Draw Mode"
          onChange={edgeHanlder}
        />
        {edgeElements.length >= 1 && (
          <h6>
            <Badge className="edge-badge" onClick={resetHandler}>
              Reset
            </Badge>
          </h6>
        )}
        {edgeElements.length >= 1 && (
          <h6>
            <Badge className="edge-badge" style={{ marginTop: '0.88rem' }} onClick={() => setSaveModal(true)}>
              Save
            </Badge>
          </h6>
        )}
      </Form>
      { edgeModal && (
        <EdgeProperySettingModal
          show={edgeModal}
          setShow={setEdgeModal}
          edgeElements={edgeElements}
          edgeParams={edgeParams}
          setEdgeElements={setEdgeElements}
        />
      )}
      { saveModal && (
        <EdgeQuerySaveModal
          show={saveModal}
          setShow={setSaveModal}
          edgeElements={edgeElements}
          setEdgeElements={setEdgeElements}
          graph={graph}
        />
      )}
      <CytoscapeComponent
        elements={CytoscapeComponent.normalizeElements(elements)}
        stylesheet={stylesheet}
        cy={cyCallback}
        className={styles.NormalChart}
        wheelSensitivity={0.3}
      />
    </div>
  );
};

CypherResultCytoscapeCharts.defaultProps = {
  cytoscapeObject: null,
};

CypherResultCytoscapeCharts.propTypes = {
  elements: PropTypes.shape({
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        // eslint-disable-next-line react/forbid-prop-types
        data: PropTypes.any,
      }),
    ),
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        // eslint-disable-next-line react/forbid-prop-types
        data: PropTypes.any,
      }),
    ),
  }).isRequired,
  setElements: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  cytoscapeObject: PropTypes.any,
  setCytoscapeObject: PropTypes.func.isRequired,
  cytoscapeLayout: PropTypes.string.isRequired,
  maxDataOfGraph: PropTypes.number.isRequired,
  onElementsMouseover: PropTypes.func.isRequired,
  addLegendData: PropTypes.func.isRequired,
  graph: PropTypes.string.isRequired,
  onAddSubmit: PropTypes.func.isRequired,
  onRemoveSubmit: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  addGraphHistory: PropTypes.func.isRequired,
  addElementHistory: PropTypes.func.isRequired,
};

export default CypherResultCytoscapeCharts;
