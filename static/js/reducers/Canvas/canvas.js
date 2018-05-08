import * as $ from 'jquery';

function renewComponents(components, idList) {
    let idRange = [ ...idList.keys() ];
    const newComponents = [ ...components ];
    for (let newID of idRange) {
        let oldID = idList[newID];
        delete newComponents[oldID];
        newComponents[newID] = components[oldID];
    }
    const newIDList = [ ...idRange ];
    return [ newComponents, newIDList ];
}

export default function canvasReducer(state, action) {
    const { type, payload, meta } = action;
    const newState = $.extend(true, {}, state);
    let { nodes, edges, plates, nodeIDList, edgeIDList, plateIDList, selectedComponents, canvasState } = newState;
    switch (type) {
        case 'CANVAS_ON_SINGLE_CLICK': {
            if (canvasState.mode === 'select' && (canvasState.hoveringNode === 0 || canvasState.hoveringEdge === 0 || canvasState.hoveringPlate === 0)) {
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
                return { ...state, nodes, edges, plates, selectedComponents };
            } else if (canvasState.mode === 'draw_node_param') {
                const node_id = nodeIDList.length;
                const newNode = {
                    id: node_id,
                    x: payload.originX - canvasState.x, 
                    y: payload.originY - canvasState.y,
                    parents: [],
                    children: [],
                    selected: false,
                    embodied: true,
                    visible: true,
                    hovered: true,
                    nodeType: 'param',
                    distribution: 'Gaussian',
                    params: {mu: 0, tau: 1}
                }
                nodes[node_id] = newNode;
                nodeIDList.push(node_id);
                canvasState.hoveringNode += 1;
                return { ...state, nodes, nodeIDList, canvasState };
            }
        }
        case 'CANVAS_ON_DOUBLE_CLICK': {
            return state;
        }
        case 'CANVAS_ON_SHIFT_CLICK': {
            return state;
        }
        case 'CANVAS_ON_CONTEXT_MENU': {
            return state;
        }
        case 'CANVAS_ON_MOUSE_DOWN':
            if (canvasState.mode === 'draw_plate_start_drawing') {
                const plate_id = plateIDList.length;
                const newPlate = {
                    id: plate_id,
                    x: payload.originX - canvasState.x, 
                    y: payload.originY - canvasState.y, 
                    width: 0, 
                    height: 0, 
                    embodied: false, 
                    selected: false,
                    hovered: false,
                    symbol: 'N',
                    value: 1
                };
                plates[plate_id] = newPlate;
                plateIDList.push(plate_id);
            }
            canvasState.originX = payload.originX;
            canvasState.originY = payload.originY;
            return {...state}
        case 'CANVAS_ON_MOUSE_UP':
            if (canvasState.mode === 'draw_edge_select_destination' && canvasState.hoveringNode === 0) {
                const edge_id = edgeIDList.pop();
                const edge = edges[edge_id];
                const tmp_id = edge.destination;
                delete edges[edge_id];
                delete nodes[tmp_id];
                canvasState.mode = 'draw_edge_select_source';
            } else if (canvasState.mode === 'draw_plate_on_drawing' || canvasState.mode === 'select_plate_resizing') {
                const plate_id = plateIDList.pop();
                const newPlate = { ...plates[plate_id] };
                if (newPlate.width !== 0 || newPlate.height !== 0) {
                    newPlate.embodied = true;
                    plates[plate_id] = newPlate;
                    plateIDList.push(plate_id);
                }
                canvasState.mode = canvasState.mode === 'draw_plate_on_drawing' ? 'draw_plate_start_drawing' : 'select';
            }
            return {...state}
        case 'CANVAS_ON_DRAG':
            if (canvasState.mode === 'select') {
                if (selectedComponents.node.length == 0 && selectedComponents.edge.length == 0 && selectedComponents.plate.length == 0) {
                    canvasState.x += payload.xDiff;
                    canvasState.y += payload.yDiff;
                }
                else {
                    for (let node_id of selectedComponents.node) {
                        nodes[node_id].x += payload.xDiff;
                        nodes[node_id].y += payload.yDiff;
                    }
                    for (let plate_id of selectedComponents.plate) {
                        plates[plate_id].x += payload.xDiff;
                        plates[plate_id].y += payload.yDiff;
                    }
                }
            } else if (canvasState.mode === 'draw_edge_select_destination') {
                const edge_id = edgeIDList.pop();
                const node_id = edges[edge_id].destination; 
                nodes[edge_id].x += payload.xDiff;
                nodes[edge_id].y += payload.yDiff;
                edgeIDList.push(edge_id);
            } else if (canvasState.mode === 'draw_plate_on_drawing') {
                const plate_id = plateIDList.pop();
                plates[plate_id].width += payload.xDiff;
                plates[plate_id].height += payload.yDiff;
                plateIDList.push(plate_id);
            }
            canvasState.originX = payload.originX;
            canvasState.originY = payload.originY;
        case 'CANVAS_ON_MOUSE_ENTER': {
            return state;
        }
        case 'CANVAS_ON_MOUSE_LEAVE': {
            return state;
        }
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
}