import React from 'react'

const ServerDisconnectFrame = () => {
    return (
        <div className="card mt-3">
            <div className="card-header">
                <div className="d-flex card-title text-muted">
                    <div className="mr-auto">$ :server disconnect</div>
                    <div className="card-title-collapsed card-title-close px-3"><span className="fa fa-paperclip fa-lg"
                        aria-hidden="true"></span></div>
                    <div className="card-title-collapsed card-title-close px-3" data-toggle="collapse"
                        data-target="#disconnectionCardBody" aria-expanded="false"
                        aria-controls="disconnectionCardBody"><span className="fa fa-lg" aria-hidden="true"></span>
                    </div>
                    <div className="card-title-collapsed card-title-close pl-3">
                        <span className="fa fa-times fa-lg" aria-hidden="true"></span></div>
                </div>
            </div>
            <div className="card-body collapse show" id="disconnectionCardBody">
                <div className="row">
                    <div className="col-3">
                        <h3>Disconnected Succesfully</h3>
                        <p>You are successfully disconnected from Agensgraph.</p>
                    </div>
                    <div className="col-9">
                        <p>You may run <a href="#" className="badge badge-light"><span
                        className="fa fa-play-circle-o fa-lg pr-2" aria-hidden="true"></span>:server connection</a> to establish new connection</p>
                    </div>
                </div>
            </div>
            <div className="card-footer">

            </div>
        </div>
    );
}

export default ServerDisconnectFrame