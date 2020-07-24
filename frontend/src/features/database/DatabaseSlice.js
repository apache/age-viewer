import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const connectToAgensGraph = createAsyncThunk(
  'database/connectToAgensGraph',
  async () => {
    const response = await fetch('/api/v1/db/connect', 
    {method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }})
    return response.data
  }
)

export const disconnectToAgensGraph = createAsyncThunk(
  'database/disconnectToAgensGraph',
  async () => {
    const response = await fetch('/api/v1/db/disconnect')
    return response.data
  }
)

const DatabaseSlice = createSlice({
  name: 'database',
  initialState: {
    host: '127.0.0.1',
    port: 5432,
    userName: 'agens',
    databaseName: 'northwind',
    graphPath: 'northwind_graph',
    status: ''
  },
  reducers: {
  },
  extraReducers: {
    [connectToAgensGraph.fulfilled]: (state, action) => {
      state.status = 'connected'
    },     
    [disconnectToAgensGraph.fulfilled]: (state, action) => {
      state.status = 'disconnected'
    }
  }
})

/*
export const { } = DatabaseSlice.actions
*/
export default DatabaseSlice.reducer