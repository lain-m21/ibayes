import * as $ from 'jquery';

export default function edgeReducer(state, action) {
    const { type, payload, meta } = action;
    const newState = $.extend(true, {}, state);
    let { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState } = newState;
    switch (type) {
        case 'EDGE_ON_CONTEXT_MENU': {
            return state;
        }
        case 'EDGE_ON_MOUSE_DOWN': {
            if (canvasState.mode === 'select') {
                if (edges[meta.id].embodied && !edges[meta.id].selected) {
                    edges[meta.id].selected = true;
                    selectedComponents.edge.push(meta.id);
                }
            }
            return { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState };
        }
        case 'EDGE_ON_MOUSE_ENTER': {
            if (edges[meta.id].embodied && !edges[meta.id].hovered) {
                canvasState.hoveringEdge += 1;
                edges[meta.id].hovered = true;
            }
            return { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState };
        }
        case 'EDGE_ON_MOUSE_LEAVE': {
            if (edges[meta.id].embodied && edges[meta.id].hovered) {
                canvasState.hoveringEdge -= 1;
                edges[meta.id].hovered = false;
            }
            return { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState };
        }
        default: {
            return state;
        }
    }
}