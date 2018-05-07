const initialState = {};

export default function plateReducer(state=initialState, action) {
    const { type, payload, meta } = action;
    let { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState } = {...state};
    switch (type) {
        case 'PLATE_ON_MOUSE_DOWN':
            if (canvasState.mode === 'select') {
                if (plates[meta.id].embodied && !plates[meta.id].selected) {
                    plates[meta.id].selected = true;
                    selectedComponents.plate.push(meta.id);
                }
            }
        case 'PLATE_ON_SINGLE_CLICK':
            if (canvasState.mode === 'draw') {
                plates[meta.id].embodied = true;
                plateIDList.push(meta.id);
            }
        case 'NODE_ON_DOUBLE_CLICK':
            return newState;
        case 'NODE_ON_SHIFT_CLICK':
            return newState;
        case 'NODE_ON_DRAG':
            for (let node_id in selectedComponents.node) {
                nodes[node_id].x += payload.xDiff;
                nodes[node_id].y += payload.yDiff;
            }
            for (let plate_id in selectedComponents.plate) {
                plates[plate_id].x += payload.xDiff;
                plates[plate_id].y += payload.yDiff;
            }
        default:
            return state;
    }
    const newState = { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState };
    return newState;
}