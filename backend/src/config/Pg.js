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

export default {
  // all valid client config options are also valid here
  // in addition here are the pool specific configuration parameters:
  // number of milliseconds to wait before timing out when connecting a new client
  // by default this is 0 which means no timeout
  connectionTimeoutMillis: 2000,
  // number of milliseconds a client must sit idle in the pool and not be checked out
  // before it is disconnected from the backend and discarded
  // default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients
  idleTimeoutMillis: 30000,
  // maximum number of clients the pool should contain
  // by default this is set to 10.
  max: 10,
}
