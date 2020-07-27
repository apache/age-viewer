import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const executeCypherQuery = createAsyncThunk(
  'cypher/executeCypherQuery',
  async (cmdQuery) => {
    const response = await fetch('/api/v1/cypher', 
    {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({cmd: cmdQuery})
    })
    if (response.ok) {
      return await response.json();
    } else {
      alert("Connection Error")
      return {};
    }
  }

  
)

const CypherSlice = createSlice({
  name: 'cypher',
  initialState: {
    queryResult : []
  },
  reducers: {
  },
  extraReducers: {
    [executeCypherQuery.pending]: (state, action) => {
      console.log('CypherSlice Loading data...')
    },
    [executeCypherQuery.fulfilled]: (state, action) => {
      console.log('CypherSlice Data Loaded.')
      state.queryResult = action.payload
    },
    [executeCypherQuery.rejectd]: (state, action) => {
      console.log('CypherSlice Data Loading Error.')
    }
  }
})

export default CypherSlice.reducer