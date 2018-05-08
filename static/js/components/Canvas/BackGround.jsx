import React, { Component } from 'react';
import { backgroundConfigs } from './configs';

const { background, marker, pattern, filter } = backgroundConfigs;

export default class BackGround extends Component {
    render() {
        return (
            <g>
                <defs>
                    <marker {...marker.globalStyle}>
                        <path {...marker.pathStyle} />
                    </marker>
                    <pattern {...pattern.globalStyle}>
                        <circle {...pattern.circleStyle} />
                    </pattern>
                    <filter {...filter.globalStyle}>
                        <feGaussianBlur {...filter.feGaussianBlur} />
                        <feOffset {...filter.feOffset} />
                        <feComponentTransfer>
                            <feFuncA {...filter.feFuncA} />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode {...filter.feMergeNode} />
                        </feMerge>
                    </filter>
                </defs>
                <rect {...background} />
            </g>
        )
    }
}