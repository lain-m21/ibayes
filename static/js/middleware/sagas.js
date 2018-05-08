import axios from 'axios';
import {fork, take, takeEvery, put, call, all} from 'redux-saga/effects';
import 'babel-polyfill';

function compile(graph) {
    const data = {
        nodes: graph.nodes,
        plates: graph.plates
    };
    const result = axios.post('/api/compile', {data: data})
                        .then(response => response.data)
                        .catch(err => {throw err;});
    return result;
}

function* handleCompileButtonClick() {
    yield takeEvery('PANE_ON_COMPILE_BUTTON_CLICK', function*(action) {
        const { graph } = action.payload;
        const result = yield call(compile, graph)
        const payload = result;
        const meta = {};
        yield put({type: 'PANE_ON_COMPILE_BUTTON_AFTER_CLICK', payload, meta})
    })
}

export default function* rootSaga() {
    yield all([
        handleCompileButtonClick()
    ])
}