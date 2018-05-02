const initialState = {};

export default function nodeReducer(state=initialState, action) {
    switch (action.type) {
        case 'NODE_ON_MOUSE_DOWN':
            return state;
        
        default:
            return state;
    }
}