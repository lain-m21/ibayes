const initialState = {};

export default function edgeReducer(state=initialState, action) {
    const { type, payload, meta } = action;
    let { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState } = {...state};
    switch (type) {
        case 'EDGE_ON_MOUSE_DOWN':
            if (canvasState.mode === 'select') {
                if (edges[meta.id].embodied && !edges[meta.id].selected) {
                    edges[meta.id].selected = true;
                    selectedComponents.edge.push(meta.id);
                }
            }
        case 'EDGE_ON_MOUSE_ENTER':
            return state;
        case 'EDGE_ON_MOUSE_LEAVE':
            return state;
        default:
            return state;
    }
    const newState = { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState };
    return newState;
}