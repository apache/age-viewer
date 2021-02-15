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
import Table from 'react-bootstrap/Table';

const CypherResultTable = ({ data }) => {
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
  return (
    <Table className="table table-hover">
      <thead>
        <tr>
          {
              data.columns.map((h) => <th key={h.toString()}>{h.toString()}</th>)
            }
        </tr>
      </thead>
      <tbody>
        {
            data.rows.map((d) => {
              const rows = data.columns.map(
                (alias) => <td key={alias}>{JSON.stringify(d[alias])}</td>,
              );
              return <tr key={rows}>{rows}</tr>;
            })
          }
      </tbody>
    </Table>
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
};

export default CypherResultTable;
