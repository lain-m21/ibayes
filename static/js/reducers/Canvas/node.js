export default function nodeReducer(state, action) {
    const { type, payload, meta } = action;
    let { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState } = state;
    switch (type) {
        case 'NODE_ON_DOUBLE_CLICK': {
            return state;
        }
        case 'NODE_ON_SHIFT_CLICK': {
            return state;
        }
        case 'CANVAS_ON_CONTEXT_MENU': {
            return state;
        }
        case 'NODE_ON_MOUSE_DOWN': {
            if (canvasState.mode === 'select') {
                if (nodes[meta.id].embodied && !nodes[meta.id].selected) {
                    nodes[meta.id].selected = true;
                    selectedComponents.node.push(meta.id);
                }
            } else if (canvasState.mode === 'draw_edge_select_source') {
                const node_id = nodeIDList.length;
                nodes[node_id] = { ...nodes[meta.id], embodied: false, selected: false, visible: false, hovered: false };
                const edge_id = edgeIDList.length;
                const edge = {
                    id: edge_id,
                    source: meta.id, 
                    destination: node_id, 
                    embodied: false, 
                    selected: false,
                    hovered: false
                };
                edges[edge_id] = edge;
                edgeIDList.push(edge_id);
                canvasState.mode = 'draw_edge_select_destination';
            }
        }
        case 'NODE_ON_MOUSE_UP': {
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
                    // assign child and parent
                    nodes[edge.source].parents.push(edge.destination);
                    nodes[edge.destination].children.push(edge.source);
                    delete nodes[tmp_node_id];
                    canvasState.mode = 'draw_edge_select_source';
                }
            }
        }
        case 'NODE_ON_MOUSE_ENTER': {
            if (nodes[meta.id].embodied) {
                canvasState.hoveringNode += 1;
                nodes[meta.id].hovered = true;
            }
        }
        case 'NODE_ON_MOUSE_LEAVE': {
            if (nodes[meta.id].embodied) {
                const idx = canvasState.hoveringNode -= 1;
                nodes[meta.id].hovered = false;
            }
        }
        default: {
            return state;
        }
    }
    const newState = { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState };
    return newState;
}