import React, { Component } from 'react';
import { createLineChart } from './utils';
import { Props } from './types';

import './LineChart.scss'

class LineChart extends Component<any> {
    constructor(props: Props) {
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