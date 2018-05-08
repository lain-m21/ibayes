const initialState = {};

export default function plateReducer(state=initialState, action) {
    const { type, payload, meta } = action;
    let { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState } = state;
    switch (type) {
        case 'PLATE_BORDER_ON_DOUBLE_CLICK': {
            return state;
        }
        case 'PLATE_BORDER_ON_SHIFT_CLICK': {
            return state;
        }
        case 'CANVAS_ON_CONTEXT_MENU': {
            return state;
        }
        case 'PLATE_BORDER_ON_MOUSE_DOWN': {
            if (canvasState.mode === 'select') {
                if (plates[meta.id].embodied && !plates[meta.id].selected) {
                    plates[meta.id].selected = true;
                    selectedComponents.plate.push(meta.id);
                }
            }
        }
        case 'PLATE_CORNER_ON_MOUSE_DOWN': {
            if (canvasState.mode === 'select') {
                if (plates[meta.id].embodied) {
                    canvasState.mode = 'select_plate_resizing';
                }
            } else if (canvasState.mode === 'draw_plate_start_drawing') {
                if (plates[meta.id].embodied) {
                    canvasState.mode = 'draw_plate_on_drawings';
                }
            }
        }
        case 'PLATE_BORDER_ON_MOUSE_ENTER': {
            if (plates[meta.id].embodied) {
                canvasState.hoveringPlate += 1;
                plates[meta.id].hovered = true;
            }
        }
        case 'PLATE_BORDER_ON_MOUSE_LEAVE': {
            if (edges[meta.id].embodied) {
                canvasState.hoveringPlate -= 1;
                plates[meta.id].hovered = false;
            }
        }
        default: {
            return state;
        }
    }
    const newState = { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState };
    return newState;
}