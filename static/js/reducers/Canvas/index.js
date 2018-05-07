import reduceReducers from 'reduce-reducers';

import canvasReducer from './canvas'
import nodeReducer from './node'
import edgeReducer from './edge'
import plateReducer from './plate'
import selectReducer from './select'

export const CanvasReducers = reduceReducers(
    canvasReducer,
    nodeReducer,
    edgeReducer,
    plateReducer,
    selectReducer
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
        hover: [],
        originX: 0,
        originY: 0,
        x: 0,
        y: 0
    }
}