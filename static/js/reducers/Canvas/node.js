export default function nodeReducer(state, action) {
    const { type, payload, meta } = action;
    let { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState } = {...state};
    switch (type) {
        case 'NODE_ON_MOUSE_DOWN':
            if (canvasState.mode === 'select') {
                if (nodes[meta.id].embodied && !nodes[meta.id].selected) {
                    nodes[meta.id].selected = true;
                    selectedComponents.node.push(meta.id);
                }
            } else if (canvasState.mode === 'draw_edge_select_source') {
                let edge_id = edgeIDList.length;
                nodes[edge_id] = {x: payload.originX, y: payload.originY, embodied: false, selected: false, visible: false};
                let edge = {source: meta.id, destination: edge_id, embodied: false, selected: false};
                edges[edge_id] = edge;
                edgeIDList.push(edge_id);
                canvasState.mode = 'draw_edge_select_destination';
            }
        case 'NODE_ON_MOUSE_UP':
            if (canvasState.mode === 'select') {
                if (nodes[meta.id].embodied && !nodes[meta.id].selected) {
                    nodes[meta.id].selected = true;
                    selectedComponents.node.push(meta.id);
                }
            } else if (canvasState.mode === 'draw_edge_select_destination') {
                if (nodes[meta.id].embodied) {
                    let edge_id = edgeIDList.pop();
                    let edge = edges[edge_id];
                    let tmp_node_id = edge.destination;
                    edge.destination = meta.id;
                    edge.embodied = true;
                    edges.push(edge);
                    delete nodes[tmp_node_id];
                    canvasState.mode = 'draw_edge_select_source';
                }
            }
        case 'NODE_ON_SINGLE_CLICK':
            if (canvasState.mode === 'draw_node') {
                nodes[meta.id].embodied = true;
                nodeIDList.push(meta.id);
            }
        case 'NODE_ON_DOUBLE_CLICK':
            // TODO: Implement node property window
            return state;
        case 'NODE_ON_SHIFT_CLICK':
            // TODO: Implement node property window
            return state;
        case 'NODE_ON_DRAG':
            if (canvasState.mode === 'select') {
                for (let node_id in selectedComponents.node) {
                    nodes[node_id].x += payload.xDiff;
                    nodes[node_id].y += payload.yDiff;
                }
                for (let plate_id in selectedComponents.plate) {
                    plates[plate_id].x += payload.xDiff;
                    plates[plate_id].y += payload.yDiff;
                }
            } else if (canvasState.mode === 'draw_edge_select_destination') {
                let tmp_id = -1;
                nodes[tmp_id].x += payload.xDiff;
                nodes[tmp_id].y += payload.yDiff;
            }
        case 'NODE_ON_MOUSE_ENTER':
            return state;
        case 'NODE_ON_MOUSE_LEAVE':
            return state;
        default:
            return state;
    }
    const newState = { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState };
    return newState;
}