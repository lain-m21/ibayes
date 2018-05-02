import React, { Component } from 'react';
import nodeTypes from './NodeTypes';


export default class Node extends Component {
    render() {
        const style = this.props.style;
        const node = nodeTypes[this.props.type];
        return (
            <g {...this.props.position} id={this.props.id} className="node">
                {node}
            </g>
        )
    }
}