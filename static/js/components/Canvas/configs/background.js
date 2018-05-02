export const backgroundConfigs = {
    background: {
        className: 'background',
        x: -2048,
        y: -2048,
        width: 4096,
        height: 4096,
        fill: '#F9F9F9'
    },

    marker: {
        id: 'end-arrow',
        viewBox: '0 -4 8 8',
        arrowSize: 8,
        refX: 4,
        markerWidth: 8,
        markerHeight: 8,
        orient: 'auto',
        pathStyle: {
            style: {fill: 'dodgerblue'},
            d: 'M0,-4L8,0L0,4'
        },
    },

    pattern: {
        id: 'grid',
        width: 36,
        height: 36,
        patternUnits: 'userSpaceOnUse',
        circleStyle: {
            cx: 18,
            cy: 18,
            r: 2,
            fill: 'lightgray'
        },
    },

    filter: {
        id: 'dropshadow',
        height: '130%',
        feGaussianBlur: {
            in: 'SourceAlpha',
            stdDeviation: 3
        },
        feOffset: {
            dx: 2,
            dy: 2,
            result: 'offsetblur'
        },
        feComponentTransfer: {
            feFuncA: {type: 'linear', slope: 0.1}
        },
        feMergeNode: {
            in: 'SourceGraphic'
        }
    }
}