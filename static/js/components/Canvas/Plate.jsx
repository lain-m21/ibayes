import React, { Component } from 'react';
import { line } from 'd3';
import { plateConfigs } from './configs';


export default class Plate extends Component {
    meta = this.props.id;
    handleClick = (e, part) => {
        if (part === 'border') {
            if (e.shiftKey) {
                this.props.plateBorderActions({}, {id: this.props.id, actionType: 'ON_SHIFT_CLICK'});
            } else {
                this.props.plateBorderActions({}, {id: this.props.id, actionType: 'ON_SINGLE_CLICK'});
            }
        } else {
            if (e.shiftKey) {
                this.props.plateCornerActions({}, {id: this.props.id, actionType: 'ON_SHIFT_CLICK'});
            } else {
                this.props.plateCornerActions({}, {id: this.props.id, actionType: 'ON_SINGLE_CLICK'});
            }
        }
    }
    handleDoubleClick = (e, part) => {
        if (part === 'border') {
            this.props.plateBorderActions({}, {id: this.props.id, actionType: 'ON_DOUBLE_CLICK'});
        } else {
            this.props.plateCornerActions({}, {id: this.props.id, actionType: 'ON_DOUBLE_CLICK'});
        }
    }
    handleContextMenu = (e, part) => {
        if (part === 'border') {
            this.props.plateBorderActions({}, {id: this.props.id, actionType: 'ON_CONTEXT_MENU'});
        } else {
            this.props.plateCornerActions({}, {id: this.props.id, actionType: 'ON_CONTEXT_MENU'});
        }
    }
    handleMouseDown = (e, part) => {
        if (part === 'border') {
            this.props.plateBorderActions({}, {id: this.props.id, actionType: 'ON_MOUSE_DOWN'});
        } else {
            this.props.plateCornerActions({}, {id: this.props.id, actionType: 'ON_MOUSE_DOWN'});
        }
    }
    handleMouseUp = (e, part) => {
        if (part === 'border') {
            this.props.plateBorderActions({}, {id: this.props.id, actionType: 'ON_MOUSE_UP'});
        } else {
            this.props.plateCornerActions({}, {id: this.props.id, actionType: 'ON_MOUSE_UP'});
        }
    }
    handleMouseEnter = (e, part) => {
        if (part === 'border') {
            this.props.plateBorderActions({}, {id: this.props.id, actionType: 'ON_MOUSE_ENTER'});
        } else {
            this.props.plateCornerActions({}, {id: this.props.id, actionType: 'ON_MOUSE_ENTER'});
        }
    }
    handleMouseLeave = (e, part) => {
        if (part === 'border') {
            this.props.plateBorderActions({}, {id: this.props.id, actionType: 'ON_MOUSE_LEAVE'});
        } else {
            this.props.plateCornerActions({}, {id: this.props.id, actionType: 'ON_MOUSE_LEAVE'});
        }
    }
    getCornerDOM = (point, cursor, key) => {
        const plateCornerStyle = plateConfigs.corner;
        return (
            <circle cx={point[0]} cy={point[1]} {...plateCornerStyle} cursor={cursor} key={id}
                onClick={(e) => this.handleClick(e, 'corner')}
                onDoubleClick={(e) => this.handleDoubleClick(e, 'corner')}
                onContextMenu={(e) => this.handleContextMenu(e, 'corner')}
                onMouseDown={(e) => this.handleMouseDown(e, 'corner')}
                onMouseUp={(e) => this.handleMouseUp(e, 'corner')}
                onMouseEnter={(e) => this.handleMouseEnter(e, 'corner')}
                onMouseLeave={(e) => this.handleMouseLeave(e, 'corner')}
                />
        )
    }
    getPlate = () => {
        const corners = [
            [0, 0],
            [0 + this.props.width, 0],
            [0 + this.props.width, 0 + this.props.height],
            [0, 0 + this.props.height]
        ];
        
        let cornerPoints = `${corners[0][0]},${corners[0][1]}`
        cornerPoints += ` ${corners[1][0]},${corners[1][1]}`
        cornerPoints += ` ${corners[2][0]},${corners[2][1]}`
        cornerPoints += ` ${corners[3][0]},${corners[3][1]}`
        
        let plateEdgeStyle;
        if (this.props.selected) {
            plateEdgeStyle = plateConfigs.edge['selected'];
        } else {
            plateEdgeStyle = plateConfigs.edge['normal']
        }

        const plate = [
            <polygon points={cornerPoints} {...plateEdgeStyle} key={this.props.id}
                onClick={(e) => this.handleClick(e, 'border')}
                onDoubleClick={(e) => this.handleDoubleClick(e, 'border')}
                onContextMenu={(e) => this.handleContextMenu(e, 'border')}
                onMouseDown={(e) => this.handleMouseDown(e, 'border')}
                onMouseUp={(e) => this.handleMouseUp(e, 'border')}
                onMouseEnter={(e) => this.handleMouseEnter(e, 'border')}
                onMouseLeave={(e) => this.handleMouseLeave(e, 'border')}
                />
        ];
        
        if (this.props.embodied) {
            plate.push(this.getCornerDOM(corners[0], 'nw-resize', 0));
            plate.push(this.getCornerDOM(corners[1], 'ne-resize', 1));
            plate.push(this.getCornerDOM(corners[2], 'nw-resize', 2));
            plate.push(this.getCornerDOM(corners[3], 'ne-resize', 3));
        }

        return plate;
    }

    render() {
        const plate = this.getPlate();
        const translate = `translate(${this.props.x}, ${this.props.y})`;
        return (
            <g transform={translate} className="plate">
                {plate}
            </g>
        )
    }
}