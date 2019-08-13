import React, { Component } from 'react';
import { d3Node } from './types';
import { createAxes } from './utils';

import './LineChart.scss'

class LineChart extends Component<any> {
    ref: any;
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        createAxes(this.props);
    }
    
    render() {
        const { width, height, className, data } = this.props;

        return (
            <svg
                className={`line-chart ${className}`}
                width={width}
                height={height}>
{/*
                    <Links links={data.links}/>
                    <Nodes nodes={data.nodes} simulation={this.simulation}/>
*/}
            </svg>
        )
    }
}

export default LineChart;