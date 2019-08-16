import {
    scaleLinear, select, axisBottom, axisLeft,
    line, curveCatmullRom, drag, event,
    brush, brushX, extent, max
} from 'd3';
import { Data, Point } from "./types";

export const createAxes = (props: any) => {
    const {
        className, plotIndents,
        dotsRadius, sortData,
        xAxisMax, yAxisMax,
    } = props;

    const sortByX = (a: Point, b: Point) => a[0] < b[0] ? -1 : 1;

    const data: Data = sortData ? props.data.sort(sortByX) : props.data;
    const width: number = props.width - plotIndents.left - plotIndents.right;
    const height: number =  props.height - plotIndents.top - plotIndents.bottom;
    const maxX = xAxisMax || max(data, function(d) { return d[0]; });
    const maxY = yAxisMax || max(data, function(d) { return d[1]; });

    const getColors = (className: string, i: number) =>`${className} ${className}-${i}`;

    const svg = select(`.${className}`)
        .append('g')
        .attr('transform', `translate(${plotIndents.left}, ${plotIndents.top})`);

    // Add Axises
    const xScale = scaleLinear()
        .domain([0, maxX])
        .range([0, width]);
    const xAxis = svg.append('g')
        .attr('class', 'axis axis-x')
        .attr('transform', `translate(0, ${height})`)
        .call(axisBottom(xScale));
    const yScale = scaleLinear()
        .domain([0, maxY])
        .range([height, 0]);
    const yAxis = svg.append('g')
        .attr('class', 'axis axis-y')
        .call(axisLeft(yScale));

    // zoom Brush
    const zoomBrush = brushX()
        .filter((): any =>  event.button === 2)
        .extent( [[0, 0], [width, height]] )
        .on('end', zoomChart);

    // selectDots Brush
    const dotsBrush = brush()
        .extent( [[0, 0], [width, height]])
        .on('end brush', selectDots);

/*    const brushZoomArea = svg.append('g')
        .attr('clip-path', 'url(#clip)')
        .append('g')
        .classed('brush brush-right-button', true)
        //.call(dotsBrush)
        .call(zoomBrush);*/

    const brushDotsArea = svg.append('g')
        .attr('clip-path', 'url(#clip)')
        .append('g')
        .classed('brush brush-left-button', true)
        .call(dotsBrush)
        //.call(zoomBrush);

    // Create line
    const lineData = line()
        .x((d: Point) =>  xScale(d[0]))
        .y((d: Point) => yScale(d[1]))
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
        .attr('class', (d: Point, i: number) => getColors('dot', i))
        .attr('r', dotsRadius)
        .attr('cx', (d: Point) => xScale(d[0]) )
        .attr('cy', (d: Point) => yScale(d[1]))
        .call(<any>drag()
            .on('start', function() {
                select(this).raise().classed('selected', true);
            })
            .on('drag', function(d: any) {
                d[1] = yScale.invert(event.y) < 0 ? 0
                    : yScale.invert(event.y) > 1 ? 1
                        : yScale.invert(event.y);

                select(this)
                    .attr('cx', xScale(d[0]))
                    .attr('cy', yScale(d[1]));

                svg.select('.line').datum(data).attr('d', lineData);
            })
            .on('end', function() {
                select(this)
                    .classed('selected', false)
                    .classed('moved', true)
            })
        );

    function selectDots() {
        const brushArea = event.selection;

        if (event.sourceEvent.type === 'mouseup') {
            svg.select('.brush-left-button').call(<any>dotsBrush.move, null)
        }
        dots.classed( 'brushed', (d: Point) => brushArea && isBrushed(brushArea, xScale(d[0]), yScale(d[1])));
    }

    let idleTimeout: any;
    function idled() { idleTimeout = null;}

    function zoomChart() {
        const brushArea = event.selection;

        if (!brushArea) {
            if (!idleTimeout) return idleTimeout = setTimeout(idled, 350);
            xScale.domain([0, data.length])
        } else {
            xScale.domain([ xScale.invert(brushArea[0]), xScale.invert(brushArea[1]) ])
        }

        zoom();
        resetZoom();
    }

    function zoom() {
        xAxis.transition().duration(1000)
            .call(axisBottom(xScale));

        svg.select('.line')
            .transition()
            .duration(1000)
            .attr('d', <any>lineData);
        dots.transition()
            .duration(1000)
            .attr('cx', (d: Point) => xScale(d[0]) )
            .attr('cy', (d: Point) => yScale(d[1]));
        svg.select('.brush').call(<any>zoomBrush.move, null)
    }

    function resetZoom() {
        svg.on('dblclick',function(){
            xScale.domain([0, data.length]);
            xAxis.transition().duration(1000).call(axisBottom(xScale));

            svg.select('.line')
                .transition()
                .duration(1000)
                .attr('d', <any>lineData);
            dots.transition()
                .duration(1000)
                .attr('cx', (d: Point) => xScale(d[0]) )
                .attr('cy', (d: Point) => yScale(d[1]))

        });
    }

    function isBrushed(brushArea: Data, cx: number, cy: number) {
        let x0 = brushArea[0][0],
            x1 = brushArea[1][0],
            y0 = brushArea[0][1],
            y1 = brushArea[1][1];
        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
    }
};
