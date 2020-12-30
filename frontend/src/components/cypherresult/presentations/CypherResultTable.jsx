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
import Table from 'react-bootstrap/Table'
const CypherResultTable = ({ data }) => {
  if (data.command && data.command.toUpperCase().match('(GRAPH|COPY).*')) {
    return <div style={{margin: '25px', }}><span style={{ whiteSpace: 'pre-line' }}>Affected {data.rowCount === null ? 0 : data.rowCount}</span></div>
  } else if (data.command && data.command.toUpperCase() === 'CREATE') {
    return <div style={{margin: '25px', }}><span style={{ whiteSpace: 'pre-line' }}>{data.command.toUpperCase()}</span></div>
  } else if (data.command && data.command.toUpperCase() === 'ERROR') {
    return <div style={{margin: '25px', }}><span style={{ whiteSpace: 'pre-line' }}>{data.message}</span></div>
  } else {
    return (
      <Table className="table table-hover">
        <thead>
          <tr >
            {
              data['columns'].map((h, index) => {
                return <th key={index}>{h.toString()}</th>
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            data['rows'].map((d, rIndex) => {
              const rows = data['columns'].map((alias, cIndex) => {
                return <td key={cIndex}>{JSON.stringify(d[alias])}</td>
              })
              return <tr key={rIndex}>{rows}</tr>
            })
          }
        </tbody>
      </Table>
    )
  }

}


export default CypherResultTable