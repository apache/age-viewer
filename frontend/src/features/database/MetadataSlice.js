import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getMetaData = createAsyncThunk(
  'database/getMetaData',
  async () => {
    await fetch('/api/v1/db/meta').then((response) => {
      if (response.ok) { return response.json }      
      throw response
    }).catch((error) => {      
      const errorDetail = {
        name : 'Metadata Load Error'
        , statusText: error.statusText
      }
      throw errorDetail
    })
  })
  
const MetadataSlice = createSlice({
  name: 'metadata',
  initialState: {
    edges: [],
    nodes: [],
    propertyKeys: [],
    status: 'init'
  },
  reducers: {
  },
  extraReducers: {
    [getMetaData.fulfilled]: (state, action) => {
      if (action.payload) {
        return {
          edges: action.payload.edges,
          nodes: action.payload.nodes,
          propertyKeys: action.payload.propertyKeys,
          status: 'connected'
        }
      } else {
        return {
          edges: [],
          nodes: [],
          propertyKeys: [],
          status: 'disconnected'
        }
      }
    },
    [getMetaData.rejected]: (state, action) => {
      alert(action.error.name)
    }
  }
})

export default MetadataSlice.reducer