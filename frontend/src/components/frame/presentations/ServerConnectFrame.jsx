import React from 'react'

const ServerConnectFrame = ({reqString, connectToAgensGraph}) => {
    return (
        < div className="card mt-3" >
            <div className="card-header">
                <div className="d-flex card-title text-muted">
                    <div className="mr-auto"><strong> $ {reqString} </strong></div>
                    <div className="card-title-collapsed card-title-close px-3"><span className="fa fa-paperclip fa-lg"
                        aria-hidden="true"></span></div>
                    <div className="card-title-collapsed card-title-close px-3" data-toggle="collapse"
                        data-target="#connectCardBody" aria-expanded="false" aria-controls="connectCardBody">
                        <span className="fa fa-lg" aria-hidden="true"></span></div>
                    <div className="card-title-collapsed card-title-close pl-3">
                        <span className="fa fa-times fa-lg" aria-hidden="true"></span></div>
                </div>
            </div>
            <div className="card-body collapse show" id="connectCardBody">
                <div className="row">
                    <div className="col-3">
                        <h3>Connect to AgensGraph</h3>
                        <p>Database access might require and authenticated connection.</p>
                    </div>
                    <div className="col-9">
                        <form>
                            <fieldset className="form-group">
                                <label htmlFor="connectUrl">Connect URL</label>
                                <input type="text" className="form-control" id="connectUrl" name="connectUrl" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="connectPort">Connect Port</label>
                                <input type="number" className="form-control" id="connectPort" name="connectPort" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="connectDatabaseName">Database Name</label>
                                <input type="text" className="form-control" id="connectDatabaseName"
                                    name="connectDatabaseName" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="connectGraphPath">Graph Path</label>
                                <input type="text" className="form-control" id="connectGraphPath"
                                    name="connectGraphPath" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="connectUserName">User Name</label>
                                <input type="text" className="form-control" id="connectUserName"
                                    name="connectUserName" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="connectPassword">Password</label>
                                <input type="password" className="form-control" id="connectPassword"
                                    name="connectPassword" />
                            </fieldset>
                            
                        </form>
                        <button className="btn btn-info" onClick={connectToAgensGraph}>aaaa</button>
                    </div>
                </div>
            </div>
            <div className="card-footer">

            </div>
        </div >
    );
}

export default ServerConnectFrame