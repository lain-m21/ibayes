import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Canvas, Pane } from '../components';
import { canvasActionFactory, paneActions } from '../actions';

class CanvasContainer extends Component {
    render() {
        return (
            <div className="canvas-container">
                <Pane {...this.props}/>
                <svg width="100%" height="100%">
                    <Canvas {...this.props} />
                </svg>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        canvas: state.canvasState,
        nodes: state.nodes,
        edges: state.edges,
        plates: state.plates,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        canvasActions: canvasActionFactory(dispatch, 'CANVAS'),
        nodeActions: canvasActionFactory(dispatch, 'NODE'),
        edgeActions: canvasActionFactory(dispatch, 'EDGE'),
        plateActions: canvasActionFactory(dispatch, 'PLATE'),
        paneActions: paneActions
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasContainer);