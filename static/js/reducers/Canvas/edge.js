const initialState = {};

export default function edgeReducer(state=initialState, action) {
    switch (action.type) {
        case 'EDGE_ON_MOUSE_DOWN':
            return state;
        
        default:
            return state;
    }
}