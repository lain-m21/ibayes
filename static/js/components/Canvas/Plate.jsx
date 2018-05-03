import React, { Component } from 'react';
import { line } from 'd3';
import { plateConfigs } from './configs';


export default class Plate extends Component {
    getPath = line()
        .x( (d) => { return d[0] } )
        .y( (d) => { return d[1] } );
    
    getPathDOM = (path) => {
        if (this.props.selected) {
            const plateEdgeStyle = plateConfigs.edge['selected'];
        } else {
            const plateEdgeStyle = plateConfigs.edge['normal']
        }
        return (
            <path d={path} {...this.props.plateActions.edge} {...plateEdgeStyle} />
        )
    }
    getCornerDOM = (point, cursor) => {
        const plateCornerStyle = plateConfigs.corner;
        return (
            <circle cx={point[0]} cy={point[1]} {...this.props.plateActions.corner} {...plateCornerStyle} cursor={cursor}/>
        )
    }
    getPlate = () => {
        const topLeft = this.props.positionTopLeft;
        const topRight = [topLeft[0] + this.props.width, topLeft[1]];
        const bottomLeft = [topLeft[0], topLeft[1] + this.props.height];
        const bottomRight = [topLeft[0] + this.props.width, topLeft[1] + this.props.height];

        const leftPath = this.getPath([topLeft, bottomLeft]);
        const rightPath = this.getPath([topRight, bottomRight]);
        const topPath = this.getPath([topLeft, topRight]);
        const bottomPath = this.getPath([bottomLeft, bottomLeft]);

        const plate = [
            this.getPathDOM(leftPath),
            this.getPathDOM(rightPath),
            this.getPathDOM(topPath),
            this.getPathDOM(bottomPath)
        ];
        
        if (this.props.fixed) {
            plate.push(this.getCornerDOM(topLeft, 'nw-resize'));
            plate.push(this.getCornerDOM(topRight, 'ne-resize'));
            plate.push(this.getCornerDOM(bottomLeft, 'sw-resize'));
            plate.push(this.getCornerDOM(bottomRight, 'se-resize'));
        }

        return plate;
    }

    render() {
        const plate = this.getPlate();
        const translate = `translate(${this.props.positionTopLeft[0]}, ${this.props.positionTopLeft[1]})`
        return (
            <g transform={this.props.positionTopLeft} id={this.props.id} className="plate">
                {plate}
            </g>
        )
    }
}