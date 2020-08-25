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
          queryStr = 'MATCH (v:' + selectName.label + ') RETURN v LIMIT 25';
        } else if (type === 'v' && selectName.label === '*') {
          queryStr = 'MATCH (v) RETURN v LIMIT 25';
        } else if (type === 'e' && selectName.label !=='*') {
          queryStr = 'MATCH (v1)-[e:' + selectName.label + ']-(v2) RETURN e LIMIT 25';
        } else if (type === 'e' && selectName.label === '*') {
          queryStr = 'MATCH (v1)-[e]-(v2) RETURN e LIMIT 25';
        }
        return {payload : {queryStr}}
      }
    }
  }
})

export const { setQuery } = QuerySlice.actions

export default QuerySlice.reducer