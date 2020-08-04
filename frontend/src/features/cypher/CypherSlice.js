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
      body: JSON.stringify({cmd: args[1]})
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
    queryResult : {},
    labelColor : [
      {color: '#664B00', labels : [], index : 0},  
      {color: '#D1B2FF', labels : [], index : 1}, 
      {color: '#FFC19E', labels : [], index : 2}, 
      {color: '#B2EBF4', labels : [], index : 3}, 
      {color: '#F15F5F', labels : [], index : 4}, 
      {color: '#C4B73B', labels : [], index : 5}, 
      {color: '#9FC93C', labels : [], index : 6}, 
      {color: '#FFD9EC', labels : [], index : 7}, 
      {color: '#6799FF', labels : [], index : 8}, 
      {color: '#FFBB00', labels : [], index : 9}, 
      {color: '#FFB2D9', labels : [], index : 10}, 
      {color: '#6B9900', labels : [], index : 11}
    ]
  },
  reducers: {    
    setLabelColor: {
      reducer: (state, action) => {
        for (const [label, labelColor] of Object.entries(action.payload.newNodeLegends)) {
          console.log(label, labelColor.index,)
          state.labelColor[labelColor.index].labels.push(label)
        }
      },
      prepare: (newNodeLegends, newEdgeLegends) => {
        return { payload: { newNodeLegends, newEdgeLegends } }
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