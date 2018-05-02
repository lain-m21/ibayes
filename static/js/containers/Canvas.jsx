import React, { Component } from 'react';
import { connect } from 'react-redux';

import Canvas from '../components';
import { canvasActions } from '../actions';

class CanvasContainer extends Component {
    render() {
        return (
            <svg>
                <Canvas />
            </svg>
        )
    }
}

const mapStateToProps = state => {
    return {
        graph: state.graph,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        edgeOnMouseDown: (payload, meta) => {
            return dispatch(canvasActions.edge.onMouseDown(payload, meta));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasContainer);