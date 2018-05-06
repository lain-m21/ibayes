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
        const topLeft = [this.props.x, this.props.y];
        const topRight = [topLeft[0] + this.props.width, topLeft[1]];
        const bottomLeft = [topLeft[0], topLeft[1] + this.props.height];
        const bottomRight = [topLeft[0] + this.props.width, topLeft[1] + this.props.height];
        
        const cornerPoints = `${topLeft[0]},${topLeft[1]}`
        cornerPoints += ` ${topRight[0]},${topRight[1]}`
        cornerPoints += ` ${bottomRight[0]},${bottomRight[1]}`
        cornerPoints += ` ${bottomLeft[0]},${bottomLeft[1]}`
        
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
            plate.push(this.getCornerDOM(topLeft, 'nw-resize'));
            plate.push(this.getCornerDOM(topRight, 'ne-resize'));
            plate.push(this.getCornerDOM(bottomLeft, 'sw-resize'));
            plate.push(this.getCornerDOM(bottomRight, 'se-resize'));
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