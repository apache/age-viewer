/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Modal, Select, Input, Button,
} from 'antd';
import style from './popover.module.scss';

const EdgeThicknessSettingModal = ({
  onSubmit,
  properties,
}) => {
  const [standardEdge, setStdEdge] = useState('');
  const [standardProperty, setStdProperty] = useState('');
  const [MinValue, setMinValue] = useState('');
  const [MaxValue, setMaxValue] = useState('');

  useEffect(() => {
    if (standardEdge === '') setStdProperty('');
  }, [standardEdge]);

  const selectionEdge = () => {
    const edgeList = new Set(properties.map((p) => p.edge));
    return Array.from(edgeList).map((edge) => (
      <>
        <option className={style.option} value={edge}>
          {edge}
        </option>
      </>
    ));
  };

  const selectionPropertie = () => {
    const propertyList = new Set(
      properties.map((p) => (p.edge === standardEdge ? p.property : undefined)),
    );
    return Array.from(propertyList).map((property) => (
      property
        ? (
          <>
            <option className={style.option} value={property}>
              {property}
            </option>
          </>
        )
        : <></>
    ));
  };

  const apply = () => {
    const thickness = {
      edge: standardEdge,
      property: standardProperty,
      min: MinValue,
      max: MaxValue,
    };
    onSubmit(thickness);
  };

  const reset = () => {
    onSubmit(null);
    setStdEdge('');
    setStdProperty('');
    setMinValue('');
    setMaxValue('');
  };

  return (
    <div style={{ width: '370px' }}>
      <p className={style.title}>Apply Edge Weight</p>
      <select
        className={`${standardEdge === '' ? style.default : style.select}`}
        defaultValue={null}
        value={standardEdge}
        onChange={(e) => setStdEdge(e.target.value)}
        style={{ width: '95%' }}
      >
        <option className={`${style.option}`} value="">Select Edge</option>
        {selectionEdge()}
      </select>
      <select
        className={`${standardProperty === '' ? style.default : style.select}`}
        defaultValue={null}
        value={standardProperty}
        onChange={(e) => setStdProperty(e.target.value)}
        style={{ width: '95%' }}
      >
        <option className={`${style.option}`} value="">Select Property</option>
        {selectionPropertie()}
      </select>
      <input
        className={style.input}
        value={MinValue}
        onChange={(e) => {
          if (Number(e.target.value) || e.target.value === '' || e.target.value === '0') setMinValue(Number(e.target.value));
        }}
        placeholder="Min Value"
      />
      <input
        className={style.input}
        value={MaxValue}
        onChange={(e) => {
          if (Number(e.target.value) || e.target.value === '' || e.target.value === '0') setMaxValue(Number(e.target.value));
        }}
        placeholder="Max Value"
      />
      <div className={style.buttons}>
        <button className={style.btn} type="button" onClick={() => reset()}>Reset</button>
        <button className={style.btn} type="button" onClick={() => apply()}>Apply</button>
      </div>
    </div>
  );
};

export default EdgeThicknessSettingModal;
