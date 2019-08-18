import React from 'react';
import * as d3 from 'd3';
//import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import LineChart from "./LineChart";
import { data, defaultLineChartProps } from "./constants";


const testProps = {
    ...defaultLineChartProps,
    data:data,
    width:800,
    height:600,
    sortData:true,
    yAxisMax:1,
};

const svg = d3.select('svg');

describe('create component', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <LineChart {...testProps} />, div,
        );
    });

    it('should be created', function() {
        expect(svg).not.toBeNull();
    });

    it('should have the correct height', function() {
        expect(svg.attr('height')).toBe('600');
    });

    it('should have the correct width', function() {
        expect(svg.attr('width')).toBe('800');
    });

});

describe('test Axis creation', function() {
    it('should create a xAxis', function() {
        expect(d3.select('.axis-x').nodes().length).toBe(1);
    });

    it('should create a yAxis', function() {
        expect(d3.select('.axis-y').nodes().length).toBe(1);
    });
});

describe('create chart' ,function() {

    it('should be created path', function() {
        expect(svg.select('.line')).not.toBeNull();
    });

    it('should render the correct number of dots', function() {
        expect(svg.selectAll('.dot').nodes().length).toBe(testProps.data.length);
    });

/*

    it('Test click event', () => {
        const mockCallBack = jest.fn();
        const button = shallow(
            (<Button {...mockProps} onClick={mockCallBack}>My lovely button</Button>),
        );

        button.find('Button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });*/
});
