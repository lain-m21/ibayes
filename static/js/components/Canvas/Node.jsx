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
        this.props.onMouseDown({}, this.meta);
    }
    handleMouseUp = (e) => {
        if (e.shiftKey) {
            return null;
        }
        this.props.onMouseUp({}, this.meta)
    }
    handleMouseEnter = (e) => {
        this.props.onMouseEnter({}, this.meta);
    }
    handleMouseLeave = (e) => {
        this.props.onMouseLeave({}, this.meta);
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