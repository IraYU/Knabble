import {
    scaleLinear, select, axisBottom, axisLeft,
    line, curveCatmullRom, drag, event,
    brush, brushX, extent, max, mouse, selectAll
} from 'd3';
import { Data, Point } from './types';

export const createLineChart = (props: any) => {
    const {
        className, plotIndents,
        dotsRadius, dotsStrokeWidth, sortData,
        xAxisMax, yAxisMax,
    } = props;

    const sortByX = (a: Point, b: Point) => a[0] < b[0] ? -1 : 1;

    const data: Data = sortData ? props.data.sort(sortByX) : props.data;
    const width: number = props.width - plotIndents.left - plotIndents.right;
    const height: number =  props.height - plotIndents.top - plotIndents.bottom;
    const dotSise: number = dotsRadius + dotsStrokeWidth;
    const maxX: number = xAxisMax || max(data, function(d: Point) { return d[0]; });
    const maxY: number = yAxisMax || max(data, function(d: Point) { return d[1]; });

    const getColors = (className: string, i: number) =>`${className} ${className}-${i}`;

    const svg = select(`.${className}`)
        .append('g')
        .attr('transform', `translate(${plotIndents.left}, ${plotIndents.top})`);

    // Count Scale, Add Axises
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
        .filter((): any => event.button === 2)
        .extent( [[0, 0], [width, height]] )
        .on('end', zoomChart);

    const brushZoomClip = svg.append('defs')
        .append('svg:clipPath')
        .attr('id', 'clip')
        .append('svg:rect')
/*        .attrs({
            transform: `translate(-${dotSise}, -${dotSise})`,
            width: width + dotSise * 2,
            height:  height + dotSise * 2,
            x:  0,
            y:  0,
        });*/
        .attr('x', 0)
        .attr('y', 0)
        .attr('transform', `translate(-${dotSise}, -${dotSise})`)
        .attr('width', width + dotSise * 2)
        .attr('height', height + dotSise * 2);

    const brushZoomArea = svg
        .append('g')
        .classed('clip-brush', true)
        .attr('clip-path', 'url(#clip)')
        .append('g')
        .classed('brush', true)
        .call(zoomBrush);

    // Create line
    const lineData = line()
        .x((d: Point) => xScale(d[0]))
        .y((d: Point) => yScale(d[1]))
        .curve(curveCatmullRom.alpha(0.5));
    // Create line chart
    const chart = svg
        .select('.clip-brush')
        .append('path')
        .datum(data)
        .classed('line', true)
        .attr('d', lineData);

    // Create dots
    const dots = svg
        .select('.clip-brush')
        .append('g')
        .classed('dots', true)
        .selectAll('circle')
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

    const brushDotsArea = select(`.${className}`)
        .on( 'mousedown', function() {
            if( !event.ctrlKey) {
                selectAll( '.dot.brushed').classed( 'brushed', false);
            }
            const mousePoint = mouse(<any>this);

            select(`.${className} .dots`)
                .append( 'rect')
                .attr('class', 'selected-dots')
                .attr('x', mousePoint[0])
                .attr('y', mousePoint[1])
                .attr('width', 0)
                .attr('height', 0)
        })
        .on( 'mousemove', function() {
            const brushArea = select( '.selected-dots');

            if( !brushArea.empty()) {
                const mousePoint = mouse(<any>this);
                const d: any = {
                    x: parseInt( brushArea.attr( 'x'), 10),
                    y: parseInt( brushArea.attr( 'y'), 10),
                    width: parseInt( brushArea.attr( 'width'), 10),
                    height: parseInt( brushArea.attr( 'height'), 10)
                };
                const move = [mousePoint[0] - d.x, mousePoint[1] - d.y];

                console.log(move)

                if( move[0] < 1 || (move[0] * 2 < d.width)) {
                    d.x = mousePoint[0];
                    d.width -= move[0];
                } else {
                    d.width = move[0];
                }

                if( move[1] < 1 || (move[1] * 2 < d.height)) {
                    d.y = mousePoint[1];
                    d.height -= move[1];
                } else {
                    d.height = move[1];
                }

                brushArea
                    .attr('x', d.x)
                    .attr('y',d.y)
                    .attr('width', d.width)
                    .attr('height', d.height);

                selectAll( '.dot.brushed').classed( 'brushed', false);

                selectAll( `.${className} .dot`)
                    .each( function( dot: any) {
                    if(!select(this).classed( 'brushed') &&
                        xScale(dot[0]) - dotsRadius >= d.x &&
                        xScale(dot[0]) + dotsRadius <= d.x + d.width &&
                        yScale(dot[1]) - dotsRadius >= d.y &&
                        yScale(dot[1]) + dotsRadius <= d.y + d.height
                    ) {
                        select(this)
                            .classed( 'brushed', true);
                    }
                });
            }
        })
        .on( 'mouseup', function() {
            select( '.selected-dots').remove();
        });

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

        svg.select('clipPath rect')
            .transition()
            .duration(1000)
            .attr('transform', 'translate(0, 0)')
            .attr('width', width)
            .attr('height', height);
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
            xScale.domain([0, maxX]);
            xAxis.transition().duration(1000).call(axisBottom(xScale));

            svg.select('#clip rect')
                .transition()
                .duration(1000)
                .attr('transform', `translate(-${dotSise}, -${dotSise})`)
                .attr('width', width + dotSise * 2)
                .attr('height', height + dotSise * 2);
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
};
