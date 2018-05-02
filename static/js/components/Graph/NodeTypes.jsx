import React from 'react';

const ConstNodeShape = (
    <symbol viewBox="0 0 30 30" id="const">
        <circle cx="15" cy="15" r="12" />
    </symbol>
)

const ParamNodeShape = (
    <symbol viewBox="0 0 50 50" id="param">
        <circle cx="25" cy="25" r="22" />
    </symbol>
)

const DataNodeShape = (
    <symbol viewBox="0 0 50 50" id="data">
        <circle cx="25" cy="25" r="22" fill="rgba(30, 144, 255, 0.12)"/>
    </symbol>
)

const TransformNodeShape = (
    <symbol viewBox="0 0 30 30" id="transform">
        <rect transform="translate(15) rotate(45)" width="20" height="20" />
    </symbol>
)

const CompositeNodeShape = (
    <symbol viewBox="0 0 50 50" id="composite">
        <circle cx="25" cy="25" r="22" fill="rgba(30, 144, 255, 0.12)"/>
    </symbol>
)

export default {
    const: {
        typeID: '#const',
        shape: ConstNodeShape
    },
    param: {
        typeID: '#param',
        shape: ParamNodeShape
    },
    data: {
        typeID: '#data',
        shape: DataNodeShape
    },
    transform: {
        typeID: '#transform',
        shape: TransformNodeShape
    },
    composite: {
        typeID: '#composite',
        shape: CompositeNodeShape
    },
}