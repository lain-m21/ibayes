import * as canvasActions from './canvas';
import * as nodeActions from './node';
import * as edgeActions from './edge';
import * as plateActions from './plate';
import * as selectActions from './select';

function actionFactory(dispatch, componentType) {
    const actions = {
        onMouseDown: dispatch((payload, meta) => { 
            return {
                type: componentType + '_ON_MOUSE_DOWN', 
                payload: payload, 
                meta: meta
            } 
        }),
        onMouseUp: dispatch((payload, meta) => {
            return {
                type: componentType + '_ON_MOUSE_UP', 
                payload: payload, 
                meta: meta
            }
        }),
        onMouseMove: dispatch((payload, meta) => { 
            return {
                type: componentType + '_ON_MOUSE_MOVE', 
                payload: payload, 
                meta: meta
            }
        }),
        onSingleClick: dispatch((payload, meta) => { 
            return {
                type: componentType + '_ON_SINGLE_CLICK', 
                payload: payload, 
                meta: meta
            } 
        }),
        onDoubleClick: dispatch((payload, meta) => { 
            return {
                type: componentType + '_ON_DOUBLE_CLICK', 
                payload: payload, 
                meta: meta
            } 
        }),
        onShiftClick: dispatch((payload, meta) => { 
            return {
                type: componentType + '_ON_SHIFT_CLICK', 
                payload: payload, 
                meta: meta
            } 
        }),
        onDelete: dispatch((payload, meta) => { 
            return {
                type: componentType + '_ON_DELETE', 
                payload: payload, 
                meta: meta
            } 
        })
    }
}

const canvasMasterActions = {
    canvas: canvasActions,
    node: nodeActions,
    edge: edgeActions,
    plate: plateActions,
    select: selectActions
}

export default canvasMasterActions;