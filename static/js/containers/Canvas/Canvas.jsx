import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Canvas } from '../components';
import { canvasMasterActions } from '../actions';

class CanvasContainer extends Component {
    render() {
        return (
            <svg width="100%" height="100%">
                <Canvas />
            </svg>
        )
    }
}

const mapStateToProps = state => {
    return {
        nodes: state.nodes,
        edges: state.edges,
        plates: state.plates,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        nodeActions: {
            onMouseDown: (payload, meta) => {
                return dispatch((payload, meta) => {
                    return {type: 'NODE_ON_MOUSE_DOWN', payload: payload, meta: meta}
                })
            }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasContainer);