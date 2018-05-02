import React, { Component } from "react";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './middleware'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import Canvas from './components'

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                {Canvas}
            </Provider>
        );
    }
}

export default App;