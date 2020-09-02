import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const validateSamePathVariableReturn = (cypherQuery) => {  
  const cypherPathValidator = new RegExp("^match\\s(.*[a-zA-Z0-9])\\s*=", "i");

  if (cypherPathValidator.test(cypherQuery)) {
    const pathAlias = RegExp.$1
    const returnPathAliasValidator = new RegExp("^match\\s.*\\s*=.*return\\s" + pathAlias + ".*", "i");

    if (!returnPathAliasValidator.test(cypherQuery)) {
      throw { message: "Only Path variable should be returned.\n Modify the return clause to ' RETURN "+pathAlias+" '" }
    }
  }
}

const validateVlePathVariableReturn = (cypherQuery) =>{
  const cypherVleValidator = new RegExp("^match\\s.*[.*\\*[0-9]*\\s*\\.\\.\\s*[0-9]*\\]", "i");

  if (cypherVleValidator.test(cypherQuery)) {
    const cypherPathValidator = new RegExp("^match\\s(.*[a-zA-Z0-9])\\s*=", "i");
    const pathAlias = RegExp.$1

    if (!cypherPathValidator.test(cypherQuery)) {
      throw { message: "Path variable is required to be used with VLE query. Refer the below proper cypher query with VLE. \n 'MATCH pathvariable = (v)-[r*1..5]->(v2) return pathvariable;" }
    }
  }  
}

export const executeCypherQuery = createAsyncThunk(
  'cypher/executeCypherQuery',
  async (args) => {
    try {
      validateSamePathVariableReturn(args[1])
      validateVlePathVariableReturn(args[1])

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
      if (error.json === undefined) {
        throw error
      } else {
        const errorJson = await error.json()
        throw errorJson.message
      }
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
    [executeCypherQuery.rejected]: (state, action) => {
      state.queryResult[action.meta.arg[0]] = {}
      state.queryResult[action.meta.arg[0]]['command'] = 'ERROR'
      state.queryResult[action.meta.arg[0]]['query'] = action.meta.arg[1]
      state.queryResult[action.meta.arg[0]]['key'] = action.meta.arg[0]
      state.queryResult[action.meta.arg[0]]['message'] = action.error.message
    }
  }
})


export const { setLabels } = CypherSlice.actions

export default CypherSlice.reducer