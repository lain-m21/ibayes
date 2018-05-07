export default function paneReducer(state, action) {
    const { type, payload, meta } = action;
    let { canvasState } = {...state};
    switch (type) {
        case 'PANE_ON_NODE_BUTTON_CLICK':
            canvasState.mode = 'draw_node';
        case 'PANE_ON_EDGE_BUTTON_CLICK':
            canvasState.mode = 'draw_edge_select_source';
        case 'PANE_ON_PLATE_BUTTON_CLICK':
            canvasState.mode = 'draw_plate_start_drawing';
        case 'PANE_ON_SELECT_BUTTON_CLICK':
            canvasState.mode = 'select';
        case 'PANE_ON_COMPILE_BUTTON_AFTER_CLICK':
            console.log(meta);
            return state;
        default:
            return state;
    }
    const newState = { ...state, canvasState };
    return newState;
}