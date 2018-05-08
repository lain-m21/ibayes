import reduceReducers from 'reduce-reducers';

import canvasReducer from './canvas'
import nodeReducer from './node'
import edgeReducer from './edge'
import plateReducer from './plate'
import paneReducer from './pane';

export const CanvasReducers = reduceReducers(
    canvasReducer,
    nodeReducer,
    edgeReducer,
    plateReducer,
    paneReducer
);

export const canvasInitialState = {
    nodes: {},
    edges: {},
    plates: {},
    nodeIDList: [],
    edgeIDList: [],
    plateIDList: [],
    selectedComponents: {
        node: [],
        edge: [],
        plate: []
    },
    canvasState: {
        mode: 'select',
        hoveringNode: 0,
        hoveringEdge: 0,
        hoveringPlate: 0,
        originX: 0,
        originY: 0,
        x: 0,
        y: 0
    }
}