import React, { Component } from 'react';
import { backgroundConfigs } from './configs';

const { background, marker, pattern, filter } = backgroundConfigs;

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