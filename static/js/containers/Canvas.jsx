import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Canvas, Pane } from '../components';
import { canvasActionFactory, paneActions } from '../actions';

class CanvasContainer extends Component {
    shouldComponentUpdate() {
        return true;
    }
    render() {
        console.log(this.props)
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
        canvasActions: (payload, meta) => {
            return dispatch(canvasActionFactory('CANVAS', payload, meta));
        },
        nodeActions: (payload, meta) => {
            return dispatch(canvasActionFactory('NODE', payload, meta));
        },
        edgeActions: (payload, meta) => {
            return dispatch(canvasActionFactory('EDGE', payload, meta));
        },
        plateBorderActions: (payload, meta) => {
            return dispatch(canvasActionFactory('PLATE_BORDER', payload, meta));
        },
        plateBorderActions: (payload, meta) => {
            return dispatch(canvasActionFactory('PLATE_CORNER', payload, meta));
        },
        paneActions: (payload, meta) => {
            return dispatch(paneActions(payload, meta))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasContainer);