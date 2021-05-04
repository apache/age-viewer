/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Modal, Select } from 'antd';

const EdgeThicknessSettingModal = ({
  onSubmit,
  visible,
  setVisible,
  setThickess,
  globalThickness,
  properties,
}) => {
  const [standardEdge, setStdEdge] = useState(null);
  const [standardProperty, setStdProperty] = useState(null);

  const selectionEdge = () => {
    const edgeList = new Set(properties.map((p) => p.edge));
    return Array.from(edgeList).map((edge) => (
      <Select.Option value={edge}>
        {edge}
      </Select.Option>
    ));
  };

  const selectionPropertie = () => {
    const propertyList = new Set(
      properties.map((p) => (p.edge === standardEdge ? p.property : undefined)),
    );
    return Array.from(propertyList).map((property) => (
      property
        ? (
          <Select.Option value={property}>
            {property}
          </Select.Option>
        )
        : <></>
    ));
  };

  const onOk = () => {
    const thickness = {
      edge: standardEdge,
      property: standardProperty,
    };
    onSubmit(thickness);
  };

  return (
    <Modal visible={visible} onCancel={() => setVisible(false)} onOk={onOk}>
      <Select defaultValue={null} onChange={(value) => { setStdEdge(value); }}>
        <Select.Option value={null}>select</Select.Option>
        {selectionEdge()}
      </Select>
      { standardEdge !== null
        ? (
          <Select defaultValue={null} onChange={(value) => { setStdProperty(value); }}>
            <Select.Option value={null}>select</Select.Option>
            {selectionPropertie()}
          </Select>
        )
        : <></>}
      <br />
    </Modal>
  );
};

export default EdgeThicknessSettingModal;
