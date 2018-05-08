import React from 'react';

const ConstNodeShape = {
    normal: <circle r="10" cursor="pointer" />,
    selected: <circle r="10" cursor="move" />,
    drawing: <circle r="10" cursor="pointer" />,
    hovering: <circle r="10" cursor="pointer" />
}

const ParamNodeShape = {
    normal: <circle r="20" cursor="pointer" />,
    selected: <circle r="20" cursor="move" />,
    drawing: <circle r="20" cursor="pointer" />,
    hovering: <circle r="20" cursor="pointer" />
}

const DataNodeShape = {
    normal: <circle r="20" cursor="pointer" />,
    selected: <circle r="20" cursor="move" />,
    drawing: <circle r="20" cursor="pointer" />,
    hovering: <circle r="20" cursor="pointer" />
}

const TransformNodeShape = {
    normal: <rect x="-10" y="-10" transform="rotate(45)" width="20" height="20" cursor="pointer" />,
    selected: <rect x="-10" y="-10" transform="rotate(45)" width="20" height="20" cursor="move" />,
    drawing: <rect x="-10" y="-10" transform="rotate(45)" width="20" height="20" cursor="pointer" />,
    hovering: <rect x="-10" y="-10" transform="rotate(45)" width="20" height="20" cursor="pointer" />
}

const CompositeNodeShape = {
    normal: <circle r="25" cursor="pointer" />,
    selected: <circle r="25" cursor="move" />,
    drawing: <circle r="25" cursor="pointer" />,
    hovering: <circle r="25" cursor="pointer" />
}

export const nodeConfigs = {
    const: {
        typeID: '#const',
        shape: ConstNodeShape,
        radius: 10
    },
    param: {
        typeID: '#param',
        shape: ParamNodeShape,
        radius: 20
    },
    data: {
        typeID: '#data',
        shape: DataNodeShape,
        radius: 20
    },
    transform: {
        typeID: '#transform',
        shape: TransformNodeShape,
        radius: 15
    },
    composite: {
        typeID: '#composite',
        shape: CompositeNodeShape,
        radius: 25
    },
}