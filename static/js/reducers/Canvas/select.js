const initialState = {};

export default function selectReducer(state=initialState, action) {
    switch (action.type) {
        case 'SELECT_ON_MOUSE_DOWN':
            return state;
        
        default:
            return state;
    }
}