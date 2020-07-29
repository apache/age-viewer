import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import { Tab, Nav } from 'react-bootstrap';
import CypherResultCytoscapeContainer from '../../cypherresult/containers/CypherResultCytoscapeContainer'
import CypherResultTableContainer from '../../cypherresult/containers/CypherResultTableContainer'
import CypherResultMetaContainer from '../../cypherresult/containers/CypherResultMetaContainer'

const CypherResultFrame = ({reqKey, reqString, executeCypherQuery}) => {

      const dispatch = useDispatch();
  
      useEffect(() => {
          dispatch(() =>executeCypherQuery([reqKey, reqString]));
      }, [reqKey, reqString, executeCypherQuery, dispatch])

    return (
        <div className="card mt-3">
            <div className="card-header">
                <div className="d-flex card-title text-muted">
                    <div className="mr-auto"><strong> $ {reqString} </strong></div>
                    <div className="card-title-collapsed card-title-close px-3"><span className="fa fa-download fa-lg"
                        aria-hidden="true"></span></div>
                    <div className="card-title-collapsed card-title-close px-3"><span className="fa fa-paperclip fa-lg"
                        aria-hidden="true"></span></div>
                    <div className="card-title-collapsed card-title-close px-3" data-toggle="collapse"
                        data-target="#graphCardBody" aria-expanded="false" aria-controls="graphCardBody"><span
                            className="fa fa-lg" aria-hidden="true"></span></div>
                    <div className="card-title-collapsed card-title-close px-3">
                        <span className="fa fa-refresh fa-lg" aria-hidden="true"></span></div>
                    <div className="card-title-collapsed card-title-close pl-3">
                        <span className="fa fa-times fa-lg" aria-hidden="true"></span></div>
                </div>
            </div>
            <div className="card-body card-body-graph collapse show" id="graphCardBody">
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
                        <Tab.Content className="graph-card-content container-fluid" >

                            <Tab.Pane eventKey="graph" style={{ height:'100%' }}>
                                <CypherResultCytoscapeContainer reqKey={reqKey}/>
                            </Tab.Pane>

                            <Tab.Pane eventKey="table">
                                <CypherResultTableContainer reqKey={reqKey}/>                                
                            </Tab.Pane>

                            <Tab.Pane eventKey="text">
                                <h5>Text</h5>
                                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                            </Tab.Pane>

                            <Tab.Pane eventKey="code">
                                <CypherResultMetaContainer reqKey={reqKey}/>
                            </Tab.Pane>

                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
        </div>

    );
}

export default CypherResultFrame