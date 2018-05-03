import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Node } from '../components';
import { nodeActions } from '../actions';

class NodeContainer extends Component {
    render() {
        return (
            <Node />
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
            return dispatch(nodeActions.onMouseDown(payload, meta));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeContainer);