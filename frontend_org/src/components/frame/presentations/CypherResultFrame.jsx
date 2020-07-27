import React from 'react'
import { Tab, Nav } from 'react-bootstrap';

const CypherResultFrame = () => {
    return (
        <div className="card mt-3">
            <div className="card-header">
                <div className="d-flex card-title text-muted">
                    <div className="mr-auto">$ MATCH (v)-[r:has]-(v2) RETURN v, r, v2 LIMIT 30;</div>
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
                    <Tab.Container defaultActiveKey="profile">

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
                                <Nav.Link eventKey="code"><span className="fa fa-terminal" aria-hidden="true"></span><br />Code</Nav.Link>
                            </Nav.Item>

                        </Nav>
                        <Tab.Content className="graph-card-content container-fluid">

                            <Tab.Pane eventKey="graph">
                                <h5>graph</h5>
                                <p>graph</p>
                            </Tab.Pane>

                            <Tab.Pane eventKey="table">
                                <h5>Table</h5>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>v</th>
                                            <th>r</th>
                                            <th>v2</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>d1</td>
                                            <td>d2</td>
                                            <td>d3</td>
                                        </tr>
                                        <tr>
                                            <td>d1</td>
                                            <td>d2</td>
                                            <td>d3</td>
                                        </tr>
                                        <tr>
                                            <td>d1</td>
                                            <td>d2</td>
                                            <td>d3</td>
                                        </tr>
                                        <tr>
                                            <td>d1</td>
                                            <td>d2</td>
                                            <td>d3</td>
                                        </tr>
                                        <tr>
                                            <td>d1</td>
                                            <td>d2</td>
                                            <td>d3</td>
                                        </tr>
                                        <tr>
                                            <td>d1</td>
                                            <td>d2</td>
                                            <td>d3</td>
                                        </tr>
                                        <tr>
                                            <td>d1</td>
                                            <td>d2</td>
                                            <td>d3</td>
                                        </tr>
                                        <tr>
                                            <td>d1</td>
                                            <td>d2</td>
                                            <td>d3</td>
                                        </tr>
                                        <tr>
                                            <td>d1</td>
                                            <td>d2</td>
                                            <td>d3</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Tab.Pane>

                            <Tab.Pane eventKey="text">
                                <h5>Text</h5>
                                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                            </Tab.Pane>

                            <Tab.Pane eventKey="code">
                                <h5>Code</h5>
                                <p>code</p>
                            </Tab.Pane>

                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
        </div>

    );
}

export default CypherResultFrame