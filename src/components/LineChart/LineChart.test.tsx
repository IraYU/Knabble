import React from 'react';
import * as d3 from 'd3';
import { shallow, mount, render } from 'enzyme';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
//import { toHaveAttribute } from ''
//import '@testing-library/jest-dom/extend-expect';
//import renderer from 'react-test-renderer';
//import { wrapper } from 'enzyme';
import LineChart from "./LineChart";
import { data, defaultLineChartProps } from "./constants";
import { createLineChart } from "./utils";

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
        ReactDOM.unmountComponentAtNode(svg);
    });

/*    it('renders correctly', () => {
        const button = renderer.create(
            (<LineChart {...testProps} />),
        ).toJSON();

        expect(button).toMatchSnapshot();
    });*/

/*
    it('render a chart with minimal requirements', function(){

/!*        const chart = renderer.create(
            (<LineChart {...testProps} />),
        ).toJSON();

        console.log(chart);*!/
        expect(svg.node()).toHaveAttribute('width','800')

       // expect(('.dots').toBeFalsy();
    });
*/

/*    it('should be created', function() {
        expect(svg).not.toBeNull();
    });*/

/*    it('should have the correct height', function() {
        expect(svg.attr('height')).toBe('600');
    });

    it('should have the correct width', function() {
        expect(svg.attr('width')).toBe('800');
    });*/

});

/*
describe('create component 2', () => {

    let c;

    beforeEach(function() {
        c = createLineChart(testProps);
    });

    afterEach(function() {
        d3.select('svg').remove();
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
*/

/*
describe('test Axis creation', function() {

    it('should create a yAxis', function() {
        expect(d3.select('.axis-y').nodes().length).toBe(1);
    });
});
*/

describe('create chart' ,function() {

/*    it('should be created path', function() {
        expect(svg.select('.line')).not.toBeNull();
    });*/

    it('should render the correct number of dots', function() {
        //expect(svg.selectAll('.dot').nodes().length).toBe(testProps.data.length);

        ///createLineChart(testProps);


        //container.datum(dataset).call(barChart);
        const svg = createLineChart(testProps);

        //svg.datum(data).call(createLineChart(testProps));



        //const wrapper = render(<LineChart {...testProps} />);
        const wrapper = render(<svg />);

        //console.log(wrapper.debug());

       // expect(d3.selectAll('dot').toBe(testProps.data.length);

        expect(wrapper.find('.dot')).toBe(testProps.data.length);
        //expect(wrapper).toMatchSnapshot();

    });
});
