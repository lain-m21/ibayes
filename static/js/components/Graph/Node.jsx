import React, { Component } from 'react';
import { connect } from 'react-redux';

import { nodeActions } from '../../actions';


class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0
        }
    }

    render() {
        const node = {};
        return (
            <g>
                {node}
            </g>
        )
    }
}