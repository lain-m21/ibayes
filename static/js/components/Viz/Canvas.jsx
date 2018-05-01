import React, { Component } from 'react';
import { connect } from 'react-redux';

import { canvasActions } from '../../actions';


class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <svg style={this.props.svgStyle}>
                <defs>
                </defs>
            </svg>
        )

    }
}

