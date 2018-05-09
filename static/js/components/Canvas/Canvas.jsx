import React, { Component } from 'react';

import Node from './Node';
import Edge from './Edge';
import Plate from './Plate';
import BackGround from './BackGround';


export default class Canvas extends Component {
    handleClick = (e) => {
        if (e.shiftKey) {
            this.props.canvasActions({}, {actionType: 'ON_SHIFT_CLICK'});
        } else {
            const payload = {
                originX: e.pageX,
                originY: e.pageY
            }
            this.props.canvasActions(payload, {actionType: 'ON_SINGLE_CLICK'});
        }
    }
    handleDoubleClick = (e) => {
        this.props.canvasActions({}, {actionType: 'ON_DOUBLE_CLICK'});
    }
    handleContextMenu = (e) => {
        this.props.canvasActions({}, {actionType: 'ON_CONTEXT_MENU'});
    }
    handleMouseDown = (e) => {
        if (e.shiftKey) {
            return null;
        }
        document.addEventListener('mousemove', this.handleDrag);
        const payload = {
            originX: e.pageX, 
            originY: e.pageY,
        };
        this.props.canvasActions(payload, {actionType: 'ON_MOUSE_DOWN'});
    }
    handleMouseUp = (e) => {
        if (e.shiftKey) {
            return null;
        }
        document.removeEventListener('mousemove', this.handleDrag);
        this.props.canvasActions({}, {actionType: 'ON_MOUSE_UP'})
    }
    handleDrag = (e) => {
        const xDiff = e.pageX - this.props.canvas.originX;
        const yDiff = e.pageY - this.props.canvas.originY;
        const payload = {
            originX: e.pageX, 
            originY: e.pageY,
            xDiff: xDiff,
            yDiff: yDiff
        };
        this.props.canvasActions(payload, {actionType: 'ON_DRAG'});
    }
    handleMouseEnter = (e) => {
        const payload = {
            originX: e.pageX,
            originY: e.pageY
        }
        this.props.canvasActions(payload, {actionType: 'ON_MOUSE_ENTER'});
    }
    handleMouseLeave = (e) => {
        this.props.canvasActions({}, {actionType: 'ON_MOUSE_LEAVE'});
    }
    handleKeyPress = (e) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            this.props.canvasActions({}, {actionType: 'ON_PRESS_DELETE_KEY'});
        }
    }

    renderGraph = () => {
        const nodesDOM = [];
        const edgesDOM = [];
        const platesDOM = [];
        
        const nodes = {...this.props.nodes}
        for (let key in nodes) {
            nodesDOM.push(<Node {...nodes[key]} nodeActions={this.props.nodeActions} key={key} />);
        }
        const edges = {...this.props.edges}
        for (let key in edges) {
            let source = nodes[edges[key].source];
            let destination = nodes[edges[key].destination];
            let edge = {...edges[key], source: source, destination: destination}
            edgesDOM.push(<Edge {...edge} {...this.props.canvas} edgeActions={this.props.edgeActions} key={key} />);
        }
        const plates = {...this.props.plates}
        for (let key in plates) {
            platesDOM.push(<Plate {...plates[key]} {...this.props.canvas} plateActions={this.props.plateActions} key={key} />);
        }
        return { nodesDOM, edgesDOM, platesDOM };
    }

    render() {
        const translate = `translate(${this.props.canvas.x}, ${this.props.canvas.y})`;
        const { nodesDOM, edgesDOM, platesDOM } = this.renderGraph();
        return (
            <g transform={translate} className="canvas"
                onClick={this.handleClick}
                onDoubleClick={this.handleDoubleClick}
                onContextMenu={this.handleContextMenu}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onKeyPress={this.handleKeyPress}
                >
                <BackGround />
                <circle transform="translate(500, 500)" r="5" fill="black"/>
                <g className="graph">
                    {nodesDOM}
                    {edgesDOM}
                    {platesDOM}
                </g>
            </g>
        )

    }
}

