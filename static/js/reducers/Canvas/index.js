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
    nodes: {
        id: 0,
        x: 0,
        y: 0,
        parents: [],
        children: [],
        selected: false,
        embodied: false,
        visible: false,
        hovered: false,
        type: param,
        distribution: 'Gaussian',
        params: {}
    },
    edges: {
        id: 0,
        source: 0,
        destination: 1,
        selected: false,
        embodied: false,
        hovered: false
    },
    plates: {
        id: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        selected: false,
        embodied: false,
        hovered: false,
        symbol: 'N',
        value: 10
    },
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
        hovering: 0,
        originX: 0,
        originY: 0,
        x: 0,
        y: 0
    }
}