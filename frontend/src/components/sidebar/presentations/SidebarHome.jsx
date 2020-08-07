import React from 'react'
import { Badge } from 'react-bootstrap'

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            marginTop: 0,
            height: 0.3
        }}
    />
);

const SidebarHome = () => {
    return (
        <div className="sidebar-home">
            <div className="sidebar sidebar-header">
                <h3>Database Information</h3>
            </div>
            <div className="sidebar sidebar-body">
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>Use Graph Path</b></label>
                    <ColoredLine color="#B0B0B0" />
                    <select className="form-control theme-switcher">
                        <option value="public">Public</option>
                        <option value="coronaSpread">corona_spread</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>Vertex Label</b></label>
                    <ColoredLine color="#B0B0B0" />
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <h5 style={{paddingRight: '0.3em'}}><span class="badge badge-pill badge-light">*(786)</span></h5>
                        <h5 style={{paddingRight: '0.3em'}}><span class="badge badge-pill badge-light">Gu(42)</span></h5>
                        <h5 style={{paddingRight: '0.3em'}}><span class="badge badge-pill badge-light">Person(224)</span></h5>
                        <h5 style={{paddingRight: '0.3em'}}><span class="badge badge-pill badge-light">Place(520)</span></h5>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>Edge Label</b></label>
                    <ColoredLine color="#B0B0B0" />
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <h5 style={{paddingRight: '0.3em'}}><span class="badge badge-light">*(4138)</span></h5>
                        <h5 style={{paddingRight: '0.3em'}}><span class="badge badge-light">CONTACT(0)</span></h5>
                        <h5 style={{paddingRight: '0.3em'}}><span class="badge badge-light">INHERIT(354)</span></h5>
                        <h5 style={{paddingRight: '0.3em'}}><span class="badge badge-light">MOVE(3784)</span></h5>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>Properties</b></label>
                    <ColoredLine color="#B0B0B0" />
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <h5 style={{paddingRight: '0.3em'}}><span class="badge badge-dark">guname</span></h5>
                        <h5 style={{paddingRight: '0.3em'}}><span class="badge badge-dark">id</span></h5>
                        <h5 style={{paddingRight: '0.3em'}}><span class="badge badge-dark">patientid</span></h5>
                        <h5 style={{paddingRight: '0.3em'}}><span class="badge badge-dark">residence</span></h5>
                        <h5 style={{paddingRight: '0.3em'}}><span class="badge badge-dark">patient_id</span></h5>
                        <h5 style={{paddingRight: '0.3em'}}><span class="badge badge-dark">latitude</span></h5>
                        <h5 style={{paddingRight: '0.3em'}}><span class="badge badge-dark">longitude</span></h5>
                        <h5 style={{paddingRight: '0.3em'}}><span class="badge badge-dark">placename</span></h5>
                        <h5 style={{paddingRight: '0.3em'}}><span class="badge badge-dark">type</span></h5>
                        <h5 style={{paddingRight: '0.3em'}}><span class="badge badge-dark">date</span></h5>
                        <h5 style={{paddingRight: '0.3em'}}><span class="badge badge-dark">time</span></h5>
                        <h5 style={{paddingRight: '0.3em'}}><span class="badge badge-dark">type</span></h5>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>Connected as</b></label>
                    <ColoredLine color="#B0B0B0" />
                    <div>
                        <h7><div class="col-sm-6" style={{textAlign:'right'}}>Username:</div><div class="col-sm-6"></div></h7>
                        <h7><div class="col-sm-6" style={{textAlign:'right'}}>Roles:</div><div class="col-sm-6"></div></h7>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>DBMS</b></label>
                    <ColoredLine color="#B0B0B0" />
                    <div>
                        <h7><div class="col-sm-6" style={{textAlign:'right'}}>Version:</div><div class="col-sm-6"></div></h7>
                        <h7><div class="col-sm-6" style={{textAlign:'right'}}>Edition:</div><div class="col-sm-6"></div></h7>
                        <h7><div class="col-sm-6" style={{textAlign:'right'}}>Name:</div><div class="col-sm-6"></div></h7>
                        <h7><div class="col-sm-6" style={{textAlign:'right'}}>Databases:</div><div class="col-sm-6"></div></h7>
                        <h7><div class="col-sm-6" style={{textAlign:'right'}}>Information:</div><div class="col-sm-6"></div></h7>
                        <h7><div class="col-sm-6" style={{textAlign:'right'}}>Query List:</div><div class="col-sm-6"></div></h7>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarHome