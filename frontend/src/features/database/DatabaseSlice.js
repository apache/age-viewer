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
    return await response.json();
  }
)

export const disconnectToAgensGraph = createAsyncThunk(
  'database/disconnectToAgensGraph',
  async () => {
    return await fetch('/api/v1/db/disconnect')
  }
)

export const getConnectionStatus = createAsyncThunk(
  'database/getConnectionStatus',
  async () => {
    const response = await fetch('/api/v1/db')
    return await response.json();
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
        host: action.payload.host
        , port: action.payload.port
        , user: action.payload.user
        , password: action.payload.password
        , database: action.payload.database
        , graph: action.payload.graph
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
          host: action.payload.host
          , port: action.payload.port
          , user: action.payload.user
          , password: action.payload.password
          , database: action.payload.database
          , graph: action.payload.graph
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