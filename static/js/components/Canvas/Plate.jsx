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

    getPath = line()
        .x( (d) => { return d[0] } )
        .y( (d) => { return d[1] } )
    
    getBorderLineDOM = (start, end, key) => {
        const path = this.getPath([start, end]);
        const key_id = 'border-' + key;
        let plateEdgeStyle;
        if (this.props.selected) {
            plateEdgeStyle = plateConfigs.edge['selected'];
        } else {
            plateEdgeStyle = plateConfigs.edge['normal']
        }
        return (
            <path d={path} {...plateEdgeStyle} cursor="pointer" key={key_id} 
                onClick={(e) => this.handleClick(e, 'border')}
                onDoubleClick={(e) => this.handleDoubleClick(e, 'border')}
                onContextMenu={(e) => this.handleContextMenu(e, 'border')}
                onMouseDown={(e) => this.handleMouseDown(e, 'border')}
                onMouseUp={(e) => this.handleMouseUp(e, 'border')}
                onMouseEnter={(e) => this.handleMouseEnter(e, 'border')}
                onMouseLeave={(e) => this.handleMouseLeave(e, 'border')}
                />
        )
    }
    getCornerDOM = (point, cursor, key) => {
        const plateCornerStyle = plateConfigs.corner;
        return (
            <circle cx={point[0]} cy={point[1]} {...plateCornerStyle} cursor={cursor} key={key}
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
        
        // let cornerPoints = `${corners[0][0]},${corners[0][1]}`
        // cornerPoints += ` ${corners[1][0]},${corners[1][1]}`
        // cornerPoints += ` ${corners[2][0]},${corners[2][1]}`
        // cornerPoints += ` ${corners[3][0]},${corners[3][1]}`
        
        // let plateEdgeStyle;
        // if (this.props.selected) {
        //     plateEdgeStyle = plateConfigs.edge['selected'];
        // } else {
        //     plateEdgeStyle = plateConfigs.edge['normal']
        // }

        const plate = [
            this.getBorderLineDOM(corners[0], corners[1], 0),
            this.getBorderLineDOM(corners[1], corners[2], 1),
            this.getBorderLineDOM(corners[2], corners[3], 2),
            this.getBorderLineDOM(corners[3], corners[0], 3)
        ]

        // const plate = [
        //     <polygon points={cornerPoints} {...plateEdgeStyle} cursor="pointer" key="border"
        //         onClick={(e) => this.handleClick(e, 'border')}
        //         onDoubleClick={(e) => this.handleDoubleClick(e, 'border')}
        //         onContextMenu={(e) => this.handleContextMenu(e, 'border')}
        //         onMouseDown={(e) => this.handleMouseDown(e, 'border')}
        //         onMouseUp={(e) => this.handleMouseUp(e, 'border')}
        //         onMouseEnter={(e) => this.handleMouseEnter(e, 'border')}
        //         onMouseLeave={(e) => this.handleMouseLeave(e, 'border')}
        //         />
        // ];
        
        if (this.props.embodied) {
            plate.push(this.getCornerDOM(corners[0], 'nwse-resize', 'corner-0'));
            plate.push(this.getCornerDOM(corners[1], 'nesw-resize', 'corner-1'));
            plate.push(this.getCornerDOM(corners[2], 'nwse-resize', 'corner-2'));
            plate.push(this.getCornerDOM(corners[3], 'nesw-resize', 'corner-3'));
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