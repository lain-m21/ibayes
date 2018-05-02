import * as canvasActions from './canvas';
import * as nodeActions from './node';
import * as edgeActions from './edge';
import * as plateActions from './plate';
import * as selectActions from './select';

const canvasMasterActions = {
    canvas: canvasActions,
    node: nodeActions,
    edge: edgeActions,
    plate: plateActions,
    select: selectActions
}

export default canvasMasterActions;