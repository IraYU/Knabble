import React, { Component } from 'react';
import { createAxes } from './utils';

import './LineChart.scss'

class LineChart extends Component<any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        createAxes(this.props);
    }

    render() {
        const { width, height, className } = this.props;

        return (
            <svg className={`line-chart ${className}`} width={width} height={height} />
        )
    }
}

export default LineChart;