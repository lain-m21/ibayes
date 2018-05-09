import * as $ from 'jquery';

export default function paneReducer(state, action) {
    const { type, payload, meta } = action;
    const newState = $.extend(true, {}, state);
    let { canvasState } = newState;
    switch (type) {
        case 'PANE_ON_NODE_BUTTON_CLICK': {
            canvasState.mode = 'draw_node_param';
            return { ...state, canvasState }
        }
        case 'PANE_ON_EDGE_BUTTON_CLICK': {
            canvasState.mode = 'draw_edge_select_source';
            return { ...state, canvasState }
        }
        case 'PANE_ON_PLATE_BUTTON_CLICK': {
            canvasState.mode = 'draw_plate_start_drawing';
            return { ...state, canvasState }
        }
        case 'PANE_ON_SELECT_BUTTON_CLICK': {
            canvasState.mode = 'select';
            return { ...state, canvasState }
        }
        case 'PANE_ON_COMPILE_BUTTON_AFTER_CLICK': {
            return state;
        }
        default: {
            return state;
        }
    }
}