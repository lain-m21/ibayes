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
    render() {
        return (
            <div style={paneConfig}>
                <button style={buttonConfig} onClick={() => this.props.ButtonClick('Node')}>Node</button>
                <button style={buttonConfig} onClick={() => this.props.ButtonClick('Edge')}>Edge</button>
                <button style={buttonConfig} onClick={() => this.props.ButtonClick('Plate')}>Plate</button>
                <button style={buttonConfig} onClick={() => this.props.ButtonClick('Select')}>Select</button>
                <button style={buttonConfig} onClick={() => this.props.ButtonClick('Compile')}>Compile</button>
            </div>
        );
    }
}