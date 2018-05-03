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
        } else {
            document.addEventListener('mousemove', this.handleMouseMove);
            const payload = {originX: e.pageX, originY: e.pageY};
            this.props.onMouseDown(payload, this.meta);
        }
    }
    handleMouseUp = (e) => {
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
    handleMouseOver = (e) => {
        this.props.onMouseOver({}, this.meta);
    }
    handleMouseOut = (e) => {
        this.props.onMouseOut({}, this.meta);
    }

    render() {
        if (this.props.selected) {
            const node = nodeConfigs[this.props.type]['selected'];
        } else {
            const node = nodeConfigs[this.props.type]['normal'];
        }
        const translate = `translate(${this.props.x}, ${this.props.y})`;
        return (
            <g transform={translate} id={this.props.id} className="node"
                onClick={this.handleClick}
                onDoubleClick={this.handleDoubleClick}
                onContextMenu={this.handleContextMenu}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                >
                {node}
            </g>
        )
    }
}