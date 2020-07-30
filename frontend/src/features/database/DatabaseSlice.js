import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const connectToAgensGraph = createAsyncThunk(
  'database/connectToAgensGraph',
  async (formData) => {
    const response = await fetch('/api/v1/db/connect', 
    {method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    const res = await response.json();
    return res.data
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
    host: '',
    port: '',
    user: '',
    password: '',
    database: '',
    graph: '',
    status: 'disconnected'
  },
  reducers: {
  },
  extraReducers: {
    [connectToAgensGraph.fulfilled]: (state, action) => {
      state.host = action.payload.host !== '' ? action.payload.host : state.host
      state.port = action.payload.port !== '' ? action.payload.port : state.port
      state.user = action.payload.user !== '' ? action.payload.user : state.user
      state.password = action.payload.password !== '' ? action.payload.password : state.password
      state.database = action.payload.database !== '' ? action.payload.database : state.database
      state.graph = action.payload.graph !== '' ? action.payload.graph : state.graph
      state.status = 'connected'
    },     
    [disconnectToAgensGraph.fulfilled]: (state, action) => {
      state.host = ''
      state.port = ''
      state.user = ''
      state.password = ''
      state.database = ''
      state.graph = ''
      state.status = 'disconnected'
    }
  }
})

/*
export const { } = DatabaseSlice.actions
*/
export default DatabaseSlice.reducer