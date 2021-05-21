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
import PropTypes from 'prop-types';
import {
  Button, Col, Form, Input, InputNumber, Row, Select,
} from 'antd';
import { useDispatch } from 'react-redux';
import Frame from '../Frame';

import styles from './ServerConnectFrame.module.scss';
import { connectToAgensGraph } from '../../../features/database/DatabaseSlice';
import { addAlert } from '../../../features/alert/AlertSlice';
import { addFrame, trimFrame } from '../../../features/frame/FrameSlice';
import { getMetaChartData, getMetaData } from '../../../features/database/MetadataSlice';

const FormInitialValue = {
  database: '',
  flavor: null,
  graph: '',
  host: '',
  password: '',
  port: null,
  user: '',
};

const ServerConnectFrame = ({
  refKey,
  isPinned,
  reqString,
}) => {
  const dispatch = useDispatch();

  const connectToDatabase = (data) => dispatch(connectToAgensGraph(data)).then((response) => {
    if (response.type === 'database/connectToAgensGraph/fulfilled') {
      dispatch(addAlert('NoticeServerConnected'));
      dispatch(trimFrame('ServerConnect'));
      dispatch(getMetaData()).then((metadataResponse) => {
        if (metadataResponse.type === 'database/getMetaData/fulfilled') {
          dispatch(getMetaChartData());
        } else if (metadataResponse.type === 'database/getMetaData/rejected') {
          dispatch(addAlert('ErrorMetaFail'));
        }
      });

      dispatch(addFrame(':server status', 'ServerStatus'));
    } else if (response.type === 'database/connectToAgensGraph/rejected') {
      dispatch(addAlert('ErrorServerConnectFail', response.error.message));
    }
  });

  return (
    <Frame
      reqString={reqString}
      isPinned={isPinned}
      refKey={refKey}
    >
      <Row>
        <Col span={6}>
          <h3>Connect to Database</h3>
          <p>Database access might require and authenticated connection.</p>
        </Col>
        <Col span={18}>
          <div className={styles.FrameWrapper}>
            <Form
              initialValues={FormInitialValue}
              layout="vertical"
              onFinish={(values) => connectToDatabase(values)}
            >
              <Form.Item name="flavor" label="Database Type" rules={[{ required: true }]}>
                <Select
                  placeholder="Select a flavor of Database"
                  allowClear
                >
                  <Select.Option value="AGE">Apache AGE</Select.Option>
                  <Select.Option value="AGENS">AgensGraph</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="host" label="Connect URL" rules={[{ required: true }]}>
                <Input placeholder="192.168.0.1" />
              </Form.Item>
              <Form.Item name="port" label="Connect Port" rules={[{ required: true }]}>
                <InputNumber placeholder="5432" className={styles.FullWidth} />
              </Form.Item>
              <Form.Item name="database" label="Database Name" rules={[{ required: true }]}>
                <Input placeholder="postgres" />
              </Form.Item>
              <Form.Item name="graph" label="Graph Path" rules={[{ required: true }]}>
                <Input placeholder="postgres" />
              </Form.Item>
              <Form.Item name="user" label="User Name" rules={[{ required: true }]}>
                <Input placeholder="postgres" />
              </Form.Item>
              <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                <Input.Password placeholder="postgres" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Connect</Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </Frame>
  );
};

ServerConnectFrame.propTypes = {
  refKey: PropTypes.string.isRequired,
  isPinned: PropTypes.bool.isRequired,
  reqString: PropTypes.string.isRequired,
};

export default ServerConnectFrame;
