import React, { useEffect, useState, createRef } from 'react';
import { useDispatch } from 'react-redux'
import uuid from 'react-uuid'
import { Tab, Nav, Collapse } from 'react-bootstrap';
import CypherResultCytoscapeContainer from '../../cypherresult/containers/CypherResultCytoscapeContainer'
import CypherResultTableContainer from '../../cypherresult/containers/CypherResultTableContainer'
import CypherResultTextContainer from '../../cypherresult/containers/CypherResultTextContainer'
import CypherResultMetaContainer from '../../cypherresult/containers/CypherResultMetaContainer'

const CypherResultFrame = ({ refKey, reqString, removeFrame, executeCypherQuery }) => {
    const chartAreaRef = createRef()
    const [isExpanded, setIsExpanded] = useState(true)
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [zoomRate, setZoomRate] = useState(0)
    const [pan, setPan] = useState({x : 0, y : 0})
    const [cyZoomingEnabled, setCyZoomingEnabled] = useState(false)
    const [cytoscapeContainerKey, setCytoscapeContainerKey] = useState(uuid())

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(() => executeCypherQuery([refKey, reqString]));       
        setZoomRate(chartAreaRef.current.getCy().zoom())
        setPan(chartAreaRef.current.getCy().pan())
    }, [refKey, reqString, executeCypherQuery, dispatch])

    
    const expandFrame = () => {       
        setIsFullScreen(!isFullScreen)
        setCyZoomingEnabled(!cyZoomingEnabled)
        const ref = chartAreaRef.current
        window.setTimeout(resize, 500)
        function resize() {
            ref.getCy().resize()           
            ref.getCy().zoom({level : zoomRate, position: { x: 0, y: 0 }})
            ref.getCy().zoomingEnabled(!cyZoomingEnabled)
            ref.getCy().userZoomingEnabled(!cyZoomingEnabled)
        }
    }

    const refreshFrame = () => {
        setCytoscapeContainerKey(uuid())
    }

    return (
        <div className={"card " + (isFullScreen ? " fullscreen " : "mt-3")}>
            <div className="card-header">
                <div className="d-flex card-title text-muted">
                    <div className="mr-auto"><strong> $ {reqString} </strong></div>
                    <button className="frame-head-button btn btn-link px-3"><span className="fa fa-download fa-lg"
                        aria-hidden="true"></span></button>
                    <button className="frame-head-button btn btn-link px-3">
                        <span className="fa fa-expand fa-lg" aria-hidden="true" onClick={() => expandFrame()}></span></button>
                    <button className="frame-head-button btn btn-link px-3">
                        <span className="fa fa-refresh fa-lg" aria-hidden="true" onClick={() => refreshFrame()}></span></button>
                    <button className="frame-head-button btn btn-link px-3"><span className="fa fa-paperclip fa-lg"
                        aria-hidden="true"></span></button>
                    <button className="frame-head-button btn btn-link px-3" data-toggle="collapse"
                        aria-expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} aria-controls={refKey}>
                        <span className="fa fa-lg" aria-hidden="true"></span></button>
                    <button className="frame-head-button btn btn-link pl-3">
                        <span className="fa fa-times fa-lg" aria-hidden="true" onClick={() => removeFrame(refKey)}></span></button>
                </div>
            </div>
            <Collapse in={isExpanded}>
            <div className="card-body card-body-graph collapse" id={refKey}>
                <div className="d-flex h-100">
                    <Tab.Container defaultActiveKey="graph">

                        <Nav variant="pills" className="flex-column graph-card-nav">

                            <Nav.Item>
                                <Nav.Link eventKey="graph"><span className="fa fa-paperclip" aria-hidden="true"></span><br />Graph</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="table"><span className="fa fa-table" aria-hidden="true"></span><br />Table</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="text"><span className="fa fa-font" aria-hidden="true"></span><br />Text</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="code"><span className="fa fa-terminal" aria-hidden="true"></span><br />Meta</Nav.Link>
                            </Nav.Item>

                        </Nav>
                        <Tab.Content className="graph-card-content container-fluid graph-tabpanel">

                            <Tab.Pane eventKey="graph" style={{ height: '100%' }}>
                                <CypherResultCytoscapeContainer key={cytoscapeContainerKey} forwardedRef={chartAreaRef} refKey={refKey} isFullScreen={isFullScreen} />
                            </Tab.Pane>

                            <Tab.Pane eventKey="table">
                                <CypherResultTableContainer refKey={refKey} />
                            </Tab.Pane>

                            <Tab.Pane eventKey="text">
                                <CypherResultTextContainer refKey={refKey} />
                            </Tab.Pane>

                            <Tab.Pane eventKey="code">
                                <CypherResultMetaContainer refKey={refKey} />
                            </Tab.Pane>

                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
            </Collapse>
        </div>

    );
}

export default CypherResultFrame