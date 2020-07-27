import { createSlice } from '@reduxjs/toolkit'

const DatabaseSlice = createSlice({
  name: 'database',
  initialState: {
    host: '127.0.0.1',
    port: 5432,
    userName: 'agens',
    databaseName: 'northwind',
    graphPath: 'northwind_graph'
  },
  reducers: {
  }
})

export const { } = DatabaseSlice.actions

export default DatabaseSlice.reducer