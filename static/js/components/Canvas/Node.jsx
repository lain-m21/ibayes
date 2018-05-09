import React, { Component } from 'react';
import { nodeConfigs } from './configs';


export default class Node extends Component {
    handleClick = (e) => {
        if (e.shiftKey) {
            this.props.nodeActions({}, {id: this.props.id, actionType: 'ON_SHIFT_CLICK'});
        } else {
            this.props.nodeActions({}, {id: this.props.id, actionType: 'ON_SINGLE_CLICK'});
        }
    }
    handleDoubleClick = (e) => {
        this.props.nodeActions({}, {id: this.props.id, actionType: 'ON_DOUBLE_CLICK'});
    }
    handleContextMenu = (e) => {
        this.props.nodeActions({}, {id: this.props.id, actionType: 'ON_CONTEXT_MENU'});
    }
    handleMouseDown = (e) => {
        if (e.shiftKey) {
            return null;
        }
        this.props.nodeActions({}, {id: this.props.id, actionType: 'ON_MOUSE_DOWN'});
    }
    handleMouseUp = (e) => {
        if (e.shiftKey) {
            return null;
        }
        this.props.nodeActions({}, {id: this.props.id, actionType: 'ON_MOUSE_UP'})
    }
    handleMouseEnter = (e) => {
        this.props.nodeActions({}, {id: this.props.id, actionType: 'ON_MOUSE_ENTER'});
    }
    handleMouseLeave = (e) => {
        this.props.nodeActions({}, {id: this.props.id, actionType: 'ON_MOUSE_LEAVE'});
    }

    render() {
        let node;
        if (!this.props.embodied) {
            node = nodeConfigs['invisible']['shape']['normal']
        } else {
            if (this.props.selected) {
                node = nodeConfigs[this.props.nodeType]['shape']['selected'];
            } else if (this.props.hovered) {
                node = nodeConfigs[this.props.nodeType]['shape']['hovered'];
            } else {
                node = nodeConfigs[this.props.nodeType]['shape']['normal'];
            }
        }
        const translate = `translate(${this.props.x}, ${this.props.y})`;
        return (
            <g transform={translate} className="node" id={this.props.id}
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