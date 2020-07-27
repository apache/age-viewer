import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const executeCypherQuery = createAsyncThunk(
  'cypher/executeCypherQuery',
  async (args) => {
    console.log("key > " , args[0])
    console.log("cmdQuery > " , args[1])
    const response = await fetch('/api/v1/cypher', 
    {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({cmd: args[1]})
    })
    if (response.ok) {
      const resData = {}
      resData['key'] = args[0];
      resData['data'] = await response.json();     
      return resData;
    } else {
      alert("Connection Error")
      return {};
    }
  }

  
)

const CypherSlice = createSlice({
  name: 'cypher',
  initialState: {
    queryResult : {}
  },
  reducers: {
  },
  extraReducers: {
    [executeCypherQuery.pending]: (state, action) => {
      console.log('CypherSlice Loading data...')
    },
    [executeCypherQuery.fulfilled]: (state, action) => {
      console.log('CypherSlice Data Loaded.')
      state.queryResult[action.payload.key] = action.payload
    },
    [executeCypherQuery.rejectd]: (state, action) => {
      console.log('CypherSlice Data Loading Error.')
    }
  }
})

export default CypherSlice.reducer