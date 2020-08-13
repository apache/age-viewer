import React, { useReducer } from 'react'
import { Badge } from 'react-bootstrap'
import { Fragment } from 'react';

const ColoredLine = () => (
    <hr
        style={{
            color: '#B0B0B0',
            backgroundColor: '#B0B0B0',
            marginTop: 0,
            height: 0.3
        }}
    />
);

const NodeList = ({nodes}) => {
    let list;
    if(nodes) {
        list = nodes.map(item => (
            <NodeItems
                label={item.label}
                cnt={item.cnt}
            />
        ));
        return (
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {list}
            </div>
        )
    }
    else {
        return null;
    }
};

const NodeItems = ({label, cnt}) => (
    <Fragment>
        <h5 style={{paddingRight: '0.3em'}}><span className="badge badge-pill badge-light">{label}({cnt})</span></h5>
    </Fragment>
);

const EdgeList = ({edges}) => {
    let list;
    if(edges) {
        list = edges.map(item => (
            <EdgeItems
                label={item.label}
                cnt={item.cnt}
            />
        ));
        return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {list}
        </div>
        )
    }
    else {
        return null;
    }
};

const EdgeItems = ({label, cnt}) => (
    <Fragment>
        <h5 style={{paddingRight: '0.3em'}}><span className="badge badge-light">{label}({cnt})</span></h5>
    </Fragment>
);

const PropertyList = ({propertyKeys}) => {
    let list;
    if(propertyKeys) {
        list = propertyKeys.map(item => (
            <PropertyItems
                propertyKey={item.key}
                classNames={item.key_type === 'v' ? 'badge badge-dark' : 'badge badge-light'}
            />
        ));
        return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {list}
        </div>
        )
    }
    else {
        return null;
    }
};

const PropertyItems =({propertyKey, classNames}) => (
    <Fragment>
        <h5 style={{paddingRight: '0.3em'}}><span className={classNames}>{propertyKey}</span></h5>
    </Fragment>
);

const ConnectedText =() => (
    <div>
        <h6><div className="col-sm-6" style={{textAlign:'right'}}>Username:</div><div className="col-sm-6"></div></h6>
        <h6><div className="col-sm-6" style={{textAlign:'right'}}>Roles:</div><div className="col-sm-6"></div></h6>
    </div>
);

const DBMSText =() => (
    <div>
        <h6><div className="col-sm-6" style={{textAlign:'right'}}>Version:</div><div className="col-sm-6"></div></h6>
        <h6><div className="col-sm-6" style={{textAlign:'right'}}>Edition:</div><div className="col-sm-6"></div></h6>
        <h6><div className="col-sm-6" style={{textAlign:'right'}}>Name:</div><div className="col-sm-6"></div></h6>
        <h6><div className="col-sm-6" style={{textAlign:'right'}}>Databases:</div><div className="col-sm-6"></div></h6>
        <h6><div className="col-sm-6" style={{textAlign:'right'}}>Information:</div><div className="col-sm-6"></div></h6>
        <h6><div className="col-sm-6" style={{textAlign:'right'}}>Query List:</div><div className="col-sm-6"></div></h6>
    </div>
);

const SidebarHome = ({edges, nodes, propertyKeys}) => {
    return (
        <div className="sidebar-home">
            <div className="sidebar sidebar-header">
                <h3>Database Information</h3>
            </div>
            <div className="sidebar sidebar-body">
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>Vertex Label</b></label>
                    <ColoredLine />
                    <NodeList nodes={nodes} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>Edge Label</b></label>
                    <ColoredLine />
                    <EdgeList edges={edges} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>Properties</b></label>
                    <ColoredLine />
                    <PropertyList propertyKeys={propertyKeys} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>Connected as</b></label>
                    <ColoredLine />
                    <ConnectedText />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>DBMS</b></label>
                    <ColoredLine />
                    <DBMSText />
                </div>
            </div>
        </div>
    );
}

export default SidebarHome