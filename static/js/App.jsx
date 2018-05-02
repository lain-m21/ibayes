import React, { Component } from "react";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './middleware'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import masterReducers from './reducers';

import CanvasContainer from './containers'

// const sagaMiddleware = createSagaMiddleware();

let storeCanvas = createStore(
    masterReducers.canvas,
    // applyMiddleware(sagaMiddleware)
);
// sagaMiddleware.run(rootSaga);

class App extends Component {
    render() {
        return (
            <Provider store={storeCanvas}>
                {CanvasContainer}
            </Provider>
        );
    }
}

export default App;