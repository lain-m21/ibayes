import React, { Component } from 'react';


export default class Edge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0
        }
    }

    render() {
        const edge = {};
        return (
            <g>
                {edge}
            </g>
        )
    }
}