import React from 'react';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import LineChart from "./LineChart";
import { data, defaultLineChartProps } from "./constants";

const testProps = {
    ...defaultLineChartProps,
    data: data,
    width:800,
    height:600,
    sortData:true,
    yAxisMax:1,
};

const svg = d3.select('svg');

describe('create component', () => {

    it('renders without crashing', () => {
        const svg = document.createElement('svg');

        ReactDOM.render(
            <LineChart {...testProps} />, svg,
        );
    });
});
