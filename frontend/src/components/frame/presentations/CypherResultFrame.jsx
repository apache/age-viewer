import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { Tab, Nav, Collapse } from 'react-bootstrap';
import CypherResultCytoscapeContainer from '../../cypherresult/containers/CypherResultCytoscapeContainer'
import CypherResultTableContainer from '../../cypherresult/containers/CypherResultTableContainer'
import CypherResultTextContainer from '../../cypherresult/containers/CypherResultTextContainer'
import CypherResultMetaContainer from '../../cypherresult/containers/CypherResultMetaContainer'

const CypherResultFrame = ({ refKey, reqString, removeFrame, executeCypherQuery }) => {
    const [isExpanded, setIsExpanded] = useState(true)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(() => executeCypherQuery([refKey, reqString]));
    }, [refKey, reqString, executeCypherQuery, dispatch])

    return (
        <div className="card mt-3">
            <div className="card-header">
                <div className="d-flex card-title text-muted">
                    <div className="mr-auto"><strong> $ {reqString} </strong></div>
                    <button className="frame-head-button btn btn-link px-3"><span className="fa fa-download fa-lg"
                        aria-hidden="true"></span></button>
                    <button className="frame-head-button btn btn-link px-3"><span className="fa fa-paperclip fa-lg"
                        aria-hidden="true"></span></button>
                    <button className="frame-head-button btn btn-link px-3" data-toggle="collapse"
                        aria-expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} aria-controls={refKey}>
                        <span className="fa fa-lg" aria-hidden="true"></span></button>
                    <button className="frame-head-button btn btn-link px-3">
                        <span className="fa fa-refresh fa-lg" aria-hidden="true"></span></button>
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
                                <CypherResultCytoscapeContainer refKey={refKey} />
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