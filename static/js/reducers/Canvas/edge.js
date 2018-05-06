const initialState = {};

export default function edgeReducer(state=initialState, action) {
    const { type, payload, meta } = action;
    const edges = {...state.edges};
    const selectedComponents = {...state.selectedComponents};
    const newState = {...state};
    switch (type) {
        case 'EDGE_ON_MOUSE_DOWN':
            if (state.mode === 'select') {
                if (edges[meta.id].embodied && !edges[meta.id].selected) {
                    edges[meta.id].selected = true;
                    selectedComponents.edges.push(meta.id);
                    newState.edges = edges;
                }
            }
        default:
            return newState;
    }
    return newState;
}