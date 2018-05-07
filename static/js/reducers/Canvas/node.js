const initialState = {};

export default function nodeReducer(state=initialState, action) {
    const { type, payload, meta } = action;
    const { nodes, edges, nodeIDList, edgeIDList, selectedComponents, mode } = {...state};
    switch (type) {
        case 'NODE_ON_MOUSE_DOWN':
            if (mode === 'select') {
                if (nodes[meta.id].embodied && !nodes[meta.id].selected) {
                    nodes[meta.id].selected = true;
                    selectedComponents.nodes.push(meta.id);
                }
            } else if (mode === 'draw_edge_select_source') {
                const edge_id = edgeIDList.length;
                nodes[edge_id] = {x: payload.originX, y: payload.originY, embodied: false, selected: false, visible: false};
                const edge = {source: meta.id, destination: edge_id, embodied: false, selected: false};
                edges[edge_id] = edge;
                edgeIDList.push(edge_id);
                mode = 'draw_edge_select_destination';
            }
        case 'NODE_ON_MOUSE_UP':
            if (mode === 'select') {
                if (nodes[meta.id].embodied && !nodes[meta.id].selected) {
                    nodes[meta.id].selected = true;
                    selectedComponents.nodes.push(meta.id);
                }
            } else if (mode === 'draw_edge_select_destination') {
                if (nodes[meta.id].embodied) {
                    const edge_id = edgeIDList.pop();
                    const edge = edges[edge_id];
                    const tmp_node_id = edge.destination;
                    edge.destination = meta.id;
                    edge.embodied = true;
                    edges.push(edge);
                    delete nodes[tmp_node_id];
                    mode = 'draw_edge_select_source';
                }
            }
        case 'NODE_ON_SINGLE_CLICK':
            if (mode === 'draw_node') {
                nodes[meta.id].embodied = true;
                nodeIDList.push(meta.id);
                newState.nodes = nodes;
            }
        case 'NODE_ON_DOUBLE_CLICK':
            return newState;
        case 'NODE_ON_SHIFT_CLICK':
            return newState;
        case 'NODE_ON_DRAG':
            for (node_id in selectedComponents.nodes) {
                nodes[node_id].x += payload.xDiff;
                nodes[node_id].y += payload.yDiff;
            }
            const plates = {...state.plates};
            for (plate_id in selectedComponents.plates) {
                plates[plate_id].x += payload.xDiff;
                plates[plate_id].y += payload.yDiff;
            }
            if (state.mode === 'draw_edge_select_destination') {
                const tmp_id = -1;
                nodes[tmp_id].x += payload.xDiff;
                nodes[tmp_id].y += payload.yDiff;
            }
            newState.nodes = nodes;
            newState.plates = plates;
        default:
            return newState;
    }
    return newState;
}