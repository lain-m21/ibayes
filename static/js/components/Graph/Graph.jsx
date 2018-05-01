import React, { Component } from 'react';
import { connect } from 'react-redux';

import { graphActions } from '../../actions';


class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: {},
            edges: {}
        }
    }

    render() {
        const nodes = {};
        const edges = {};
        return (
            <g>
                {nodes}
                {edges}
            </g>
        )

    }
}