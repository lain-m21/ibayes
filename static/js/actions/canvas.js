function canvasActionFactory(dispatch, componentType='CANVAS') {
    // componentType is either of CANVAS, NODE, EDGE, PLATE, or SELECT
    // TODO: more sophisticated/complicated composited actions to be defined
    
    const actions = {
        onSingleClick: (payload, meta) => dispatch(() => { 
            return {
                type: componentType + '_ON_SINGLE_CLICK', 
                payload: payload, 
                meta: meta
            } 
        }),
        onDoubleClick: (payload, meta) => dispatch(() => { 
            return {
                type: componentType + '_ON_DOUBLE_CLICK', 
                payload: payload, 
                meta: meta
            } 
        }),
        onShiftClick: (payload, meta) => dispatch(() => { 
            return {
                type: componentType + '_ON_SHIFT_CLICK', 
                payload: payload, 
                meta: meta
            } 
        }),
        onContextMenu: (payload, meta) => dispatch(() => {
            return {
                type: componentType + '_ON_CONTEXT_MENU',
                payload: payload,
                meta: meta
            }
        }),
        onMouseDown: (payload, meta) => dispatch(() => { 
            return {
                type: componentType + '_ON_MOUSE_DOWN', 
                payload: payload, 
                meta: meta
            } 
        }),
        onMouseUp: (payload, meta) => dispatch(() => {
            return {
                type: componentType + '_ON_MOUSE_UP', 
                payload: payload, 
                meta: meta
            }
        }),
        onDrag: (payload, meta) => dispatch(() => { 
            return {
                type: componentType + '_ON_DRAG', 
                payload: payload, 
                meta: meta
            }
        }),
        
        onMouseEnter: (payload, meta) => dispatch(() => { 
            return {
                type: componentType + '_ON_MOUSE_ENTER',
                payload: payload,
                meta: meta
            }
        }),
        onMouseLeave: (payload, meta) => dispatch(() => { 
            return {
                type: componentType + '_ON_MOUSE_LEAVE',
                payload: payload,
                meta: meta
            }
        }),
        onDelete: (payload, meta) => dispatch(() => { 
            return {
                type: componentType + '_ON_PRESS_DELETE_KEY', 
                payload: payload, 
                meta: meta
            } 
        })
    }
    return actions;
}

export default canvasActionFactory;