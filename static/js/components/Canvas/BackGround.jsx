import React, { Component } from 'react';
import configs from './configs';

const { background, marker, pattern, filter } = configs.background;

export default class BackGround extends Component {
    render() {
        return (
            <g>
                <defs>
                    <marker {...marker} />
                    <pattern {...pattern} />
                    <filter {...filter} />
                </defs>
                <rect {...background} />
            </g>
        )
    }
}