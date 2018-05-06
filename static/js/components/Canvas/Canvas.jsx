import React, { Component } from 'react';
import { connect } from 'react-redux';

import Node from './Node';
import Edge from './Edge';
import Plate from './Plate';
import BackGround from './BackGround'


export default class Canvas extends Component {
    renderGraph = () => {
        const nodesDOM = [];
        const edgesDOM = [];
        const platesDOM = [];
        
        const nodes = {...this.props.nodes}
        for (const key in nodes) {
            nodesDOM.push(<Node {...nodes[key]} nodeActions={...this.props.nodeActions} />);
        }
        const edges = {...this.props.edges}
        for (const key in edges) {
            const source = nodes[edges[key].source];
            const destination = nodes[edges[key].destination];
            const edge = {source: source, destination: destination}
            edgesDOM.push(<Edge {...edge} edgeActions={...this.props.edgeActions} />);
        }
        const plates = {...this.props.plates}
        for (const key in plates) {
            platesDOM.push(<Plate {...plates[key]} plateActions={...this.props.plateActions} />);
        }
        return {nodes: nodesDOM, edges: edgesDOM, plates: platesDOM};
    }

    render() {
        const { nodes, edges, plates } = this.renderGraph();
        return (
            <g className="canvas" {...this.props.canvasActions}>
                <BackGround />
                <g className="graph">
                    {nodes}
                    {edges}
                    {plates}
                </g>
            </g>
        )

    }
}

