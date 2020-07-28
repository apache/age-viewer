import React from 'react';
import Table from 'react-bootstrap/Table'
const CypherResultCytoscape = ({data}) => {
    return (
      <Table className="table table-hover">
        <thead>
          <tr >
            {
              data['aliasList'].map((h, index) => {
                return <th key={index}>{h.toString()}</th>
              })
            }
          </tr>
        </thead>
        <tbody>
            {
              data['data'].map((d, rIndex) => {
                const rows = data['aliasList'].map((alias, cIndex) => {
                  return <td key={cIndex}>{JSON.stringify(d[alias])}</td>
                })
                return <tr key={rIndex}>{rows}</tr>
              })
            }
        </tbody>
      </Table>
    )

}


export default CypherResultCytoscape