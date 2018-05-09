function canvasActionFactory(componentType='CANVAS', payload, meta) {
    // componentType is either of CANVAS, NODE, EDGE, PLATE, or SELECT
    // TODO: more sophisticated/complicated composited actions to be defined
    switch(meta.actionType) {
        case 'ON_SINGLE_CLICK': {
            return {
                type: componentType + '_ON_SINGLE_CLICK',
                payload: payload,
                meta: meta
            }
        }
        case 'ON_DOUBLE_CLICK': {
            return {
                type: componentType + '_ON_DOUBLE_CLICK',
                payload: payload,
                meta: meta
            }
        }
        case 'ON_SHIFT_CLICK': {
            return {
                type: componentType + '_ON_SHIFT_CLICK',
                payload: payload,
                meta: meta
            }
        }
        case 'ON_CONTEXT_MENU': {
            return {
                type: componentType + '_ON_CONTEXT_MENU',
                payload: payload,
                meta: meta
            }
        }
        case 'ON_MOUSE_DOWN': {
            return {
                type: componentType + '_ON_MOUSE_DOWN',
                payload: payload,
                meta: meta
            }
        }
        case 'ON_MOUSE_UP': {
            return {
                type: componentType + '_ON_MOUSE_UP',
                payload: payload,
                meta: meta
            }
        }
        case 'ON_DRAG': {
            return {
                type: componentType + '_ON_DRAG',
                payload: payload,
                meta: meta
            }
        }
        case 'ON_MOUSE_ENTER': {
            return {
                type: componentType + '_ON_MOUSE_ENTER',
                payload: payload,
                meta: meta
            }
        }
        case 'ON_MOUSE_LEAVE': {
            return {
                type: componentType + '_ON_MOUSE_LEAVE',
                payload: payload,
                meta: meta
            }
        }
        case 'ON_PRESS_DELETE_KEY': {
            return {
                type: componentType + '_ON_PRESS_DELETE_KEY',
                payload: payload,
                meta: meta
            }
        }
        default: {
            return {
                type: componentType + 'DEFAULT',
                payload: payload,
                meta: meta
            }
        }
    }
}

export default canvasActionFactory;