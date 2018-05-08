import React, { Component } from 'react';

const paneConfig = {
    position: 'absolute',
    top: '30px',
    left: '30px',
    width: '150px',
    height: '500px',
    padding: '10px',
    border: '2px solid black'
}

const buttonConfig = {
    position: 'relative',
    left: '24px',
    width: '100px',
    height: '30px',
    padding: '3px',
    border: '1px solid gray',
    margin: '5px auto'
}

export default class Pane extends Component {
    handleButtonClick = (buttonType) => {
        const payload = {
            buttonType: buttonType, 
            graph: {
                nodes: this.props.nodes, 
                edges: this.props.edges, 
                plates: this.props.plates
            }
        };
        this.props.paneActions.onButtonClick(payload, {});
    }
    render() {
        return (
            <div style={paneConfig}>
                <button style={buttonConfig} onClick={() => this.handleButtonClick('Node')}>Node</button>
                <button style={buttonConfig} onClick={() => this.handleButtonClick('Edge')}>Edge</button>
                <button style={buttonConfig} onClick={() => this.handleButtonClick('Plate')}>Plate</button>
                <button style={buttonConfig} onClick={() => this.handleButtonClick('Select')}>Select</button>
                <button style={buttonConfig} onClick={() => this.handleButtonClick('Compile')}>Compile</button>
            </div>
        );
    }
}