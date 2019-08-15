// import * as d3 from 'd3';
import {
    scaleLinear, select, axisBottom, axisLeft,
    line, curveCatmullRom, drag, event,
    brush, brushX, extent, max,
} from 'd3';

export const createAxes = (props: any) => {
    const {
        className, plotIndents,
        dotsRadius, sort,
    } = props;

    const sortByX = (a: any, b: any) => a[0] < b[0] ? -1 : 1;

    const data = sort ? props.data.sort(sortByX) : props.data;
    const width = props.width - plotIndents.left - plotIndents.right;
    const height =  props.height - plotIndents.top - plotIndents.bottom;

    const svg = select(`.${className}`)
        .append("g")
        .attr("transform", `translate(${plotIndents.left}, ${plotIndents.top})`);

    // Add Axises
    const xScale = scaleLinear()
        .domain([0, data.length])
        .range([0, width]);
    const xAxis = svg.append('g')
        .attr('class', 'axis axis-x')
        .attr('transform', `translate(0, ${height})`)
        .call(axisBottom(xScale));
    const yScale = scaleLinear()
        .domain([0, 1])
        .range([height, 0]);
    const yAxis = svg.append('g')
        .attr('class', 'axis axis-y')
        .call(axisLeft(yScale));

    // Create line
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
        .attr("class", (d: any, i: number) => getColors('dot', i))
        .attr('r', dotsRadius)
        .attr('cx', (d: any) => xScale(d[0]) )
        .attr('cy', (d: any) => yScale(d[1]))
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

    const dotsBrush = brush()
        .extent( [[0, 0], [width, height]])
        .on("end brush", selectDots)

    // selectDots Brush
    svg.append("g")
        .classed('brush', true)
        .call(dotsBrush);

    function selectDots(d: any) {
        const brushArea = event.selection;

        dots.classed( "selected", (d: any) => isBrushed(brushArea, xScale(d[0]), yScale(d[1])))
    }

    function getColors(className: string, i: number) {
        return `${className} ${className}-${i}`
    }

    function isBrushed(brushArea: any, cx: number, cy: number) {
        let x0 = brushArea[0][0],
            x1 = brushArea[1][0],
            y0 = brushArea[0][1],
            y1 = brushArea[1][1];
        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
    }





    //svg.exit().remove();
};
