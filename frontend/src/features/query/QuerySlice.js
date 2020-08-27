import { createSlice } from '@reduxjs/toolkit'

const QuerySlice = createSlice({
  name: 'query',
  initialState: {
    queryStr: ''
  },
  reducers: {
    setQuery: {
      reducer: (state, action) => {
        state.queryStr = action.payload.queryStr
      },
      prepare: (selectName, type) => {
        var queryStr = '';
        // todo limit 개수 받아와야 함
        if(type === 'v' && selectName.label !== '*') {
          queryStr = 'MATCH (V:' + selectName.label + ') RETURN V LIMIT 25';
        } else if (type === 'v' && selectName.label === '*') {
          queryStr = 'MATCH (V) RETURN v LIMIT 25';
        } else if (type === 'e' && selectName.label !=='*') {
          queryStr = 'MATCH (v1)-[E:' + selectName.label + ']-(v2) RETURN * LIMIT 25';
        } else if (type === 'e' && selectName.label === '*') {
          queryStr = 'MATCH (v1)-[E]-(v2) RETURN * LIMIT 25';
        } else if (type === 'p' && selectName.propertyName !=='*') {
          queryStr = 'MATCH(V1)-[E]-(V2) WHERE V1.' +selectName.propertyName+' IS NOT NULL OR E.'+selectName.propertyName+' IS NOT NULL OR V2.'+selectName.propertyName+' IS NOT NULL RETURN * LIMIT 25';
        }
        return {payload : {queryStr}}
      }
    }
  }
})

export const { setQuery } = QuerySlice.actions

export default QuerySlice.reducer