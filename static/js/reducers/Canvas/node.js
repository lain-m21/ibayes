const initialState = {};

export default function nodeReducer(state=initialState, action) {
    const { type, payload, meta } = action;
    const nodes = {...state.nodes};
    const nodeIDList = {...state.nodeIDList};
    const selectedComponents = {...state.selectedComponents};
    const newState = {...state};
    switch (type) {
        case 'NODE_ON_MOUSE_DOWN':
            if (state.mode === 'select') {
                if (nodes[meta.id].embodied && !nodes[meta.id].selected) {
                    nodes[meta.id].selected = true;
                    selectedComponents.nodes.push(meta.id);
                    newState.nodes = nodes;
                }
            } else if (state.mode === 'draw_edge_select_source') {
                const tmp_id = -1;
                nodes[tmp_id] = {x: payload.originX, y: payload.originY, embodied: false, selected: false, visible: false};
                const edge = {source: meta.id, destination: tmp_id, embodied: false, selected: false};
                newState.edges.push(edge);
                newState.nodes = nodes;
                newState.mode = 'draw_edge_select_destination';
            }
        case 'NODE_ON_MOUSE_UP':
            if (state.mode === 'select') {
                if (nodes[meta.id].embodied && !nodes[meta.id].selected) {
                    nodes[meta.id].selected = true;
                    selectedComponents.nodes.push(meta.id);
                    newState.nodes = nodes;
                }
            } else if (state.mode === 'draw_edge_select_destination') {
                const edge = newState.edges.pop();
                const tmp_id = edge.destination;
                edge.destination = meta.id;
                edge.embodied = true;
                newState.edges.push(edge);
                delete nodes[tmp_id];
                newState.nodes = nodes;
                newState.mode = 'draw_edge_select_source';
            }
        case 'NODE_ON_SINGLE_CLICK':
            if (state.mode === 'draw_node') {
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