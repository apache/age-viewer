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

export const getMetaData = createAsyncThunk(
  'database/getMetaData',
  async () => {
    try {
      const response = await fetch('/api/v1/db/meta');
      if (response.ok) {
        let allCountEdge = 0;
        let allCountNode = 0;
        const ret = await response.json();
        ret.nodes.forEach((item) => {
          allCountNode += item.cnt;
        });

        ret.edges.forEach((item) => {
          allCountEdge += item.cnt;
        });
        ret.nodes.unshift({ label: '*', cnt: allCountNode });
        ret.edges.unshift({ label: '*', cnt: allCountEdge });
        return ret;
      }
      throw response;
    } catch (error) {
      const errorDetail = {
        name: 'Database Connection Failed',
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
        statusText: error.statusText,
      };
      throw errorDetail;
    }
  },
);

const MetadataSlice = createSlice({
  name: 'metadata',
  initialState: {
    edges: [],
    nodes: [],
    propertyKeys: [],
    status: 'init',
    dbname: '',
    graph: '',
    role: {
      user_name: '',
      role_name: '',
    },
    rows: [],
  },
  reducers: {
    resetMetaData: () => ({
      edges: [],
      nodes: [],
      propertyKeys: [],
      status: 'init',
      dbname: '',
      graph: '',
      role: {
        user_name: '',
        role_name: '',
      },

    }),
  },
  extraReducers: {
    [getMetaData.fulfilled]: (state, action) => {
      if (action.payload) {
        return Object.assign(state, {
          edges: action.payload.edges,
          nodes: action.payload.nodes,
          propertyKeys: action.payload.propertyKeys,
          status: 'connected',
          dbname: action.payload.database,
          graph: action.payload.graph,
          role: action.payload.role,
        });
      }
      return Object.assign(state, {
        edges: [],
        nodes: [],
        propertyKeys: [],
        status: 'disconnected',
        dbname: action.payload.database,
        graph: action.payload.graph,
        role: action.payload.role,
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

export const { resetMetaData } = MetadataSlice.actions;

export default MetadataSlice.reducer;
