import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const connectToAgensGraph = createAsyncThunk(
  'database/connectToAgensGraph',
  async (formData) => {
    const response = await fetch('/api/v1/db/connect',
      {
        method: 'POST',
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

export const getConnectionStatus = createAsyncThunk(
  'database/getConnectionStatus',
  async () => {
    const response = await fetch('/api/v1/db')
    const res = await response.json();
    return res.data
  }
)

const DatabaseSlice = createSlice({
  name: 'database',
  initialState: {
    status: 'init'
  },
  reducers: {
  },
  extraReducers: {
    [connectToAgensGraph.fulfilled]: (state, action) => {
      return {
        host: action.meta.arg.host
        , port: action.meta.arg.port
        , user: action.meta.arg.user
        , password: action.meta.arg.password
        , database: action.meta.arg.database
        , graph: action.meta.arg.graph
        , status: 'connected'
      }
    },
    [disconnectToAgensGraph.fulfilled]: (state, action) => {
      return {
        host: ''
        , port: ''
        , user: ''
        , password: ''
        , database: ''
        , graph: ''
        , status: 'disconnected'
      }
    },
    [getConnectionStatus.fulfilled]: (state, action) => {
      if (action.payload) {
        return {
          host: action.meta.arg.host
          , port: action.meta.arg.port
          , user: action.meta.arg.user
          , password: action.meta.arg.password
          , database: action.meta.arg.database
          , graph: action.meta.arg.graph
          , status: 'connected'
        }
      } else {
        return {
          host: ''
          , port: ''
          , user: ''
          , password: ''
          , database: ''
          , graph: ''
          , status: 'disconnected'
        }
      }

    }
  }
})

/*
export const { } = DatabaseSlice.actions
*/
export default DatabaseSlice.reducer