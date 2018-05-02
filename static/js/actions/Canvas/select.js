export const onMouseDown = (payload, meta) => {
    return {
        type: 'SELECT_ON_MOUSE_DOWN',
        payload,
        meta
    };
}

export const onMouseUp = (payload, meta) => {
    return {
        type: 'SELECT_ON_MOUSE_UP',
        payload,
        meta
    };
}

export const onMouseMove = (payload, meta) => {
    return {
        type: 'SELECT_ON_MOUSE_MOVE',
        payload,
        meta
    };
}

export const onSingleClick = (payload, meta) => {
    return {
        type: 'SELECT_ON_SINGLE_CLICK',
        payload,
        meta
    };
}

export const onDoubleClick = (payload, meta) => {
    return {
        type: 'SELECT_ON_DOUBLE_CLICK',
        payload,
        meta
    };
}

export const onShiftClick = (payload, meta) => {
    return {
        type: 'SELECT_ON_SHIFT_CLICK',
        payload,
        meta
    };
}

export const onDelete = (payload, meta) => {
    return {
        type: 'SELECT_ON_DELETE',
        payload,
        meta
    };
}