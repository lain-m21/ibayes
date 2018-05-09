import * as $ from 'jquery';

export default function nodeReducer(state, action) {
    const { type, payload, meta } = action;
    const newState = $.extend(true, {}, state);
    let { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState } = newState;
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
                nodes[node_id] = { ...nodes[meta.id], nodeType: 'invisible', id: node_id, embodied: false, selected: false, hovered: false };
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
            return { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState };
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
                    edges[edge_id] = edge;
                    edgeIDList.push(edge_id);
                    nodes[edge.source].parents.push(edge.destination);
                    nodes[edge.destination].children.push(edge.source);
                    delete nodes[tmp_node_id];
                    canvasState.mode = 'draw_edge_select_source';
                }
            }
            return { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState };
        }
        case 'NODE_ON_MOUSE_ENTER': {
            if (nodes[meta.id].embodied && !nodes[meta.id].hovered) {
                canvasState.hoveringNode += 1;
                nodes[meta.id].hovered = true;
            }
            return { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState };
        }
        case 'NODE_ON_MOUSE_LEAVE': {
            if (nodes[meta.id].embodied && nodes[meta.id].hovered) {
                const idx = canvasState.hoveringNode -= 1;
                nodes[meta.id].hovered = false;
            }
            if (canvasState.mode === 'draw_edge_select_destination') {
                const edge_id = edgeIDList.pop();
                edges[edge_id].embodied = true;
                edgeIDList.push(edge_id);
            }
            return { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState };
        }
        default: {
            return state;
        }
    }
}