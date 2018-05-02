const initialState = {};

export default function plateReducer(state=initialState, action) {
    switch (action.type) {
        case 'PLATE_ON_MOUSE_DOWN':
            return state;
        
        default:
            return state;
    }
}