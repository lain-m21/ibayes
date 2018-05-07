const initialState = {};

export default function canvasReducer(state=initialState, action) {
    const { type, payload, meta } = action;
    const { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents } = {...state};
    const newState = {...state};
    switch (type) {
        case 'CANVAS_ON_MOUSE_DOWN':
            if (state.mode === 'draw_plate_start_drawing') {
                const plate_id = plateIDList.length;
                const newPlate = {x: payload.originX, y: payload.originY, width=0, height=0, embodied=false, selected=false, id: plate_id};
                plates[plate_id] = newPlate;
                plateIDList.push(plate_id);
                newState.plates = plates;
                newState.plateIDList = plateIDList;
                state.mode = 'draw_plate_on_drawing';
            }
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
            } else if (state.mode === 'draw_plate_on_drawing') {
                const newPlate = plates.pop();
                if (plates.width === 0 || plates.height === 0) {
                    plateIDList.splice(newPlate.id, 1);
                } else {
                    newPlate.embodied = true;
                    plates.push(newPlate);
                }
                newState.plates = plates;
                newState.mode = 'draw_plate_start_drawing'
            }
        case 'CANVAS_ON_SINGLE_CLICK':
            if (state.mode === 'select' && !state.hoveringNode && !state.hoveringEdge && !state.hoveringPlate) {
                for (const node_id of selectedComponents.nodes) {
                    nodes[node_id].selected = false;
                }
                for (const edge_id of selectedComponents.edges) {
                    edges[edge_id].selected = false;
                }
                for (const plate_id of selectedComponents.plates) {
                    plates[plate_id].selected = false;
                }
                newState.selectedComponents = {nodes: [], edges: [], plates: []};
            }
        case 'CANVAS_ON_DOUBLE_CLICK':
            return newState;
        case 'CANVAS_ON_SHIFT_CLICK':
            return newState;
        case 'CANVAS_ON_DRAG':
            if (state.mode === 'select') {
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
                    newState.nodes = nodes;
                    newState.plates = plates;
                } else {
                    newState.x += payload.xDiff;
                    newState.y += payload.yDiff;
                }
            } else if (state.mode === 'draw_edge_select_destination') {
                const tmp_id = -1;
                nodes[tmp_id].x += payload.xDiff;
                nodes[tmp_id].y += payload.yDiff;
                newState.nodes = nodes;
            } else if (state.mode === 'draw_plate_on_drawing') {
                const plate_id = plateIDList.pop();
                plates[plate_id].width = payload.xDiff;
                plates[plate_id].height = payload.yDiff;
                newState.plates = plates;
            }
            newState.originX = payload.originX;
            newState.originY = payload.originY;
        case 'CANVAS_ON_PRESS_DELETE_KEY':
            if (state.mode === 'select') {
                const edgeDeleteList = new Set(selectedComponents.edges);
                for (const node_id of selectedComponents.nodes) {
                    nodeIDList.splice(node_id, 1);
                    for (const edge_id of nodes[node_id].edges) {
                        edgeDeleteList.add(edge_id);
                    }
                    delete nodes[node_id];
                }
                for (const edge_id of edgeDeleteList.values()) {
                    edges[edge_id].selected = false;
                }
                for (const plate_id of selectedComponents.plates) {
                    plates[plate_id].selected = false;
                }
                newState.nodes = nodes;
                newState.edges = edges;
                newState.plates = plates;
            }
        default:
            return newState;
    }
    return newState;
}