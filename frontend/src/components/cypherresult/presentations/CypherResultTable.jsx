import React from 'react';
import Table from 'react-bootstrap/Table'
const CypherResultTable = ({ data }) => {
  if (data.command && data.command.toUpperCase() === 'GRAPH') {
    return <span style={{ margin: '25px' }}>Affected {data.rowCount === null ? 0 : data.rowCount} </span>
  } else if (data.command && data.command.toUpperCase() === 'ERROR') {
    return <span style={{ margin: '25px' }}>{data.message}</span>
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