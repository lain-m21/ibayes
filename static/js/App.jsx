import React, { Component } from "react";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './middleware/sagas';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { CanvasReducers, canvasInitialState } from './reducers';

import { CanvasContainer } from './containers'

const sagaMiddleware = createSagaMiddleware();

let storeCanvas = createStore(
    CanvasReducers,
    canvasInitialState,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

class App extends Component {
    render() {
        return (
            <Provider store={storeCanvas}>
                <CanvasContainer />
            </Provider>
        );
    }
}

export default App;