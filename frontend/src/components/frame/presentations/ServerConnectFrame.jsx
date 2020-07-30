import React, {useState} from 'react'

const ServerConnectFrame = ({reqString, connectToAgensGraph, addFrame, addAlert}) => {
    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
          });
    }

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
                                <label htmlFor="host">Connect URL</label>
                                <input type="text" className="form-control" id="host" name="host" onChange={handleChange}/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="port">Connect Port</label>
                                <input type="number" className="form-control" id="port" name="port" onChange={handleChange}/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="database">Database Name</label>
                                <input type="text" className="form-control" id="database"
                                    name="database" onChange={handleChange}/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="graph">Graph Path</label>
                                <input type="text" className="form-control" id="graph"
                                    name="graph" onChange={handleChange}/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="user">User Name</label>
                                <input type="text" className="form-control" id="user"
                                    name="user" onChange={handleChange}/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password"
                                    name="password" onChange={handleChange}/>
                            </fieldset>
                            
                        </form>
                        <button className="btn btn-info" onClick={() => [connectToAgensGraph(formData), addAlert('NoticeServerConnected')]}>CONNECT</button>
                    </div>
                </div>
            </div>
            <div className="card-footer">

            </div>
        </div >
    );
}

export default ServerConnectFrame