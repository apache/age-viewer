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

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { uuid } from 'cytoscape/src/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';

const CypherResultTable = ({ data, ...props }) => {
  const [localColumns, setLocalColumns] = useState([]);
  const [localRows, setLocalRows] = useState([]);

  useEffect(() => {
    const randKeyName = `key_${uuid()}`;
    let hasKey = false;
    const columnsForFTable = [];
    data.columns.forEach((key) => {
      let isKey = false;
      if (key === 'key') {
        isKey = true;
        hasKey = true;
      }
      columnsForFTable.push({
        title: key,
        dataIndex: isKey ? randKeyName : key,
        key: isKey ? randKeyName : key,
        render: (text) => <>{JSON.stringify(text)}</>,
      });
    });
    setLocalColumns(columnsForFTable);

    setLocalRows(data.rows.map((item) => {
      const newItem = {
        ...item,
      };
      if (hasKey) {
        newItem[randKeyName] = newItem.key;
        delete newItem.key;
      }
      newItem.key = uuid();
      return newItem;
    }));
  }, []);

  if (data.command && data.command.toUpperCase().match('(GRAPH|COPY).*')) {
    return (
      <div style={{ margin: '25px' }}>
        <span style={{ whiteSpace: 'pre-line' }}>
          Affected
          {data.rowCount === null ? 0 : data.rowCount}
        </span>
      </div>
    );
  } if (data.command && data.command.toUpperCase() === 'CREATE') {
    return <div style={{ margin: '25px' }}><span style={{ whiteSpace: 'pre-line' }}>{data.command.toUpperCase()}</span></div>;
  } if (data.command && data.command.toUpperCase() === 'ERROR') {
    return <div style={{ margin: '25px' }}><span style={{ whiteSpace: 'pre-line' }}>{data.message}</span></div>;
  }

  const activeTab = (refKey, tabType) => {
    if (tabType === 'graph') {
      document.getElementById(`${refKey}-${tabType}`).classList.add('selected-frame-tab');
      document.getElementById(`${refKey}-${tabType}`).classList.remove('deselected-frame-tab');
      document.getElementById(`${refKey}-table`).classList.add('deselected-frame-tab');
      document.getElementById(`${refKey}-table`).classList.remove('selected-frame-tab');
    } else if (tabType === 'table') {
      document.getElementById(`${refKey}-${tabType}`).classList.add('selected-frame-tab');
      document.getElementById(`${refKey}-${tabType}`).classList.remove('deselected-frame-tab');
      document.getElementById(`${refKey}-graph`).classList.add('deselected-frame-tab');
      document.getElementById(`${refKey}-graph`).classList.remove('selected-frame-tab');
    }
  };

  return (
    <div className="legend-area">
      <div className="contianer-frame-tab">
        <div style={{ width: '80%', color: '#C4C4C4' }}>
          <div className="d-flex nodeLegend">Node:</div>
          <div className="d-flex edgeLegend">Edge:</div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          width: '20%',
          height: '96px',
          border: 'solid 1px #C4C4C4',
        }}
        >
          <button
            className="btn"
            type="button"
            style={{ width: '50%', fontSize: '18px' }}
            onClick={() => activeTab(props.refKey, 'graph')}
          >
            <i className="icon-graph" />
            <br />
            Graph
          </button>
          <div
            style={{
              backgroundColor: '#C4C4C4',
              width: '1px',
              height: '75px',
              marginTop: '20px',
            }}
          />
          <button
            className="btn"
            type="button"
            style={{ width: '50%', fontSize: '18px', color: '#142B80' }}
            onClick={() => activeTab(props.refKey, 'table')}
          >
            <FontAwesomeIcon icon={faTable} />
            <br />
            Table
          </button>
        </div>
      </div>
      <Table columns={localColumns} dataSource={localRows} />
    </div>
  );
};

CypherResultTable.propTypes = {
  data: PropTypes.shape({
    message: PropTypes.string,
    command: PropTypes.string,
    rowCount: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    columns: PropTypes.any,
    // eslint-disable-next-line react/forbid-prop-types
    rows: PropTypes.any,
  }).isRequired,
  refKey: PropTypes.string.isRequired,
};

export default CypherResultTable;
