// import * as d3 from 'd3';
import {
    scaleLinear, select, axisBottom, axisLeft,
    line, curveCatmullRom, drag, event,
    brush, brushX, extent, max,
} from 'd3';

export const createAxes = (props: any) => {
    const {
        className, plotIndents, data,
        dotsRadius
    } = props;


    const width = props.width - plotIndents.left - plotIndents.right;
    const height =  props.height - plotIndents.top - plotIndents.bottom;

    const svg = select(`.${className}`)
   // const svg = select(ref)
        .append("g")
        .attr("transform", `translate(${plotIndents.left}, ${plotIndents.top})`);

    const sortByX = (a: any, b: any) => a[0] < b[0] ? -1 : 1;
    data.sort(sortByX);

    // Add X axis
    const xScale = scaleLinear()
        .domain([0, data.length])
        .range([0, width]);
    const xAxis = svg.append('g')
        .attr('class', 'axis axis-x')
        .attr('transform', `translate(0, ${height})`)
        .call(axisBottom(xScale));
    // Add Y axis
    const yScale = scaleLinear()
        .domain([0, 1])
        .range([height, 0]);
    const yAxis = svg.append('g')
        .attr('class', 'axis axis-y')
        .call(axisLeft(yScale));

    // Create dotsData and Curve line
    const lineData = line()
        .x((d: any) =>  xScale(d[0]))
        .y((d: any) => yScale(d[1]))
        .curve(curveCatmullRom.alpha(0.5));

    // Create line chart
    const chart = svg.append('path')
        .datum(data)
        .classed('line', true)
        .attr('d', lineData);

    // Create dots
    const dots = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .classed('dot', true)
        .attr('r', dotsRadius)
        .attr('cx', (d: any) =>  xScale(d[0]) )
        .attr('cy', (d: any) =>  yScale(d[1]))
        .call(drag<any, any>()
            .on("start", function(d: any) {
                select(this).raise().classed('selected', true);
            })
            .on("drag", function(d: any) {
                d[1] = yScale.invert(event.y);

                select(this)
                    .attr('cx', xScale(d[0]))
                    .attr('cy', yScale(d[1]));

                svg.select('.line').datum(data).attr('d', lineData);
            })
            .on("end", function(d: any) {
                select(this)
                    .classed('selected', false)
                    .classed('moved', true)
            })
        );
    //svg.exit().remove();
};
