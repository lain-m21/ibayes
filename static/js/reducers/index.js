import {combineReducers} from 'redux';
import graphReducer from './graph';
import canvasReducer from './canvas';

const reducers = combineReducers({
    graph: graphReducer,
    canvas: canvasReducer
})

export default reducers