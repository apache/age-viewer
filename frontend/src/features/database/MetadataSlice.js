/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getMetaData = createAsyncThunk(
  'database/getMetaData',
  async () => {
    try {
      const response = await fetch('/api/v1/db/meta');
      if (response.ok) {
        const ret = await response.json();
        Object.keys(ret).forEach((gname) => {
          let allCountEdge = 0;
          let allCountNode = 0;
          console.log(ret[gname].nodes.forEach((item) => {
            allCountNode += item.cnt;
          }));

          console.log(ret[gname].edges.forEach((item) => {
            allCountEdge += item.cnt;
          }));
          ret[gname].nodes.unshift({ label: '*', cnt: allCountNode });
          ret[gname].edges.unshift({ label: '*', cnt: allCountEdge });
        });
        console.log(ret);
        return ret;
      }
      throw response;
    } catch (error) {
      const errorDetail = {
        name: 'Database Connection Failed',
        message: `[${error.severity}]:(${error.code}) ${error.message} `,
        statusText: error.statusText,
      };
      throw errorDetail;
    }
  },
);

export const getMetaChartData = createAsyncThunk(
  'database/getMetaChartData',
  async () => {
    try {
      const response = await fetch('/api/v1/db/metaChart');
      if (response.ok) {
        return await response.json();
      }
      throw response;
    } catch (error) {
      const errorDetail = {
        name: 'Database Connection Failed',
        message: `[${error.severity}]:(${error.code}) ${error.message} `,
        statusText: error.statusText,
      };
      throw errorDetail;
    }
  },
);

const MetadataSlice = createSlice({
  name: 'metadata',
  initialState: {
    graphs: {},
    status: 'init',
    dbname: '',
    currentGraph: '',
  },
  reducers: {
    resetMetaData: (state) => (state.initialState),
    changeCurrentGraph: (state, action) => ({ ...state, currentGraph: action.payload }),
  },
  extraReducers: {
    [getMetaData.fulfilled]: (state, action) => {
      console.log('fullfilled', state, action);
      if (action.payload) {
        return Object.assign(state, {
          graphs: action.payload,
          status: 'connected',
          dbname: action.payload.database,
          currentGraph: Object.keys(action.payload)[0],
        });
      }
      return Object.assign(state, {
        ...state.initialState,
        status: 'disconnected',
        dbname: action.payload.database,
      });
    },
    [getMetaChartData.fulfilled]: (state, action) => {
      if (action.payload) {
        return Object.assign(state, { rows: action.payload });
      }
      return Object.assign(state, { rows: [] });
    },
  },
});

export const { resetMetaData, changeCurrentGraph } = MetadataSlice.actions;

export default MetadataSlice.reducer;
