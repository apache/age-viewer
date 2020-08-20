import React from 'react';
import AsciiTable  from 'ascii-table'

const CypherResultText = ({data}) => {

  const extractRows = () => {
    return data['rows'].map((d, rIndex) => {
      const rows = data['columns'].map((alias, cIndex) => {
        return JSON.stringify(d[alias])
      })
      return rows
    })
  }
  
  var table = AsciiTable.factory({
    heading: data['columns']
  , rows: extractRows()
  })

  return (
  <div style={{height:'100%'}}><pre style={{height:'inherit', marginBottom:'initial'}}>{table.toString()}</pre></div>
  )
}


export default CypherResultText