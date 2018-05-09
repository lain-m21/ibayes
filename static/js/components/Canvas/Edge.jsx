import React, { Component } from 'react';
import { line } from 'd3';
import { nodeConfigs, edgeConfigs } from './configs';


export default class Edge extends Component {
    meta = {id: this.props.id};

    handleClick = (e) => {
        if (e.shiftKey) {
            this.props.edgeActions({}, {id: this.props.id, actionType: 'ON_SHIFT_CLICK'});
        } else {
            this.props.edgeActions({}, {id: this.props.id, actionType: 'ON_SINGLE_CLICK'});
        }
    }
    handleDoubleClick = (e) => {
        this.props.edgeActions({}, {id: this.props.id, actionType: 'ON_DOUBLE_CLICK'});
    }
    handleContextMenu = (e) => {
        this.props.edgeActions({}, {id: this.props.id, actionType: 'ON_CONTEXT_MENU'});
    }
    handleMouseDown = (e) => {
        if (e.shiftKey) {
            return null;
        }
        this.props.edgeActions({}, {id: this.props.id, actionType: 'ON_MOUSE_DOWN'});
    }
    handleMouseUp = (e) => {
        if (e.shiftKey) {
            return null;
        }
        this.props.edgeActions({}, {id: this.props.id, actionType: 'ON_MOUSE_UP'})
    }
    handleMouseEnter = (e) => {
        this.props.edgeActions({}, {id: this.props.id, actionType: 'ON_MOUSE_ENTER'});
    }
    handleMouseLeave = (e) => {
        this.props.edgeActions({}, {id: this.props.id, actionType: 'ON_MOUSE_LEAVE'});
    }

    computePath = () => {
        const { source, destination } = this.props;
        const xDiff = destination.x - source.x;
        const yDiff = destination.y - source.y;
        const theta = Math.atan2(yDiff, xDiff);
        const sourceRadius = nodeConfigs[source.nodeType].radius;
        const destinationRadius = nodeConfigs[destination.nodeType].radius;
        const x1 = source.x + 1.1 * Math.cos(theta) * sourceRadius;
        const y1 = source.y + 1.1 * Math.sin(theta) * sourceRadius;
        const x2 = destination.x - 1.1 * Math.cos(theta) * destinationRadius;
        const y2 = destination.y - 1.1 * Math.sin(theta) * destinationRadius;
        const data = [
            [x1, y1],
            [x2, y2]
        ]
        return data;
    }
    getPath = line()
        .x( (d) => { return d[0] } )
        .y( (d) => { return d[1] } );
    
    render() {
        if (!this.props.embodied) {
            return null;
        }
        const data = this.computePath();
        const path = this.getPath(data);
        return (
            <g className="edge" 
                onClick={this.handleClick}
                onDoubleClick={this.handleDoubleClick}
                onContextMenu={this.handleContextMenu}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                >
                <path {...edgeConfigs} d={path} />
            </g>
        )
    }
}