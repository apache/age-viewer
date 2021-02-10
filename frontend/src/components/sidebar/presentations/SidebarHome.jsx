/*
 * Copyright 2020 Bitnine Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Fragment } from 'react';

import uuid from 'react-uuid';
import { ColoredLine, SubLabelRight, SubLabelLeft } from './SidebarComponents';

const genLabelQuery = (eleType, labelName) => {
  if (eleType === 'node') {
    if (labelName === '*') {
      return 'MATCH (V) RETURN V';
    }
    return `MATCH (V) WHERE LABEL(V) = '${labelName}' RETURN V`;
  }
  if (eleType === 'edge') {
    if (labelName === '*') {
      return 'MATCH (V)-[R]->(V2) RETURN *';
    }
    return `MATCH (V)-[R]->(V2) WHERE LABEL(R) = '${labelName}' RETURN *`;
  }
  return '';
};

const genPropQuery = (eleType, propertyName) => {
  if (eleType === 'v') {
    return `MATCH (V) WHERE V.${propertyName} IS NOT NULL RETURN V`;
  }
  if (eleType === 'e') {
    return `MATCH (V)-[R]->(V2) WHERE R.${propertyName} IS NOT NULL RETURN *`;
  }
  return '';
};

const NodeList = ({ nodes, setCommand }) => {
  let list;
  if (nodes) {
    list = nodes.map((item) => (
      <NodeItems
        key={uuid()}
        label={item.label}
        cnt={item.cnt}
        setCommand={setCommand}
      />
    ));
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {list}
      </div>
    );
  }

  return null;
};

const NodeItems = ({ label, cnt, setCommand }) => (
  <>
    <span className="nodeLabel px-3 py-2 mx-1 my-1 badge badge-pill badge-dark" onClick={() => setCommand(genLabelQuery('node', label))}>
      {label}
      (
      {cnt}
      )
    </span>
  </>
);

const EdgeList = ({ edges, setCommand }) => {
  let list;
  if (edges) {
    list = edges.map((item) => (
      <EdgeItems
        key={uuid()}
        label={item.label}
        cnt={item.cnt}
        setCommand={setCommand}
      />
    ));
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {list}
      </div>
    );
  }

  return null;
};

const EdgeItems = ({ label, cnt, setCommand }) => (
  <>
    <span className="edgeLabel px-3 py-2 mx-1 my-1 badge badge-light" onClick={() => setCommand(genLabelQuery('edge', label))}>
      {label}
      (
      {cnt}
      )
    </span>
  </>
);

const PropertyList = ({ propertyKeys, setCommand }) => {
  let list;
  if (propertyKeys) {
    list = propertyKeys.map((item) => (
      <PropertyItems
        key={uuid()}
        propertyName={item.key}
        keyType={item.key_type}
        setCommand={setCommand}
      />
    ));
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {list}
      </div>
    );
  }

  return null;
};

const PropertyItems = ({ propertyName, keyType, setCommand }) => (
  <>
    <span className={keyType === 'v' ? 'nodeLabel px-3 py-2 mx-1 my-1 badge badge-pill badge-dark' : 'edgeLabel px-3 py-2 mx-1 my-1 badge badge-light'} onClick={() => setCommand(genPropQuery(keyType, propertyName))}>{propertyName}</span>
  </>
);

const ConnectedText = ({ userName, roleName }) => (
  <div>
    <h6>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <SubLabelRight label="Username :" classes="col-sm-6" />
        <SubLabelLeft label={userName} classes="col-sm-6" />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <SubLabelRight label="Roles :" classes="col-sm-6" />
        <SubLabelLeft label={roleName} classes="col-sm-6" />
      </div>
    </h6>
  </div>
);

const DBMSText = ({ dbname, graph }) => (
  <div>
    <h6>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <SubLabelRight label="Databases :" classes="col-sm-6" />
        <SubLabelLeft label={dbname} classes="col-sm-6" />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <SubLabelRight label="Graph Path :" classes="col-sm-6" />
        <SubLabelLeft label={graph} classes="col-sm-6" />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <SubLabelRight label="Information :" classes="col-sm-6" />
        <SubLabelLeft label="-" classes="col-sm-6" />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <SubLabelRight label="Query List :" classes="col-sm-6" />
        <SubLabelLeft label="-" classes="col-sm-6" />
      </div>
    </h6>
  </div>
);

const SidebarHome = ({
  edges, nodes, propertyKeys, setCommand, dbname, graph, role,
}) => (
  <div className="sidebar-home">
    <div className="sidebar sidebar-header">
      <h4>Database Information</h4>
    </div>
    <div className="sidebar sidebar-body">
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1"><b>Vertex Label</b></label>
        <ColoredLine />
        <NodeList nodes={nodes} setCommand={setCommand} />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1"><b>Edge Label</b></label>
        <ColoredLine />
        <EdgeList edges={edges} setCommand={setCommand} />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1"><b>Properties</b></label>
        <ColoredLine />
        <PropertyList propertyKeys={propertyKeys} setCommand={setCommand} />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1"><b>Connected as</b></label>
        <ColoredLine />
        <ConnectedText userName={role.user_name} roleName={role.role_name} />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1"><b>DBMS</b></label>
        <ColoredLine />
        <DBMSText dbname={dbname} graph={graph} />
      </div>

    </div>
  </div>
);

export default SidebarHome;
