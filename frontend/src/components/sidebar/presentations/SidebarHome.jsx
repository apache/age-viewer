import React, { useReducer } from 'react'
import { Badge } from 'react-bootstrap'
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

const StyleWrap = {display: 'flex', flexWrap: 'wrap'};
const StyleItem = {paddingRight: '0.3em', cursor: 'pointer'};
const StyleJustifyCenter = {display: 'flex', justifyContent: 'center'};
const StyleTextright = {marginBottom: '10px', textAlign: 'right', fontSize: '13px', fontWeight: 'bold'};
const StyleTextLeft = {fontSize: '13px', fontWeight: 'bold'}

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
            <div style={StyleWrap}>
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
        <h5 style={StyleItem}><span className="badge badg-pill badge-dark" onClick={() => queryStr({label}, 'v')}>{label}({cnt})</span></h5>
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
        <div style={StyleWrap}>
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
        <h5 style={StyleItem}><span className="badge badge-light" onClick={() => queryStr({label}, 'e')}>{label}({cnt})</span></h5>
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
        <div style={StyleWrap}>
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
        <h5 style={StyleItem}><span className={classNames} onClick={() => queryStr({propertyName}, 'p')}>{propertyName}</span></h5>
    </Fragment>
);

const ConnectedText =({userName, roleName}) => (
    <div>
        <h6>
        <div style={StyleJustifyCenter}>
            <div className="col-sm-6" style={StyleTextright}>Username:</div><div className="col-sm-6" style={StyleTextLeft}>{userName}</div>
        </div>
        <div style={StyleJustifyCenter}>
            <div className="col-sm-6" style={StyleTextright}>Roles:</div><div className="col-sm-6" style={StyleTextLeft}>{roleName}</div>
        </div>
        </h6>
    </div>
);

const DBMSText =({dbname, graph}) => (
    <div>
        <h6>
            <div style={StyleJustifyCenter}>
                <div className="col-sm-6" style={StyleTextright}>Version:</div><div className="col-sm-6" style={StyleTextLeft}></div>
            </div>
            <div style={StyleJustifyCenter}>
                <div className="col-sm-6" style={StyleTextright}>Edition:</div><div className="col-sm-6" style={StyleTextLeft}></div>
            </div>
            <div style={StyleJustifyCenter}>
                <div className="col-sm-6" style={StyleTextright}>Name:</div><div className="col-sm-6" style={StyleTextLeft}></div>
            </div>
            <div style={StyleJustifyCenter}>
                <div className="col-sm-6" style={StyleTextright}>Databases:</div><div className="col-sm-6" style={StyleTextLeft}>{dbname}</div>
            </div>
            <div style={StyleJustifyCenter}>
                <div className="col-sm-6" style={StyleTextright}>Graph Path:</div><div className="col-sm-6" style={StyleTextLeft}>{graph}</div>
            </div>
            <div style={StyleJustifyCenter}>
                <div className="col-sm-6" style={StyleTextright}>Information:</div><div className="col-sm-6" style={StyleTextLeft}></div>
            </div>
            <div style={StyleJustifyCenter}>
                <div className="col-sm-6" style={StyleTextright}>Query List:</div><div className="col-sm-6" style={StyleTextLeft}></div>
            </div>
        </h6>
    </div>
);

const SidebarHome = ({edges, nodes, propertyKeys, dbname, graph, role, queryStr}) => {
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
                    <ConnectedText userName={role.user_name} roleName={role.role_name} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>DBMS</b></label>
                    <ColoredLine />
                    <DBMSText  dbname={dbname} graph={graph} />
                </div>
            </div>
        </div>
    );
}

export default SidebarHome