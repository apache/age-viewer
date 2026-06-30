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
const path = require("path");
const fs = require('fs');

const sqlBasePath = path.join(__dirname, '../../sql');

// todo: util.format -> ejs
function getQuery(name, version='') {
    let sqlPath = path.join(sqlBasePath, version, `${name}.sql`);

    // If version-specific file doesn't exist, try fallback versions
    if (version && !fs.existsSync(sqlPath)) {
        const versionNum = parseInt(version, 10);
        // For versions >= 16, use version 15 (compatible)
        if (versionNum >= 16) {
            sqlPath = path.join(sqlBasePath, '15', `${name}.sql`);
        } else if (versionNum >= 11) {
            // For versions 11-15, try each down to 11
            for (let v = versionNum; v >= 11; v--) {
                const fallbackPath = path.join(sqlBasePath, v.toString(), `${name}.sql`);
                if (fs.existsSync(fallbackPath)) {
                    sqlPath = fallbackPath;
                    break;
                }
            }
        }
    }

    // Final fallback: check base sql directory
    if (!fs.existsSync(sqlPath)) {
        sqlPath = path.join(sqlBasePath, `${name}.sql`);
    }

    if (!fs.existsSync(sqlPath)) {
        throw new Error(`SQL does not exist, name = ${name}`);
    }
    return fs.readFileSync(sqlPath, 'utf8');
}

module.exports = { getQuery };
