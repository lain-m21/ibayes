import { combineReducers } from 'redux';

import canvasReducer from './canvas'
import nodeReducer from './node'
import edgeReducer from './edge'
import plateReducer from './plate'
import selectReducer from './select'

const CanvasReducers = combineReducers({
    canvas: canvasReducer,
    node: nodeReducer,
    edge: edgeReducer,
    plate: plateReducer,
    select: selectReducer
});

export default CanvasReducers;