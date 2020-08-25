import React, { useEffect, useState, createRef } from 'react';
import { useDispatch } from 'react-redux'
import uuid from 'react-uuid'
import { Tab, Nav, Collapse } from 'react-bootstrap';
import CypherResultCytoscapeContainer from '../../cypherresult/containers/CypherResultCytoscapeContainer'
import CypherResultTableContainer from '../../cypherresult/containers/CypherResultTableContainer'
import CypherResultTextContainer from '../../cypherresult/containers/CypherResultTextContainer'
import CypherResultMetaContainer from '../../cypherresult/containers/CypherResultMetaContainer'

const CypherResultFrame = ({ refKey, isPinned, reqString, removeFrame, pinFrame }) => {
    const chartAreaRef = createRef()
    const [isExpanded, setIsExpanded] = useState(true)
    const [isFullScreen, setIsFullScreen] = useState(false)

    const expandFrame = () => {
        setIsFullScreen(!isFullScreen)
    }

    const setIconForIsExpanded = (isExpanded) => {
        if (isExpanded) {
            return <span className="fas fa-angle-up fa-lg" aria-hidden="true"></span>
        } else {
            return <span className="fas fa-angle-down fa-lg" aria-hidden="true"></span>
        }
    }

    const setIconForIsFullscreen = () => {
        if (isFullScreen) {
            return <span className="fas fa-compress-alt fa-lg" aria-hidden="true" onClick={() => expandFrame()}></span>
        } else {
            return <span className="fas fa-expand-alt fa-lg" aria-hidden="true" onClick={() => expandFrame()}></span>
        }
    }


    return (
        <div className={"card " + (isFullScreen ? " fullscreen " : "mt-3")}>
            <div className="card-header">
                <div className="d-flex card-title text-muted">
                    <div className="mr-auto"><strong> $ {reqString} </strong></div>
                    <button className={"frame-head-button btn btn-link px-3" + (isFullScreen ? " selected " : "")}>
                        {setIconForIsFullscreen(isExpanded)}</button>
                    <button className={"frame-head-button btn btn-link px-3" + (isPinned ? " selected " : "")} onClick={() => pinFrame(refKey)}><span className="fas fa-paperclip fa-lg"
                        aria-hidden="true"></span></button>
                    <button className="frame-head-button btn btn-link px-3" data-toggle="collapse"
                        aria-expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} aria-controls={refKey}>
                        {setIconForIsExpanded(isExpanded)}</button>
                    <button className="frame-head-button btn btn-link pl-3">
                        <span className="fas fa-times fa-lg" aria-hidden="true" onClick={() => removeFrame(refKey)}></span></button>
                </div>
            </div>
            <Collapse in={isExpanded}>
                <div className="card-body card-body-graph collapse" id={refKey}>
                    <div className="d-flex h-100">
                        <Tab.Container defaultActiveKey="table">

                            <Nav variant="pills" className="flex-column graph-card-nav">

                                <Nav.Item>
                                    <Nav.Link eventKey="table"><span className="fa fa-table" aria-hidden="true"></span><br />Table</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link eventKey="code"><span className="fa fa-terminal" aria-hidden="true"></span><br />Meta</Nav.Link>
                                </Nav.Item>

                            </Nav>
                            <Tab.Content className="graph-card-content container-fluid graph-tabpanel">

                                <Tab.Pane eventKey="table">
                                    <CypherResultTableContainer refKey={refKey} />
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