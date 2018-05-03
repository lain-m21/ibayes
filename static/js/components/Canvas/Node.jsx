import React, { Component } from 'react';
import { nodeConfigs } from './configs';


export default class Node extends Component {
    render() {
        if (this.props.selected) {
            const node = nodeConfigs[this.props.type]['selected'];
        } else {
            const node = nodeConfigs[this.props.type]['normal'];
        }
        const translate = `translate(${this.props.x}, ${this.props.y})`;
        return (
            <g transform={translate} id={this.props.id} className="node" {...this.props.nodeActions}>
                {node}
            </g>
        )
    }
}