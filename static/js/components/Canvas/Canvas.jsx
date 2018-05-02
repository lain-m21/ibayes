import React, { Component } from 'react';
import { connect } from 'react-redux';

import Node from './Node';
import Edge from './Edge';
// import Plate from './Plate';


export default class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: {nodes: {}, edges: {}, plates: {}},
            actions: {nodes: {}, edges: {}, plates: {}, canvas: {}},
            selectedRegion: {topLeft: {}, bottomRight: {}},
            style: {}
        };
    }

    renderGraph = () => {
        const nodesDOM = [];
        const edgesDOM = [];
        const platesDOM = [];
        
        const nodes = {...this.state.graph.nodes}
        for (const key in nodes) {
            nodesDOM.push(<Node {...nodes[key]} actions={...this.state.actions.nodes} />);
        }
        const edges = {...this.state.graph.edges}
        for (const key in edges) {
            edgesDOM.push(<Edge {...edges[key]} actions={...this.state.actions.edges} />);
        }
        const plates = {...this.state.graph.plates}
        for (const key in plates) {
            platesDOM.push(<Plate {...plates[key]} actions={...this.state.actions.plates} />);
        }

        return {nodes: nodesDOM, edges: edgesDOM, plates: platesDOM};
    }

    render() {
        const { nodes, edges, plates} = this.renderGraph();
        return (
            <g className="canvas">
                {nodes}
                {edges}
                {plates}
            </g>
        )

    }
}

