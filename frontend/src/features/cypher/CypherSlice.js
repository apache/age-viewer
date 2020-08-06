import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const executeCypherQuery = createAsyncThunk(
  'cypher/executeCypherQuery',
  async (args) => {
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
      const resData = {}
      resData['key'] = args[0];
      resData['query'] = args[1];
      const res = await response.json();
      resData['data'] = res['data']
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
    queryResult: {},
    labelColors: JSON.stringify([
      { color: '#664B00', borderColor: '#662500', labels: [], index: 0 },
      { color: '#D1B2FF', borderColor: '#A566FF', labels: [], index: 1 },
      { color: '#FFC19E', borderColor: '#F29661', labels: [], index: 2 },
      { color: '#B5B2FF', borderColor: '#6B66FF', labels: [], index: 3 },
      { color: '#F15F5F', borderColor: '#CC3D3D', labels: [], index: 4 },
      { color: '#C4B73B', borderColor: '#998A00', labels: [], index: 5 },
      { color: '#9FC93C', borderColor: '#6B9900', labels: [], index: 6 },
      { color: '#FFD9EC', borderColor: '#FFB2D9', labels: [], index: 7 },
      { color: '#6799FF', borderColor: '#4374D9', labels: [], index: 8 },
      { color: '#FFBB00', borderColor: '#DB9700', labels: [], index: 9 },
      { color: '#FFB2D9', borderColor: '#F361A6', labels: [], index: 10 },
      { color: '#6B9900', borderColor: '#476600', labels: [], index: 11 }
    ])
  },
  reducers: {
    setLabelColor: {
      reducer: (state, action) => {
        state.labelColors = JSON.stringify(action.payload.labelColors)
      
      },
      prepare: (labelColors) => {
        return { payload: { labelColors } }
      }

    }
  },
  extraReducers: {
    [executeCypherQuery.pending]: (state, action) => {
    },
    [executeCypherQuery.fulfilled]: (state, action) => {
      state.queryResult[action.payload.key] = {}
      state.queryResult[action.payload.key].response = action.payload
    },
    [executeCypherQuery.rejectd]: (state, action) => {
    }
  }
})


export const { setLabelColor } = CypherSlice.actions

export default CypherSlice.reducer