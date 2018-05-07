function renewComponents(components, idList) {
    let idRange = [...idList.keys()];
    const newComponents = [...components];
    for (let newID of idRange) {
        let oldID = idList[newID];
        delete newComponents[oldID];
        newComponents[newID] = components[oldID];
    }
    const newIDList = [...idRange];
    return [ newComponents, newIDList ];
}

export default function canvasReducer(state, action) {
    const { type, payload, meta } = action;
    let { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState } = {...state};
    switch (type) {
        case 'CANVAS_ON_MOUSE_DOWN':
            if (canvasState.mode === 'draw_plate_start_drawing') {
                const plate_id = plateIDList.length;
                const newPlate = {x: payload.originX, y: payload.originY, width=0, height=0, embodied=false, selected=false, id: plate_id};
                plates[plate_id] = newPlate;
                plateIDList.push(plate_id);
            }
            canvasState.originX = payload.originX;
            canvasState.originY = payload.originY;
        case 'CANVAS_ON_MOUSE_UP':
            if (canvasState.mode === 'draw_edge_select_destination' && !canvasState.hovering) {
                const edge = edges.pop();
                const tmp_id = edge.destination;
                delete edge;
                delete nodes[tmp_id];
                canvasState.mode = 'draw_edge_select_source';
            } else if (canvasState.mode === 'draw_plate_on_drawing') {
                const newPlate = plates.pop();
                if (plates.width === 0 || plates.height === 0) {
                    plateIDList.splice(newPlate.id, 1);
                } else {
                    newPlate.embodied = true;
                    plates.push(newPlate);
                }
                canvasState.mode = 'draw_plate_start_drawing'
            }
        case 'CANVAS_ON_SINGLE_CLICK':
            if (canvasState.mode === 'select' && !canvasState.hovering) {
                for (let node_id of selectedComponents.node) {
                    nodes[node_id].selected = false;
                }
                for (let edge_id of selectedComponents.edge) {
                    edges[edge_id].selected = false;
                }
                for (let plate_id of selectedComponents.plate) {
                    plates[plate_id].selected = false;
                }
                selectedComponents = {node: [], edge: [], plate: []};
            }
        case 'CANVAS_ON_DOUBLE_CLICK':
            return state;
        case 'CANVAS_ON_SHIFT_CLICK':
            return state;
        case 'CANVAS_ON_DRAG':
            if (canvasState.mode === 'select') {
                if (selectedComponents.node.length == 0 && selectedComponents.edge.length == 0 && selectedComponents.plate.length == 0) {
                    canvasState.x += payload.xDiff;
                    canvasState.y += payload.yDiff;
                }
            } else if (canvasState.mode === 'draw_edge_select_destination') {
                let edge_id = edgeIDList.pop();
                nodes[edge_id].x += payload.xDiff;
                nodes[edge_id].y += payload.yDiff;
                edgeIDList.push(edge_id);
            } else if (canvasState.mode === 'draw_plate_on_drawing') {
                let plate_id = plateIDList.pop();
                plates[plate_id].width = payload.xDiff;
                plates[plate_id].height = payload.yDiff;
                plateIDList.push(plate_id);
            }
            canvasState.originX = payload.originX;
            canvasState.originY = payload.originY;
        case 'CANVAS_ON_MOUSE_ENTER':
            return state;
        case 'CANVAS_ON_MOUSE_LEAVE':
            return state;
        case 'CANVAS_ON_PRESS_DELETE_KEY':
            if (canvasState.mode === 'select') {
                const edgeDeleteList = new Set(selectedComponents.edge);
                for (let node_id of selectedComponents.node) {
                    let idx = nodeIDList.indexOf(node_id);
                    nodeIDList.splice(idx, 1);
                    for (let edge_id of nodes[node_id].edge) {
                        edgeDeleteList.add(edge_id);
                    }
                    delete nodes[node_id];
                }
                for (let edge_id of edgeDeleteList.values()) {
                    let idx = edgeIDList.indexOf(edge_id);
                    edgeIDList.splice(idx, 1);
                    delete edges[edge_id];
                }
                for (let plate_id of selectedComponents.plate) {
                    let idx = plateIDList.indexOf(plate_id);
                    plateIDList.splice(idx, 1)
                    delete plates[idx];
                }
                selectedComponents = {node: [], edge: [], plate: []};
                nodes, nodeIDList = renewComponents(nodes, nodeIDList);
                edges, edgeIDList = renewComponents(edges, edgeIDList);
                plates, plateIDList = renewComponents(plates, plateIDList);
            }
        default:
            return state;
    }
    const newState = { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState };
    return newState;
}