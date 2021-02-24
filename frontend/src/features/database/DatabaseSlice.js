/*
 * Copyright 2020 Bitnine Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const connectToAgensGraph = createAsyncThunk(
  'database/connectToAgensGraph',
  async (formData) => {
    try {
      const response = await fetch('/api/v1/db/connect',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      if (response.ok) { return await response.json(); }
      throw response;
    } catch (error) {
      const errorJson = await error.json();
      const errorDetail = {
        name: 'Failed to Retrieve Connection Information',
        message: errorJson.message,
        statusText: error.statusText,
      };
      throw errorDetail;
    }
  },
);

export const disconnectToAgensGraph = createAsyncThunk(
  'database/disconnectToAgensGraph',
  async () => {
    await fetch('/api/v1/db/disconnect');
  },
);

export const getConnectionStatus = createAsyncThunk(
  'database/getConnectionStatus',
  async () => {
    try {
      const response = await fetch('/api/v1/db');
      if (response.ok) { return await response.json(); }
      throw response;
    } catch (error) {
      const errorDetail = {
        name: 'Failed to Retrieve Connection Information',
        statusText: error.statusText,
      };
      throw errorDetail;
    }
  },
);

const DatabaseSlice = createSlice({
  name: 'database',
  initialState: {
    status: 'init',
  },
  reducers: {
  },
  extraReducers: {
    [connectToAgensGraph.fulfilled]: (state, action) => ({
      host: action.payload.host,
      port: action.payload.port,
      user: action.payload.user,
      password: action.payload.password,
      database: action.payload.database,
      graph: action.payload.graph,
      flavor: action.payload.flavor,
      status: 'connected',
    }),
    [connectToAgensGraph.rejected]: () => ({
      host: '',
      port: '',
      user: '',
      password: '',
      database: '',
      graph: '',
      flavor: '',
      status: 'disconnected',
    }),
    [disconnectToAgensGraph.fulfilled]: () => ({
      host: '',
      port: '',
      user: '',
      password: '',
      database: '',
      graph: '',
      flavor: '',
      status: 'disconnected',
    }),
    [getConnectionStatus.fulfilled]: (state, action) => ({
      host: action.payload.host,
      port: action.payload.port,
      user: action.payload.user,
      password: action.payload.password,
      database: action.payload.database,
      graph: action.payload.graph,
      flavor: action.payload.flavor,
      status: 'connected',
    }),
    [getConnectionStatus.rejected]: () => ({
      host: '',
      port: '',
      user: '',
      password: '',
      database: '',
      graph: '',
      flavor: '',
      status: 'disconnected',
    }),
  },
});

/*
export const { } = DatabaseSlice.actions
*/
export default DatabaseSlice.reducer;
