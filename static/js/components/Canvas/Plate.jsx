import React, { Component } from 'react';
import { line } from 'd3';
import { plateConfigs } from './configs';


export default class Plate extends Component {
    meta = this.props.id;
    handleClick = (e, part) => {
        if (part === 'border') {
            this.props.borderActions.onSingleClick({}, this.meta);
        } else {
            this.props.cornerActions.onSingleClick({}, this.meta);
        }
    }
    handleDoubleClick = (e, part) => {
        if (part === 'border') {
            this.props.borderActions.onDoubleClick({}, this.meta);
        } else {
            this.props.cornerActions.onDoubleClick({}, this.meta);
        }
    }
    handleContextMenu = (e, part) => {
        if (part === 'border') {
            this.props.borderActions.onContextMenu({}, this.meta);
        } else {
            this.props.cornerActions.onContextMenu({}, this.meta);
        }
    }
    handleMouseDown = (e, part) => {
        if (part === 'border') {
            this.props.borderActions.onMouseDown({}, this.meta);
        } else {
            this.props.cornerActions.onMouseDown({}, this.meta);
        }
    }
    handleMouseUp = (e, part) => {
        if (part === 'border') {
            this.props.borderActions.onMouseUp({}, this.meta);
        } else {
            this.props.cornerActions.onMouseUp({}, this.meta);
        }
    }
    handleMouseEnter = (e, part) => {
        if (part === 'border') {
            this.props.borderActions.onMouseEnter({}, this.meta);
        } else {
            this.props.cornerActions.onMouseEnter({}, this.meta);
        }
    }
    handleMouseLeave = (e, part) => {
        if (part === 'border') {
            this.props.borderActions.onMouseLeave({}, this.meta);
        } else {
            this.props.cornerActions.onMouseLeave({}, this.meta);
        }
    }
    getCornerDOM = (point, cursor) => {
        const plateCornerStyle = plateConfigs.corner;
        return (
            <circle cx={point[0]} cy={point[1]} {...plateCornerStyle} cursor={cursor}
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
        
        if (this.props.selected) {
            const plateEdgeStyle = plateConfigs.edge['selected'];
        } else {
            const plateEdgeStyle = plateConfigs.edge['normal']
        }

        const plate = [
            <polygon points={cornerPoints} {...plateEdgeStyle} {...this.props.plateActions.edge}
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
            plate.push(this.getCornerDOM(corners[0], 'nw-resize'));
            plate.push(this.getCornerDOM(corners[1], 'ne-resize'));
            plate.push(this.getCornerDOM(corners[2], 'nw-resize'));
            plate.push(this.getCornerDOM(corners[3], 'ne-resize'));
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