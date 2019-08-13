import * as d3 from "d3";

export const createAxes = (props: any) => {
    const { width, height, className, data, plotIndents } = props;

    const svg = d3.select(`.${className}`);

    const xScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, width - plotIndents.left - plotIndents.right]);
    const xAxis = d3.axisBottom(xScale);

    const yScale = d3.scaleLinear()
        .domain([1, 0])
        .range([0, height - plotIndents.top - plotIndents.bottom]);
    const yAxis = d3.axisLeft(yScale);

    const xPlotGroup = svg.append('g')
        .classed('x-axis', true)
        .attr("transform", `translate(${plotIndents.left},${height - plotIndents.left})`)
        .call(xAxis);

    const yPlotGroup = svg.append('g')
        .classed('y-axis', true)
        .attr("transform", `translate(${plotIndents.top},${plotIndents.bottom})`)
        .call(yAxis);
};
