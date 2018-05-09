import React, { Component } from 'react';

const paneConfig = {
    position: 'absolute',
    top: '30px',
    left: '30px',
    width: '150px',
    height: '500px',
    padding: '30px 5px',
    border: '2px solid black',
    background: '#FFFFFF'
}

const buttonConfig = {
    position: 'relative',
    left: '20px',
    width: '100px',
    height: '30px',
    padding: '3px',
    border: '1px solid gray',
    margin: '5px auto',
    cursor: "pointer"
}

export default class Pane extends Component {
    handleButtonClick = (buttonType) => {
        const payload = {
            graph: {
                nodes: this.props.nodes, 
                edges: this.props.edges, 
                plates: this.props.plates
            }
        };
        this.props.paneActions(payload, {buttonType: buttonType});
    }
    render() {
        return (
            <div style={paneConfig}>
                <button style={buttonConfig} onClick={() => this.handleButtonClick('NODE')}>Node</button>
                <button style={buttonConfig} onClick={() => this.handleButtonClick('EDGE')}>Edge</button>
                <button style={buttonConfig} onClick={() => this.handleButtonClick('PLATE')}>Plate</button>
                <button style={buttonConfig} onClick={() => this.handleButtonClick('SELECT')}>Select</button>
                <button style={buttonConfig} onClick={() => this.handleButtonClick('COMPILE')}>Compile</button>
            </div>
        );
    }
}