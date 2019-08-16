import React, { Component } from 'react';
import { createLineChart } from './utils';

import './LineChart.scss'

class LineChart extends Component<any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        createLineChart(this.props);
    }

    render() {
        const { width, height, className } = this.props;

        return (
            <svg className={`line-chart ${className}`} width={width} height={height} />
        )
    }
}

export default LineChart;