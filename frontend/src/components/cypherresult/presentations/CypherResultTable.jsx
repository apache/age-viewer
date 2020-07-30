import React from 'react';
import Table from 'react-bootstrap/Table'
const CypherResultTable = ({data}) => {
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


export default CypherResultTable