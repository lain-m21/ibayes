import React, { Component } from 'react';
import { nodeConfigs } from './configs';


export default class Node extends Component {
    meta = {id: this.props.id};

    handleClick = (e) => {
        if (e.shiftKey) {
            this.props.onShiftKeyClick({}, this.meta);
        } else {
            this.props.onSingleClick({}, this.meta);
        }
    }
    handleDoubleClick = (e) => {
        this.props.onDoubleClick({}, this.meta);
    }
    handleContextMenu = (e) => {
        this.props.onContextMenu({}, this.meta);
    }
    handleMouseDown = (e) => {
        if (e.shiftKey) {
            return null;
        }
        document.addEventListener('mousemove', this.handleMouseMove);
        const payload = {
            originX: e.pageX, 
            originY: e.pageY,
        };
        this.props.onMouseDown(payload, this.meta);
    }
    handleMouseUp = (e) => {
        if (e.shiftKey) {
            return null;
        }
        document.removeEventListener('mousemove', this.handleDrag);
        this.props.onMouseUp({}, this.meta)
    }
    handleDrag = (e) => {
        const xDiff = e.pageX - this.props.originX;
        const yDiff = e.pageY - this.props.originY;
        const payload = {
            originX: e.pageX, 
            originY: e.pageY,
            xDiff: xDiff,
            yDiff: yDiff
        };
        this.props.onDrag(payload, this.meta);
    }
    handleMouseEnter = (e) => {
        this.props.onMouseOver({}, this.meta);
    }
    handleMouseLeave = (e) => {
        this.props.onMouseOut({}, this.meta);
    }

    render() {
        const node = nodeConfigs[this.props.type][this.props.state];
        const translate = `translate(${this.props.x}, ${this.props.y})`;
        return (
            <g transform={translate} className="node"
                onClick={this.handleClick}
                onDoubleClick={this.handleDoubleClick}
                onContextMenu={this.handleContextMenu}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                >
                {node}
            </g>
        )
    }
}