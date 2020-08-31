import React, { useReducer } from 'react'
import { Badge } from 'react-bootstrap'
import { Fragment } from 'react';
import uuid from 'react-uuid';


const genLabelQuery = (eleType, labelName) => {
    if (eleType === 'node') {
        return "MATCH (V) WHERE LABEL(V) = '" + labelName + "' RETURN V"
    }
    else if (eleType === 'edge') {
        return "MATCH (V)-[R]->(V2) WHERE LABEL(R) = '" + labelName + "' RETURN *"
    }
}

const genPropQuery = (eleType, propertyName) => {
    if (eleType === 'v') {
        return "MATCH (V) WHERE V." + propertyName + " IS NOT NULL RETURN V"
    }
    else if (eleType === 'e') {
        return "MATCH (V)-[R]->(V2) WHERE R." + propertyName + " IS NOT NULL RETURN *"
    }
}

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


const NodeList = ({nodes, setCommand}) => {
    let list;
    if(nodes) {
        list = nodes.map(item => (
            <NodeItems
                key={uuid()}
                label={item.label}
                cnt={item.cnt}
                setCommand={setCommand}
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

const NodeItems = ({label, cnt, setCommand}) => (
    <Fragment>
        <span className="nodeLabel px-3 py-2 mx-1 my-1 badge badge-pill badge-dark" onClick={() => setCommand(genLabelQuery("node", label))}>{label}({cnt})</span>
    </Fragment>
);

const EdgeList = ({edges, setCommand}) => {
    let list;
    if(edges) {
        list = edges.map(item => (
            <EdgeItems
                key={uuid()}
                label={item.label}
                cnt={item.cnt}
                setCommand={setCommand}
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

const EdgeItems = ({label, cnt, setCommand}) => (
    <Fragment>
        <span className="edgeLabel px-3 py-2 mx-1 my-1 badge badge-light" onClick={() => setCommand(genLabelQuery("edge", label))}>{label}({cnt})</span>
    </Fragment>
);

const PropertyList = ({propertyKeys, setCommand}) => {
    let list;
    if(propertyKeys) {
        list = propertyKeys.map(item => (
            <PropertyItems
                key={uuid()}
                propertyName={item.key}
                keyType={item.key_type}
                setCommand={setCommand}
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

const PropertyItems =({propertyName, keyType, setCommand}) => (
    <Fragment>
        <span className={keyType === 'v' ? 'nodeLabel px-3 py-2 mx-1 my-1 badge badge-pill badge-dark' : 'edgeLabel px-3 py-2 mx-1 my-1 badge badge-light'} onClick={() => setCommand(genPropQuery(keyType, propertyName))}>{propertyName}</span>
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
                <div className="col-sm-6" style={StyleTextright}>Version:</div><div className="col-sm-6" style={StyleTextLeft}>-</div>
            </div>
            <div style={StyleJustifyCenter}>
                <div className="col-sm-6" style={StyleTextright}>Edition:</div><div className="col-sm-6" style={StyleTextLeft}>-</div>
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


const SidebarHome = ({edges, nodes, propertyKeys, setCommand, dbname, graph, role }) => {
    return (
        <div className="sidebar-home">
            <div className="sidebar sidebar-header">
                <h4>Database Information</h4>
            </div>
            <div className="sidebar sidebar-body">
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>Vertex Label</b></label>
                    <ColoredLine />
                    <NodeList nodes={nodes} setCommand={setCommand}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>Edge Label</b></label>
                    <ColoredLine />
                    <EdgeList edges={edges} setCommand={setCommand}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>Properties</b></label>
                    <ColoredLine />
                    <PropertyList propertyKeys={propertyKeys} setCommand={setCommand}/>
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