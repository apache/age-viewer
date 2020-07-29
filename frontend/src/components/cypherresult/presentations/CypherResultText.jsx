import React from 'react';
import AsciiTable  from 'ascii-table'

const CypherResultText = ({data}) => {

  const extractRows = () => {
    return data['rows'].map((d, rIndex) => {
      const rows = data['columns'].map((alias, cIndex) => {
        return JSON.stringify(d[alias])
      })
      console.log("!" , rows)
      return rows
    })
  }
  
  var table = AsciiTable.factory({
    heading: data['columns']
  , rows: extractRows()
  })

  return (
  <div><pre>{table.toString()}</pre></div>
  )
}


export default CypherResultText