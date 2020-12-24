import React from 'react';
import Table from 'react-bootstrap/Table'
const CypherResultMeta = ({ database , query, data}) => {
  return (
    <Table className="table table-hover" style={{marginBottom:'initial'}}>
      <tbody>
        <tr>
          <th className="w-25">Server Version</th>
          <td className="w-75">TBD</td>
        </tr>
        <tr>
          <th className="w-25">Database URI</th>
          <td className="w-75">{database.host}:{database.port}</td>
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
  )

}


export default CypherResultMeta