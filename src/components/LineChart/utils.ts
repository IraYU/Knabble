// import * as d3 from 'd3';
import {
    scaleLinear, select, axisBottom, axisLeft,
    line, curveCatmullRom, drag, event,
    brush, brushX, extent
} from 'd3';

export const createAxes = (props: any) => {
    const {
        width, height, className, data, plotIndents,
        dotsRadius
    } = props;

    const svg = select(`.${className}`);

    // Add X axis
    const xScale = scaleLinear()
        .domain([0, data.length])
        .range([0, width - plotIndents.left - plotIndents.right]);
    const xAxis = svg.append('g')
        .classed('x-axis', true)
        .attr('transform', `translate(${plotIndents.left},${height - plotIndents.left})`)
        .call(axisBottom(xScale));

    // Add Y axis
    const yScale = scaleLinear()
        .domain([1, 0])
        .range([0, height - plotIndents.top - plotIndents.bottom]);
    const yAxis = svg.append('g')
        .classed('y-axis', true)
        .attr('transform', `translate(${plotIndents.top},${plotIndents.bottom})`)
        .call(axisLeft(yScale));



    // Add a clipPath: everything out of this area won't be drawn.
    const clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

    // Add brushing
    const brush = brushX()
        .extent( [
            [plotIndents.left || 0, plotIndents.top || 0],
            [
                width - plotIndents.left - plotIndents.right,
                height - plotIndents.top,
            ]
        ])
        .on("start brush", selectDots)
        //.on("end", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function




    const sortByX = function (a: any, b: any) {
        return a.x < b.x?-1:1;
    };

    // Scale data to our coordinate system
    const scaledData = data.map((item: any, i: number) => ({
        x: xScale(data[i].x) + plotIndents.left,
        y: yScale(data[i].y) + plotIndents.left,
    })).sort(sortByX);

    // Create dotsData and Curve line
    const lineData = line()
        .x(function(d: any){return d.x;})
        .y(function(d: any){return d.y;})
        .curve(curveCatmullRom.alpha(0.5));

    // Create line chart
    const chart = svg.append('g')
        .attr("clip-path", "url(#clip)")
        .append('path')
        .classed('line', true)
        .datum(scaledData)
        .attr('d', lineData);

    // Create dots
    const dots = svg.append('g')
        .selectAll('circle')
    //.attr("clip-path", "url(#clip)")
        .data(data.sort(sortByX))
        .enter()
        .append('circle')
        .classed('dot', true)
        .attr('r', dotsRadius)
        .attr('cx', function(d: any) { return xScale(d.x) + plotIndents.left; })
        .attr('cy', function(d: any) { return yScale(d.y) + plotIndents.top; })
    /*        .call(drag<any, unknown>()
                .on("start", this.dragstarted())
                .on("drag", dragged)
                .on("end", dragended)
            );*/


    svg.append("g")
        .classed('brush', true)
        .call(brush);


    let idleTimeout: any;
    function idled() { idleTimeout = null; }

    function selectDots() {

        // What are the selected boundaries?
        let extent = [event.selection, [plotIndents.top, height]];

        console.log(extent);

        dots.classed("selected",
            function(d: any){ return isBrushed(extent, xScale(d.x) + plotIndents.left, yScale(d.y) + plotIndents.top) } )

        function isBrushed(brush_coords: any, cx: number, cy: number) {
            let x0 = brush_coords[0][0],
                x1 = brush_coords[1][0],
                y0 = brush_coords[0][1],
                y1 = brush_coords[1][1];

            return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
        }

/*
        // If no selection, back to initial coordinate. Otherwise, update X axis domain
        if(!extent){
            if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
            xScale.domain([ 4,8])
        }else{
            xScale.domain([ xScale.invert(extent[0]), xScale.invert(extent[1]) ])
            svg.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
        }
*/



/*
        // Update axis and line position
        xAxis.transition().duration(1000).call(axisBottom(xScale))
        chart.select('.line')
            .transition()
            .duration(1000)
            .attr("d", line()
                .x(function(d: any) { return xScale(d.x) })
                .y(function(d: any) { return yScale(d.y) })
            )
*/
    }

    function updateChart() {
        // What are the selected boundaries?
//        let extent = [event.selection, [plotIndents.top, height]];

/*
        // If no selection, back to initial coordinate. Otherwise, update X axis domain
        if(!extent){
            if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
            xScale.domain([ 4,8])
        }else{
            xScale.domain([ xScale.invert(extent[0]), xScale.invert(extent[1]) ])
            svg.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
        }
*/



/*
        // Update axis and line position
        xAxis.transition().duration(1000).call(axisBottom(xScale))
        chart.select('.line')
            .transition()
            .duration(1000)
            .attr("d", line()
                .x(function(d: any) { return xScale(d.x) })
                .y(function(d: any) { return yScale(d.y) })
            )
*/
    }

    // If user double click, reinitialize the chart
/*    svg.on("dblclick",function(){
        //xScale.domain(extent(scaledData, function(d: any) { return d.x; }))
        xAxis.transition().call(axisBottom(xScale))
        chart
            .select('.line')
            .transition()
            .attr("d", lineData)
    });*/


/*
    const dragstarted = () => {
        select(this).raise();
        svg.append("g")
            .classed("active", true)
            .attr("cursor", "grabbing");
    }

    function dragged(d: any) {
        //const minX = dotsRadius + dotsWidth;
        //const maxX = height - dotsRadius + dotsWidth;
        select(this).attr("cx", d.x = event.x).attr("cy", d.y = event.y);
    }

    function dragended() {
        svg.append("g")
            .classed("active", false);
    }
*/
};
