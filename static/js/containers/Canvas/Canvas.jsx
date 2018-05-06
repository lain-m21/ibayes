import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Canvas } from '../components';
import canvasActionFactory from '../actions';

class CanvasContainer extends Component {
    render() {
        return (
            <svg width="100%" height="100%">
                <Canvas {...this.props} />
            </svg>
        )
    }
}

const mapStateToProps = state => {
    return {
        meta: state.meta,
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
        plateActions: canvasActionFactory(dispatch, 'PLATE')
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasContainer);