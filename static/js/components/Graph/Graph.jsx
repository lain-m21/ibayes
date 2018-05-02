import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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

export default DragDropContext(HTML5Backend)(Graph)