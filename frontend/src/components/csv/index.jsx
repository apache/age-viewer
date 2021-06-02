import React from 'react';
import PropTypes from 'prop-types';
import { Button, message, Upload } from 'antd';
import { useDispatch } from 'react-redux';
import Frame from '../frame/Frame';
import { getMetaData } from '../../features/database/MetadataSlice';

const CSV = ({
  reqString, refKey,
}) => {
  const dispatch = useDispatch();

  const props = {
    name: 'file',
    action: '/api/v1/feature/uploadCSV',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        dispatch(getMetaData());
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Frame
      reqString={reqString}
      refKey={refKey}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Upload {...props}>
        <Button>Click to Upload</Button>
      </Upload>
    </Frame>
  );
};

CSV.propTypes = {
  reqString: PropTypes.string.isRequired,
  refKey: PropTypes.string.isRequired,

};

export default CSV;
