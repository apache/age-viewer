import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const connectToAgensGraph = createAsyncThunk(
  'database/connectToAgensGraph',
  async () => {
    const response = await fetch('/api/v1/db/connect', 
    {method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({host:"192.168.0.68", port:15432, database: "covid19", graph:"corona_spread", user:"consulting", password:"bitnine123!"})
    })
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
    host: '192.168.0.68',
    port: 15432,
    user: 'consulting',
    password: 'bitnine123!',
    database: 'covid19',
    graph: 'corona_spread',
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