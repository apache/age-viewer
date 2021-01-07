import React from 'react'

const StyleJustifyCenter = {display: 'flex', justifyContent: 'center'};
const StyleTextright = {marginBottom: '10px', textAlign: 'right', fontSize: '13px', fontWeight: 'bold'};
const StyleTextLeft = {fontSize: '13px', fontWeight: 'bold'}

export const ColoredLine = () => (
    <hr
        style={{
            color: '#B0B0B0',
            backgroundColor: '#B0B0B0',
            marginTop: 0,
            height: 0.3
        }}
    />
);

export const SubLabelWarp = () => (
    <div style={StyleJustifyCenter}></div>     
)

export const SubLabelRight = ({label, classes}) => (
    <div className={classes} style={StyleTextright}>{label}</div>
)

export const SubLabelLeft = ({label, classes}) => (
    <div className={classes} style={StyleTextLeft}>{label}</div>
)

export const SubLabelLeftWithLink = ({label, classes}) => (
    <div className={classes} style={StyleTextLeft}><pre>{label}</pre></div>
)