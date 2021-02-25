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

import React from 'react';
import PropTypes from 'prop-types';

import uuid from 'react-uuid';
import { connect } from 'react-redux';
import { ColoredLine, SubLabelLeft, SubLabelRight } from './SidebarComponents';

const genLabelQuery = (eleType, labelName, database) => {
  function age() {
    if (eleType === 'node') {
      if (labelName === '*') {
        return `SELECT * from cypher('${database.graph}', $$
          MATCH (V)
          RETURN V
$$) as (V agtype);`;
      }
      return `SELECT * from cypher('${database.graph}', $$
          MATCH (V:${labelName})
          RETURN V
$$) as (V agtype);`;
    }
    if (eleType === 'edge') {
      if (labelName === '*') {
        return `SELECT * from cypher('${database.graph}', $$
          MATCH (V)-[R]-(V2)
          RETURN V,R,V2
$$) as (V agtype, R agtype, V2 agtype);`;
      }
      return `SELECT * from cypher('${database.graph}', $$
          MATCH (V)-[R:${labelName}]-(V2)
          RETURN V,R,V2
$$) as (V agtype, R agtype, V2 agtype);`;
    }
    return '';
  }
  function agens() {
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
  }
  if (database.flavor === 'AGE') {
    return age();
  }
  if (database.flavor === 'AGENS') {
    return agens();
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
NodeList.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    cnt: PropTypes.number,
  })).isRequired,
  setCommand: PropTypes.func.isRequired,
};

const NodeItems = connect((state) => ({
  database: state.database,
}), {})(
  ({
    label, cnt, setCommand, database,
  }) => (
    <button
      type="button"
      className="nodeLabel mx-1 my-1 btn rounded-pill btn-dark btn-sm"
      onClick={() => setCommand(genLabelQuery('node', label, database))}
    >
      {label}
      (
      {cnt}
      )
    </button>
  ),
);
NodeItems.propTypes = {
  database: PropTypes.shape({
    flavor: PropTypes.string,
  }).isRequired,
  label: PropTypes.string.isRequired,
  cnt: PropTypes.number.isRequired,
  setCommand: PropTypes.func.isRequired,
};

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
EdgeList.propTypes = {
  edges: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    cnt: PropTypes.number,
  })).isRequired,
  setCommand: PropTypes.func.isRequired,
};

const EdgeItems = connect((state) => ({
  database: state.database,
}), {})(({
  label, cnt, setCommand, database,
}) => (
  <button
    type="button"
    className="edgeLabel mx-1 my-1 btn btn-light btn-sm"
    onClick={() => setCommand(genLabelQuery('edge', label, database))}
  >
    {label}
    (
    {cnt}
    )
  </button>
));
EdgeItems.propTypes = {
  database: PropTypes.shape({
    flavor: PropTypes.string,
  }).isRequired,
  label: PropTypes.string.isRequired,
  cnt: PropTypes.number.isRequired,
  setCommand: PropTypes.func.isRequired,
};

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
PropertyList.propTypes = {
  propertyKeys: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    key_type: PropTypes.string,
  })).isRequired,
  setCommand: PropTypes.func.isRequired,
};

const PropertyItems = ({ propertyName, keyType, setCommand }) => (
  <button
    type="button"
    className={`${keyType === 'v' ? 'nodeLabel btn-dark' : 'edgeLabel btn-light'} mx-1 btn rounded-pill btn-sm`}
    onClick={() => setCommand(genPropQuery(keyType, propertyName))}
  >
    {propertyName}
  </button>
);
PropertyItems.propTypes = {
  propertyName: PropTypes.string.isRequired,
  keyType: PropTypes.string.isRequired,
  setCommand: PropTypes.func.isRequired,
};

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

ConnectedText.propTypes = {
  userName: PropTypes.string.isRequired,
  roleName: PropTypes.string.isRequired,
};

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

DBMSText.propTypes = {
  dbname: PropTypes.string.isRequired,
  graph: PropTypes.string.isRequired,
};

const SidebarHome = ({
  edges, nodes, propertyKeys, setCommand, dbname, graph, role,
}) => (
  <div className="sidebar-home">
    <div className="sidebar sidebar-header">
      <h4>Database Information</h4>
    </div>
    <div className="sidebar sidebar-body">
      <div className="form-group">
        <b>Vertex Label</b>
        <ColoredLine />
        <NodeList nodes={nodes} setCommand={setCommand} />
      </div>
      <div className="form-group">
        <b>Edge Label</b>
        <ColoredLine />
        <EdgeList edges={edges} setCommand={setCommand} />
      </div>
      <div className="form-group">
        <b>Properties</b>
        <ColoredLine />
        <PropertyList propertyKeys={propertyKeys} setCommand={setCommand} />
      </div>
      <div className="form-group">
        <b>Connected as</b>
        <ColoredLine />
        <ConnectedText userName={role.user_name} roleName={role.role_name} />
      </div>
      <div className="form-group">
        <b>DBMS</b>
        <ColoredLine />
        <DBMSText dbname={dbname} graph={graph} />
      </div>

    </div>
  </div>
);

SidebarHome.propTypes = {
  edges: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    cnt: PropTypes.number,
  })).isRequired,
  nodes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    cnt: PropTypes.number,
  })).isRequired,
  propertyKeys: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    key_type: PropTypes.string,
  })).isRequired,
  setCommand: PropTypes.func.isRequired,
  dbname: PropTypes.string.isRequired,
  graph: PropTypes.string.isRequired,
  role: PropTypes.shape({
    user_name: PropTypes.string,
    role_name: PropTypes.string,
  }).isRequired,
};

export default SidebarHome;
