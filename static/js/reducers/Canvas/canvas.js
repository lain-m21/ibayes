const initialState = {};

export default function canvasReducer(state=initialState, action) {
    const { type, payload, meta } = action;
    const { nodes, edges, plates, nodeIDLIst, edgeIDList, plateIDList, selectedComponents } = {...state};
    const newState = {...state};
    switch (type) {
        case 'CANVAS_ON_MOUSE_DOWN':
            newState.originX = payload.originX;
            newState.originY = payload.originY;
        case 'CANVAS_ON_MOUSE_UP':
            if (state.mode === 'draw_edge_select_destination' && !state.hoveringNode) {
                const edge = edges.pop();
                const tmp_id = edge.destination;
                delete edge;
                delete nodes[tmp_id];
                newState.nodes = nodes;
                newState.edges = edges;
                newState.mode = 'draw_edge_select_source';
            }
        case 'CANVAS_ON_SINGLE_CLICK':
            if (state.mode === 'select' && !state.hoveringNode && !state.hoveringEdge && !state.hoveringPlate) {
                for (node_id of selectedComponents.nodes) {
                    nodes[node_id].selected = false;
                }
                for (edge_id of selectedComponents.edges) {
                    edges[edge_id].selected = false;
                }
                for (plate_id of selectedComponents.plates) {
                    plates[plate_id].selected = false;
                }
                newState.selectedComponents = {nodes: [], edges: [], plates: []};
            }
        case 'CANVAS_ON_DOUBLE_CLICK':
            return newState;
        case 'CANVAS_ON_SHIFT_CLICK':
            return newState;
        case 'CANVAS_ON_DRAG':
            if (selectedComponents.nodes.length > 0 || selectedComponents.edges.length > 0 || selectedComponents.plates.length > 0) {
                for (node_id of selectedComponents.nodes) {
                    nodes[node_id].x += payload.xDiff;
                    nodes[node_id].y += payload.yDiff;
                }
                const plates = {...state.plates};
                for (plate_id of selectedComponents.plates) {
                    plates[plate_id].x += payload.xDiff;
                    plates[plate_id].y += payload.yDiff;
                }
            } else {
                state.x += payload.xDiff;
                state.y += payload.yDiff;
            }
            
            if (state.mode === 'draw_edge_select_destination') {
                const tmp_id = -1;
                nodes[tmp_id].x += payload.xDiff;
                nodes[tmp_id].y += payload.yDiff;
            }
            newState.originX = payload.originX;
            newState.originY = payload.originY;
            newState.nodes = nodes;
            newState.plates = plates;
        case 'CANVAS_ON_PRESS_DELETE_KEY':
            return newState;
        default:
            return newState;
    }
    return newState;
}