import React, { Component } from 'react';
import { line } from 'd3';
import { edgeConfigs } from './configs';


export default class Edge extends Component {
    meta = {id: this.props.id};

    handleClick = (e) => {
        if (e.shiftKey) {
            this.props.onShiftKeyClick({}, this.meta);
        } else {
            this.props.onSingleClick({}, this.meta);
        }
    }
    handleContextMenu = (e) => {
        this.props.onContextMenu({}, this.meta);
    }
    handleMouseDown = (e) => {
        if (e.shiftKey || !this.props.selected) {
            return null;
        } else {
            // TODO: edge drawing mode!
            document.addEventListener('mousemove', this.handleMouseMove);
            const payload = {originX: e.pageX, originY: e.pageY};
            this.props.onMouseDown(payload, this.meta);
        }
    }
    handleMouseUp = (e) => {
        // TODO: edge fixation (reformat)
        document.removeEventListener('mousemove', this.handleMouseMove);
    }
    handleMouseMove = (e) => {
        const xDiff = this.props.originX - e.pageX;
        const yDiff = this.props.originY - e.pageY;
        const payload = {
            originX: e.pageX, 
            originY: e.pageY,
            x: this.props.x - xDiff,
            y: this.props.y - yDiff
        };
        this.props.onMouseMove(payload, this.meta);
    }

    getPath = line()
        .x( (d) => { return d[0] } )
        .y( (d) => { return d[1] } );
    
    render() {
        const path = this.getPath(this.props.path);
        // TODO: edge drawing mode!
        return (
            <g id={this.props.id} className="edge" 
                onClick={this.handleClick}
                onContextMenu={this.handleContextMenu}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                >
                <path {...edgeConfigs} d={path} />
            </g>
        )
    }
}