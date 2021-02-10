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

import React from 'react';
import AsciiTable from 'ascii-table';

const CypherResultText = ({ data }) => {
  const extractRows = () => data.rows.map((d, rIndex) => {
    const rows = data.columns.map((alias, cIndex) => JSON.stringify(d[alias]));
    return rows;
  });

  const table = AsciiTable.factory({
    heading: data.columns,
    rows: extractRows(),
  });

  return (
    <div style={{ height: '100%' }}><pre style={{ height: 'inherit', marginBottom: 'initial' }}>{table.toString()}</pre></div>
  );
};

export default CypherResultText;
