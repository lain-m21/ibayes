function canvasActionFactory(dispatch, componentType='CANVAS') {
    // componentType is either of CANVAS, NODE, EDGE, PLATE, or SELECT
    // TODO: more sophisticated/complicated composited actions to be defined
    
    const actions = {
        onMouseDown: dispatch((payload, meta) => { 
            return {
                type: componentType + '_ON_MOUSE_DOWN', 
                payload: payload, 
                meta: meta
            } 
        }),
        onMouseUp: dispatch((payload, meta) => {
            return {
                type: componentType + '_ON_MOUSE_UP', 
                payload: payload, 
                meta: meta
            }
        }),
        onMouseMove: dispatch((payload, meta) => { 
            return {
                type: componentType + '_ON_MOUSE_MOVE', 
                payload: payload, 
                meta: meta
            }
        }),
        onSingleClick: dispatch((payload, meta) => { 
            return {
                type: componentType + '_ON_SINGLE_CLICK', 
                payload: payload, 
                meta: meta
            } 
        }),
        onDoubleClick: dispatch((payload, meta) => { 
            return {
                type: componentType + '_ON_DOUBLE_CLICK', 
                payload: payload, 
                meta: meta
            } 
        }),
        onShiftClick: dispatch((payload, meta) => { 
            return {
                type: componentType + '_ON_SHIFT_CLICK', 
                payload: payload, 
                meta: meta
            } 
        }),
        onDelete: dispatch((payload, meta) => { 
            return {
                type: componentType + '_ON_DELETE', 
                payload: payload, 
                meta: meta
            } 
        })
    }
    return actions;
}

export default canvasActionFactory;