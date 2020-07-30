import React, {useState} from 'react'
import { Collapse } from 'react-bootstrap';

const ServerStatusFrame = ({refKey, reqString, serverInfo, removeFrame, frameIndex }) => {
    const [isExpanded, setIsExpanded] = useState(true)
    const { host, port, user, database, graph } = serverInfo;
    return (
        <div className="card mt-3">
            <div className="card-header">
                <div className="d-flex card-title text-muted">
                    <div className="mr-auto"><strong> $ {reqString} </strong></div>
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
            <div className="card-body collapse" id="connectStatusCardBody">
                <div className="row">
                    <div className="col-3">
                        <h3>Connection Status</h3>
                        <p>This is your current connection information.</p>
                    </div>
                    <div className="col-9">
                        <p>You are connected as user <strong>{user}</strong></p>
                        <p>to <strong>{host}:{port}/{database}</strong></p>
                        <p>Graph path has been set to <strong>{graph}</strong></p>
                    </div>
                </div>
            </div>
            </Collapse>
            <div className="card-footer">

            </div>
        </div>
    );
}

export default ServerStatusFrame