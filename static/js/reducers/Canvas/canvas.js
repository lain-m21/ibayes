const initialState = {};

export default function canvasReducer(state=initialState, action) {
    switch (action.type) {
        case 'CANVAS_ON_MOUSE_DOWN':
            return state;
        
        default:
            return state;
    }
}