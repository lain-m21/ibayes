import React, { Component } from 'react';
import { line } from 'd3';
import { plateConfigs } from './configs';


export default class Plate extends Component {
    getCornerDOM = (point, cursor) => {
        const plateCornerStyle = plateConfigs.corner;
        return (
            <circle cx={point[0]} cy={point[1]} {...this.props.plateActions.corner} {...plateCornerStyle} cursor={cursor}/>
        )
    }
    getPlate = () => {
        const corners = [
            [this.props.x, this.props.y],
            [this.props.x + this.props.width, this.props.y],
            [this.props.x + this.props.width, this.props.y + this.props.height],
            [this.props.x, this.props.y + this.props.height]
        ];
        
        const cornerPoints = `${corners[0][0]},${corners[0][1]}`
        cornerPoints += ` ${corners[1][0]},${corners[1][1]}`
        cornerPoints += ` ${corners[2][0]},${corners[2][1]}`
        cornerPoints += ` ${corners[3][0]},${corners[3][1]}`
        
        if (this.props.selected) {
            const plateEdgeStyle = plateConfigs.edge['selected'];
        } else {
            const plateEdgeStyle = plateConfigs.edge['normal']
        }

        const border = <polygon points={cornerPoints} {...plateEdgeStyle} {...this.props.plateActions.edge}/>

        const plate = [
            border
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
        const translate = `translate(${this.props.x}, ${this.props.y})`
        return (
            <g transform={translate} id={this.props.id} className="plate">
                {plate}
            </g>
        )
    }
}