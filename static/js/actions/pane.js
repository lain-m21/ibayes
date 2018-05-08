function paneActions(payload, meta) {
    switch(meta.buttonType) {
        case 'NODE': {
            return {
                type: 'PANE_ON_NODE_BUTTON_CLICK',
                payload: payload,
                meta: meta
            }
        }
        case 'EDGE': {
            return {
                type: 'PANE_ON_EDGE_BUTTON_CLICK',
                payload: payload,
                meta: meta
            }
        }
        case 'PLATE': {
            return {
                type: 'PANE_ON_PLATE_BUTTON_CLICK',
                payload: payload,
                meta: meta
            }
        }
        case 'SELECT': {
            return {
                type: 'PANE_ON_SELECT_BUTTON_CLICK',
                payload: payload,
                meta: meta
            }
        }
        case 'COMPILE': {
            return {
                type: 'PANE_ON_COMPILE_BUTTON_CLICK',
                payload: payload,
                meta: meta
            }
        }
        default: {
            return {
                type: 'DEFAULT',
                payload: payload,
                meta: meta
            }
        }
    }
}

export default paneActions;