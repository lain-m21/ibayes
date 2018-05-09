import * as $ from 'jquery';

export default function plateReducer(state, action) {
    const { type, payload, meta } = action;
    const newState = $.extend(true, {}, state);
    let { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState } = newState;
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
            return { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState };
        }
        case 'PLATE_CORNER_ON_MOUSE_DOWN': {
            if (canvasState.mode === 'select') {
                if (plates[meta.id].embodied) {
                    canvasState.mode = 'select_plate_resizing';
                    const idx = plateIDList.indexOf(meta.id);
                    plateIDList.splice(idx, 1);
                    plateIDList.push(meta.id);
                }
            } else if (canvasState.mode === 'draw_plate_start_drawing') {
                if (plates[meta.id].embodied) {
                    canvasState.mode = 'draw_plate_on_drawing';
                    const idx = plateIDList.indexOf(meta.id);
                    plateIDList.splice(idx, 1);
                    plateIDList.push(meta.id);
                }
            }
            return { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState };
        }
        case 'PLATE_BORDER_ON_MOUSE_ENTER': {
            if (plates[meta.id].embodied && !plates[meta.id].hovered) {
                canvasState.hoveringPlate += 1;
                plates[meta.id].hovered = true;
            }
            return { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState };
        }
        case 'PLATE_BORDER_ON_MOUSE_LEAVE': {
            if (plates[meta.id].embodied && plates[meta.id].hovered) {
                canvasState.hoveringPlate -= 1;
                plates[meta.id].hovered = false;
            }
            return { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState };
        }
        default: {
            return state;
        }
    }
}