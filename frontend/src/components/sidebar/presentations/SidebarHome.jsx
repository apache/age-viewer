import React, { useReducer } from 'react'
import { Fragment } from 'react';
import uuid from 'react-uuid';

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

const NodeList = ({nodes, queryStr}) => {
    let list;
    if(nodes) {
        list = nodes.map(item => (
            <NodeItems
                key={uuid()}
                label={item.label}
                cnt={item.cnt}
                queryStr={queryStr}
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

const NodeItems = ({label, cnt, queryStr}) => (
    <Fragment>
        <h5 style={{paddingRight: '0.3em', cursor: 'pointer'}}><span className="badge badg-pill badge-dark" onClick={() => queryStr({label}, 'v')}>{label}({cnt})</span></h5>
    </Fragment>
);

const EdgeList = ({edges, queryStr}) => {
    let list;
    if(edges) {
        list = edges.map(item => (
            <EdgeItems
                key={uuid()}
                label={item.label}
                cnt={item.cnt}
                queryStr={queryStr}
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

const EdgeItems = ({label, cnt, queryStr}) => (
    <Fragment>
        <h5 style={{paddingRight: '0.3em', cursor: 'pointer'}}><span className="badge badge-light" onClick={() => queryStr({label}, 'e')}>{label}({cnt})</span></h5>
    </Fragment>
);

const PropertyList = ({propertyKeys, queryStr}) => {
    let list;
    if(propertyKeys) {
        list = propertyKeys.map(item => (
            <PropertyItems
                key={uuid()}
                propertyName={item.key}
                classNames={item.key_type === 'v' ? 'badge badge-pill badge-dark' : 'badge badge-light'}
                queryStr={queryStr}
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

const PropertyItems =({propertyName, classNames, queryStr}) => (
    <Fragment>
        <h5 style={{paddingRight: '0.3em', cursor: 'pointer'}}><span className={classNames} onClick={() => queryStr({propertyName}, 'p')}>{propertyName}</span></h5>
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

const SidebarHome = ({edges, nodes, propertyKeys, queryStr}) => {
    return (
        <div className="sidebar-home">
            <div className="sidebar sidebar-header">
                <h3>Database Information</h3>
            </div>
            <div className="sidebar sidebar-body">
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>Vertex Label</b></label>
                    <ColoredLine />
                    <NodeList nodes={nodes} queryStr={queryStr} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>Edge Label</b></label>
                    <ColoredLine />
                    <EdgeList edges={edges} queryStr={queryStr} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>Properties</b></label>
                    <ColoredLine />
                    <PropertyList propertyKeys={propertyKeys} queryStr={queryStr} />
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