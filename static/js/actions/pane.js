const paneActions = {
    onButtonClick: (payload, meta) => dispatch(() => {
        const buttonType = payload.buttonType;
        if (buttonType === 'NODE'){
            return {
                type: 'PANE_ON_NODE_BUTTON_CLICK',
                payload: payload,
                meta: meta
            }
        } else if (buttonType === 'EDGE') {
            return {
                type: 'PANE_ON_EDGE_BUTTON_CLICK',
                payload: payload,
                meta: meta
            }
        } else if (buttonType === 'PLATE') {
            return {
                type: 'PANE_ON_PLATE_BUTTON_CLICK',
                payload: payload,
                meta: meta
            }
        } else if (buttonType === 'SELECT') {
            return {
                type: 'PANE_ON_SELECT_BUTTON_CLICK',
                payload: payload,
                meta: meta
            }
        } else if (buttonType === 'COMPILE') {
            return {
                type: 'PANE_ON_COMPILE_BUTTON_CLICK',
                payload: payload,
                meta: meta
            }
        } else {
            return {
                type: 'NULL',
                payload: payload,
                meta: meta
            }
        }
    })
};

export default paneActions;