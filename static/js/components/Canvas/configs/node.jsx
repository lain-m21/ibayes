import React from 'react';

const ConstNodeShape = {
    normal: <circle r="10" id="const-normal" cursor="pointer" />,
    selected: <circle r="10" id="const-selected" cursor="pointer" />
}

const ParamNodeShape = {
    normal: <circle r="20" id="param-normal" cursor="pointer" />,
    selected: <circle r="20" id="param-selected" cursor="pointer" />
}

const DataNodeShape = {
    normal: <circle r="20" id="data-normal" cursor="pointer" />,
    selected: <circle r="20" id="data-selected" cursor="pointer" />
}

const TransformNodeShape = {
    normal: <rect x="-10" y="-10" transform="rotate(45)" width="20" height="20" id="transform-normal" cursor="pointer" />,
    selected: <rect x="-10" y="-10" transform="rotate(45)" width="20" height="20" id="transform-selected" cursor="pointer" />
}

const CompositeNodeShape = {
    normal: <circle r="25" id="composite-normal" cursor="pointer" />,
    selected: <circle r="25" id="composite-selected" cursor="pointer" />
}

export const nodeConfigs = {
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