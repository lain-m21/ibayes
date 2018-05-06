const initialState = {};

export default function plateReducer(state=initialState, action) {
    const { type, payload, meta } = action;
    const nodes = {...state.nodes};
    const selectedComponents = {...state.selectedComponents};
    const newState = {...state};
    switch (type) {
        case 'NODE_ON_MOUSE_DOWN':
            if (state.mode === 'select') {
                if (nodes[meta.id].embodied && !nodes[meta.id].selected) {
                    nodes[meta.id].selected = true;
                    selectedComponents.nodes.push(meta.id);
                    newState.nodes = nodes;
                }
            }
        case 'NODE_ON_SINGLE_CLICK':
            if (state.mode === 'draw') {
                nodes[meta.id].embodied = true;
                newState.nodes = nodes;
            }
        case 'NODE_ON_DOUBLE_CLICK':
            return newState;
        case 'NODE_ON_SHIFT_CLICK':
            return newState;
        case 'NODE_ON_DRAG':
            for (node_id in selectedComponents.nodes) {
                nodes[node_id].x += payload.xDiff;
                nodes[node_id].y += payload.yDiff;
            }
            const plates = {...state.plates};
            for (plate_id in selectedComponents.plates) {
                plates[plate_id].x += payload.xDiff;
                plates[plate_id].y += payload.yDiff;
            }
            newState.nodes = nodes;
            newState.plates = plates;
        default:
            return newState;
    }
    return newState;
}