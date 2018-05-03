import React, { Component } from 'react';
import { line } from 'd3';
import { edgeConfigs } from './configs';


export default class Edge extends Component {
    getPath = line()
        .x( (d) => { return d[0] } )
        .y( (d) => { return d[1] } );
    
    render() {
        const path = this.getPath(this.props.path);
        return (
            <g id={this.props.id} className="edge" {...this.props.edgeActions}>
                <path {...edgeConfigs} d={path} />
            </g>
        )
    }
}