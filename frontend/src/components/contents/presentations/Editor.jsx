import React, {useRef}  from 'react';


const Editor = ({ onClick }) => {
    const reqString = useRef()

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="container-fluid editor-area card-header">
                    <div className="input-group">
                        <input type="text" className="form-control col-11" placeholder="$"
                            aria-label="AgensBrowser Editor" aria-describedby="editor-buttons" ref={reqString} />
                        <div className="input-group-append ml-auto" id="editor-buttons">
                            <button className="btn btn-link" type="button"><span className="fa fa-star-o fa-lg"
                                    aria-hidden="true"></span></button>
                            <button className="btn btn-link" type="button"><span className="fa fa-eraser fa-lg"
                                    aria-hidden="true"></span></button>
                            <button className="btn btn-link" type="button" onClick={() => onClick(reqString)}><span className="fa fa-play-circle-o fa-lg"
                                    aria-hidden="true"></span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="alert alert-primary alert-dismissible fade show" role="alert">
                Database access not availble. Please use <a href="#" className="badge badge-light"><span
                        className="fa fa-play-circle-o fa-lg pr-2" aria-hidden="true"></span>:server connection</a> to
                estableish connection. There's
                a graph waiting for you.
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    );
}

export default Editor