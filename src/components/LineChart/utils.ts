import * as d3 from 'd3';

export const createAxes = (props: any) => {
    const {
        width, height, className, data, plotIndents,
        lineColor, lineWidth,
        dotsColor, dotsFill, dotsWidth,
    } = props;

    const svg = d3.select(`.${className}`);

    const xScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, width - plotIndents.left - plotIndents.right]);
    const xAxis = svg.append('g')
        .classed('x-axis', true)
        .attr('transform', `translate(${plotIndents.left},${height - plotIndents.left})`)
        .call(d3.axisBottom(xScale));

    const yScale = d3.scaleLinear()
        .domain([1, 0])
        .range([0, height - plotIndents.top - plotIndents.bottom]);
    const yAxis = svg.append('g')
        .classed('y-axis', true)
        .attr('transform', `translate(${plotIndents.top},${plotIndents.bottom})`)
        .call(d3.axisLeft(yScale));


    const sortByX = function (a: any, b: any) {
        return a.x < b.x?-1:1;
    };

    // scale data to our coordinate system
    const scaledData = data.map((item: any, i: number) => ({
        x: xScale(data[i].x) + plotIndents.left,
        y: yScale(data[i].y) + plotIndents.left,
    })).sort(sortByX);


    const line = d3.line()
        .x(function(d: any){return d.x;})
        .y(function(d: any){return d.y;})
        .curve(d3.curveCatmullRom.alpha(0.5));

    svg.append('g').append('path')
        .datum(scaledData)
        .attr('d', line)
        .classed('line', true)
        .style('fill', 'none')
        .style('stroke', lineColor)
        .style('stroke-width', lineWidth);

    svg.selectAll('.dot')
        .data(data)
        .enter().append('circle')
        .classed('dot', true)
        .style('fill', dotsFill)
        .style('stroke', dotsColor)
        .style('stroke-width', dotsWidth)
        .attr('r', 4)
        .attr('cx', function(d: any) { return xScale(d.x) + plotIndents.left; })
        .attr('cy', function(d: any) { return yScale(d.y) + plotIndents.top; });

};
