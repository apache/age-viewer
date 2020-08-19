import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const executeCypherQuery = createAsyncThunk(
  'cypher/executeCypherQuery',
  async (args) => {
    try {
      const response = await fetch('/api/v1/cypher',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cmd: args[1] })
        })
      if (response.ok) {
        const res = await response.json();
        return Object.assign({ key: args[0], query: args[1], ...res })
      }
      throw response
    } catch (error) {
      const errorDetail = {
        name: 'Cypher Query Error'
        , statusText: error.statusText
      }
      throw errorDetail

    }
  }


)

const CypherSlice = createSlice({
  name: 'cypher',
  initialState: {
    queryResult: {},
    labels: { nodeLabels: {}, edgeLabels: {} }
  },
  reducers: {
    setLabels: {
      reducer: (state, action) => {
        if (action.payload.elementType === 'node') {
          if (state.labels.nodeLabels[action.payload.label] === undefined) { state.labels.nodeLabels[action.payload.label] = action.payload.property }
          else { Object.assign(state.labels.nodeLabels[action.payload.label], action.payload.property) }

        } else if (action.payload.elementType === 'edge') {
          if (state.labels.edgeLabels[action.payload.label] === undefined) { state.labels.edgeLabels[action.payload.label] = action.payload.property }
          else { Object.assign(state.labels.edgeLabels[action.payload.label], action.payload.property) }
        }

      },
      prepare: (elementType, label, property) => {
        return { payload: { elementType, label, property } }
      }
    }
  },
  extraReducers: {
    [executeCypherQuery.fulfilled]: (state, action) => {
      state.queryResult[action.payload.key] = {}
      //state.queryResult[action.payload.key].response = action.payload
      Object.assign(state.queryResult[action.payload.key], action.payload)
    },
    [executeCypherQuery.rejectd]: (state, action) => {
      alert(action.error.name)
    }
  }
})


export const { setLabels } = CypherSlice.actions

export default CypherSlice.reducer