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

const CypherResultMeta = ({ database, query, data }) => (
  <Table className="table table-hover" style={{ marginBottom: 'initial' }}>
    <tbody>
      <tr>
        <th className="w-25">Server Version</th>
        <td className="w-75">TBD</td>
      </tr>
      <tr>
        <th className="w-25">Database URI</th>
        <td className="w-75">
          {database.host}
          :
          {database.port}
        </td>
      </tr>
      <tr>
        <th className="w-25">Executed Query</th>
        <td className="w-75">{query}</td>
      </tr>
      <tr>
        <th className="w-25">Data</th>
        <td className="w-75"><pre>{JSON.stringify(data, null, 2)}</pre></td>
      </tr>
    </tbody>
  </Table>
);

CypherResultMeta.propTypes = {
  database: PropTypes.shape({
    host: PropTypes.string.isRequired,
    port: PropTypes.string.isRequired,
  }).isRequired,
  query: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.any.isRequired,
};

export default CypherResultMeta;
